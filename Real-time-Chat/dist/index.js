"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
const roomHistory = new Map();
function broadcastToRoom(roomId, message) {
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
                    const chatPayload = {
                        message: parsedMessage.payload.message,
                        sender: currentUser.name,
                        timestamp: new Date().toISOString(),
                        isAdmin: currentUser.isAdmin,
                    };
                    // Update room history
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
        }
        catch (e) {
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
