import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import fs from "fs";
import path from "path";

// Manual .env parsing to avoid dependency overhead/issues
try {
    const envPath = path.resolve(__dirname, "../.env");
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf8");
        envContent.split("\n").forEach((line) => {
            const [key, ...valueParts] = line.split("=");
            const keyTrimmed = key?.trim();
            const value = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
            if (keyTrimmed && value) {
                process.env[keyTrimmed] = value;
            }
        });
    }
} catch (e) {
    console.error("Error loading .env manually:", e);
}

const server = http.createServer((req, res) => {
    if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("OK");
    } else {
        res.writeHead(404);
        res.end();
    }
});

const wss = new WebSocketServer({ server });
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// Self-ping mechanism to keep the server awake on Render
const url = process.env.URL || `http://localhost:${port}`;
setInterval(() => {
    http.get(`${url}/health`, (res) => {
        console.log(`Self-ping status: ${res.statusCode}`);
    }).on("error", (err) => {
        console.error("Self-ping error:", err.message);
    });
}, 14 * 60 * 1000); // Ping every 14 minutes

interface User {
    socket: WebSocket;
    room: string;
    name: string;
    isAdmin: boolean;
}

interface ChatMessage {
    message: string;
    sender: string;
    timestamp: string;
    isAdmin: boolean;
}

let allSockets: User[] = [];
const roomHistory = new Map<string, ChatMessage[]>();

function broadcastToRoom(roomId: string, message: any) {
    allSockets.forEach((user) => {
        if (user.room === roomId) {
            user.socket.send(JSON.stringify(message));
        }
    });
}

wss.on("connection", (socket) => {
    console.log("New connection established");

    socket.on("message", (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());

            if (parsedMessage.type === "join") {
                const { roomId, name } = parsedMessage.payload;
                const isFirstInRoom = !allSockets.some((u) => u.room === roomId);

                allSockets.push({
                    socket,
                    room: roomId,
                    name: name || "Anonymous",
                    isAdmin: isFirstInRoom,
                });

                // Send history to the joined user
                const history = roomHistory.get(roomId) || [];
                socket.send(JSON.stringify({
                    type: "history",
                    payload: { messages: history }
                }));

                // Notify room about new user
                broadcastToRoom(roomId, {
                    type: "presence",
                    payload: {
                        users: allSockets
                            .filter((u) => u.room === roomId)
                            .map((u) => ({ name: u.name, isAdmin: u.isAdmin })),
                    },
                });

                console.log(`User ${name} joined room ${roomId}`);
            }

            if (parsedMessage.type === "chat") {
                const currentUser = allSockets.find((u) => u.socket === socket);
                if (currentUser) {
                    const chatPayload: ChatMessage = {
                        message: parsedMessage.payload.message,
                        sender: currentUser.name,
                        timestamp: new Date().toISOString(),
                        isAdmin: currentUser.isAdmin,
                    };

                    // Update room history
                    const history = roomHistory.get(currentUser.room) || [];
                    history.push(chatPayload);
                    if (history.length > 50) history.shift();
                    roomHistory.set(currentUser.room, history);

                    broadcastToRoom(currentUser.room, {
                        type: "chat",
                        payload: chatPayload,
                    });
                }
            }

            if (parsedMessage.type === "typing") {
                const currentUser = allSockets.find((u) => u.socket === socket);
                if (currentUser) {
                    broadcastToRoom(currentUser.room, {
                        type: "typing",
                        payload: {
                            name: currentUser.name,
                            isTyping: parsedMessage.payload.isTyping,
                        },
                    });
                }
            }
        } catch (e) {
            console.error("Error processing message:", e);
        }
    });

    socket.on("close", () => {
        const userIndex = allSockets.findIndex((u) => u.socket === socket);
        if (userIndex !== -1) {
            const { room, name } = allSockets[userIndex];
            allSockets.splice(userIndex, 1);

            // Notify room about departure
            broadcastToRoom(room, {
                type: "presence",
                payload: {
                    users: allSockets
                        .filter((u) => u.room === room)
                        .map((u) => ({ name: u.name, isAdmin: u.isAdmin })),
                },
            });
            console.log(`User ${name} left room ${room}`);
        }
    });
});
