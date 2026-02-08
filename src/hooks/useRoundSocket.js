// useRoundSocket.ts
import { useEffect } from 'react';
import { getSocket } from './socket';

export function useRoundSocket(setRounds) {
  const socket = getSocket();
  useEffect(() => {
    socket.on('round_updated', (round) => {
      setRounds((prev) => prev.map((r) => (r.id === round.id ? round : r)));
    });

    return () => socket.off('round_updated');
  }, [socket, setRounds]);
}
