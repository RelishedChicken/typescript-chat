import './App.css';
import { io } from 'socket.io-client';
import { ChatWindow } from './classes/ChatWindow';
import { MessageAdder } from './classes/MessageAdder';

declare global{ 

  interface ChatMessage {
    id: number;
    message: string;
    date: Date;
  }  

  interface ServerToClientEvents {
    hello: (val: string) => void;
  }

  interface ClientToServerEvents {
    ping: (cb: () => void) => void;
  }

}

function App() {

  const allMessages:ChatMessage[]=[];  
  const socket = io('http://localhost:5173');

  socket.on('connect', () => {
    console.log("connected!");
  });

  socket.on('disconnect', () => {
    console.log("disconnected!");
  });

  socket.on('message', () => {
    //TODO handle adding message
  });
  
  allMessages.push({
    id: 1,
    message: "test message",
    date: new Date()
  });  

  setInterval(() => {
    const start = Date.now();
    socket.emit("ping", () => {
        console.log(`pong (latency: ${Date.now() - start} ms)`);
    });
  }, 1000);
    
  return (
    <>
      <h1>Chat</h1>
      <ChatWindow {...allMessages}/>
      <MessageAdder />
    </>
  )
}

export default App;
