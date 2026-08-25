const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

// Serve static files from the public folder
app.use(express.static('public'));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Receive a study update from one user
  socket.on('studyUpdate', (data) => {
    console.log(`${data.name}: ${data.message}`);

    // Send the update to all connected users
    io.emit('newStudyUpdate', data);
  });

  // User disconnected
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
http.listen(PORT, () => {
  console.log(`Live Study Room running at http://localhost:${PORT}`);
});