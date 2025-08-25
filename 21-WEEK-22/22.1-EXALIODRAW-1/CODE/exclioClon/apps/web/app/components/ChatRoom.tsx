import axios from 'axios';
import { BACEND_URL } from '../cofig';

async function getChats(roomId: string) {
  const response = await axios.get(`${BACEND_URL}/chats/${roomId}`);
  return response.data.messages;
}

export async function ChatRoom({ id }: { id: string }) {
  const messages = await getChats(id);
  return <ChatRoomClient id={id} messages={messages} />;
}
