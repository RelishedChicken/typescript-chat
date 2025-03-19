import './App.css';
import { io } from 'socket.io-client';
import { ChatWindow } from './classes/ChatWindow';
import { MessageAdder } from './classes/MessageAdder';

declare global{ 

  interface ChatMessage {
    readonly id: number;
    readonly message: string;
    readonly date: Date;
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
  const socket = io('http://localhost:3000');

  //Event to confirm a solid connection
  /*socket.on('connect', () => {
    console.log("connected!");
  });*/

  //Event to say server dc
  /*socket.on('disconnect', () => {
    console.log("disconnected!");
  });*/

  //Send current messages for testing purposes
  socket.emit('message', {
    id: 1,
    message: "test message",
    date: new Date()
  });

  //Request all current messages on the server
  setInterval(() => {
    socket.emit('getAllMessages', (response:ChatMessage[]) => {
      console.log(response);
    })  
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
