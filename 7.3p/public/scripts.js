// Connect to the Socket.IO server
const socket = io();

const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('sendButton');
const updatesList = document.getElementById('updates');

// Send a study update to the server
sendButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (name === '' || message === '') {
    alert('Please enter your name and study update.');
    return;
  }

  socket.emit('studyUpdate', {
    name: name,
    message: message
  });

  messageInput.value = '';
});

// Receive study updates from the server
socket.on('newStudyUpdate', (data) => {
  // Remove the initial waiting message
  if (
    updatesList.children.length === 1 &&
    updatesList.children[0].innerText === 'Waiting for study updates...'
  ) {
    updatesList.innerHTML = '';
  }

  const newUpdate = document.createElement('li');
  newUpdate.innerText = `${data.name}: ${data.message}`;

  updatesList.appendChild(newUpdate);
});