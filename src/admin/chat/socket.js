import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  autoConnect: false
});

export const connectSocket = (userId) => {
  console.log("Connecting socket for user:", userId);
  socket.auth = { userId };
  socket.connect();
  
  // Setup event listeners after connecting
  socket.on("connect", () => {
    console.log("Socket connected");
    // Emit user online status when connected
    socket.emit("join", { userId });
    console.log("Emitted join event for userId:", userId);
  });
  
  // Add debug for message received event
  socket.on("receiveMessage", (message) => {
    console.log("Socket received message:", message);
  });
};

export const disconnectSocket = () => {
  if (socket.connected) {
    console.log("Disconnecting socket");
    socket.disconnect();
  }
};

export default socket;