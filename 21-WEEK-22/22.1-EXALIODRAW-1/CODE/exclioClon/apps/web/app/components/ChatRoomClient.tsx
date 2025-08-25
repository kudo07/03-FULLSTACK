import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurentMessage] = useState('');
  const [socket, loading] = useSocket();
  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: 'join_room',
          roomId: id,
        })
      );
      socket.onmessage = (event: any) => {
        const pardsedData = JSON.parse(event.data);
        if (pardsedData.type === 'chat') {
          setChats((c) => [...c, { message: pardsedData.message }]);
        }
      };
    }
  }, [socket, loading, id]);
  return (
    <div>
      {chats.map((m) => (
        <div>{m.message}</div>
      ))}
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => {
          setCurentMessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: 'chat',
              roomId: id,
              message: currentMessage,
            })
          );
          setCurentMessage('');
        }}
      >
        Send message
      </button>
    </div>
  );
}
