import { WebSocketServer } from "ws";
import WebSocket from "ws";

const wss = new WebSocketServer({ port: 8080 });

// starts server instance on http://localhost:8080

// waits for connection to be established from the client
// the callback argument ws is a unique for each client
wss.on("connection", (ws) => {

  wss.clients.forEach(client => client.send(wss.clients.size));
  
  // runs a callback on message event
  ws.on("message", (data) => {
    // sends the data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
