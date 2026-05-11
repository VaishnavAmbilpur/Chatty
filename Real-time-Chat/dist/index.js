"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
try {
    const envPath = path_1.default.resolve(__dirname, "../.env");
    if (fs_1.default.existsSync(envPath)) {
        const envContent = fs_1.default.readFileSync(envPath, "utf8");
        envContent.split("\n").forEach((line) => {
            const [key, ...valueParts] = line.split("=");
            const keyTrimmed = key === null || key === void 0 ? void 0 : key.trim();
            const value = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
            if (keyTrimmed && value) {
                process.env[keyTrimmed] = value;
            }
        });
    }
}
catch (e) {
    console.error("Error loading .env manually:", e);
}
const server = http_1.default.createServer((req, res) => {
    if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("OK");
    }
    else {
        res.writeHead(404);
        res.end();
    }
});
const wss = new ws_1.WebSocketServer({ server });
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
const url = process.env.URL || `http://localhost:${port}`;
setInterval(() => {
    http_1.default.get(`${url}/health`, (res) => {
        console.log(`Self-ping status: ${res.statusCode}`);
    }).on("error", (err) => {
        console.error("Self-ping error:", err.message);
    });
}, 14 * 60 * 1000);
const rooms = new Map();
const socketToUser = new Map();
const roomHistory = new Map();
function broadcastToRoom(roomId, message) {
    const users = rooms.get(roomId);
    if (users) {
        users.forEach((user) => {
            user.socket.send(JSON.stringify(message));
        });
    }
}
wss.on("connection", (socket) => {
    console.log("New connection established");
    socket.on("message", (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            if (parsedMessage.type === "join") {
                const { roomId, name } = parsedMessage.payload;
                let users = rooms.get(roomId) || [];
                const isFirstInRoom = users.length === 0;
                const newUser = {
                    socket,
                    room: roomId,
                    name: name || "Anonymous",
                    isAdmin: isFirstInRoom,
                };
                users.push(newUser);
                rooms.set(roomId, users);
                socketToUser.set(socket, newUser);
                const history = roomHistory.get(roomId) || [];
                socket.send(JSON.stringify({
                    type: "history",
                    payload: { messages: history }
                }));
                broadcastToRoom(roomId, {
                    type: "presence",
                    payload: {
                        users: users.map((u) => ({ name: u.name, isAdmin: u.isAdmin })),
                    },
                });
                console.log(`User ${name} joined room ${roomId}`);
            }
            if (parsedMessage.type === "chat") {
                const currentUser = socketToUser.get(socket);
                if (currentUser) {
                    const chatPayload = {
                        message: parsedMessage.payload.message,
                        sender: currentUser.name,
                        timestamp: new Date().toISOString(),
                        isAdmin: currentUser.isAdmin,
                    };
                    const history = roomHistory.get(currentUser.room) || [];
                    history.push(chatPayload);
                    if (history.length > 50)
                        history.shift();
                    roomHistory.set(currentUser.room, history);
                    broadcastToRoom(currentUser.room, {
                        type: "chat",
                        payload: chatPayload,
                    });
                }
            }
            if (parsedMessage.type === "typing") {
                const currentUser = socketToUser.get(socket);
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
        }
        catch (e) {
            console.error("Error processing message:", e);
        }
    });
    socket.on("close", () => {
        const currentUser = socketToUser.get(socket);
        if (currentUser) {
            const { room, name } = currentUser;
            socketToUser.delete(socket);
            let users = rooms.get(room) || [];
            users = users.filter((u) => u.socket !== socket);
            if (users.length === 0) {
                rooms.delete(room);
            }
            else {
                rooms.set(room, users);
                broadcastToRoom(room, {
                    type: "presence",
                    payload: {
                        users: users.map((u) => ({ name: u.name, isAdmin: u.isAdmin })),
                    },
                });
            }
            console.log(`User ${name} left room ${room}`);
        }
    });
});
