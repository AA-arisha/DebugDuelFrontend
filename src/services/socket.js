import { io } from 'socket.io-client';

let socket = null;

export function getSocket() {
  if (socket) return socket;

  const base =
    import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  socket = io(base, { transports: ['websocket', 'polling'] });

  // Optional: global handlers
  socket.on('connect', () => {
    console.debug('[socket] connected', socket.id);
  });
  socket.on('disconnect', (reason) => {
    console.debug('[socket] disconnected', reason);
  });

  return socket;
}

export function closeSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
