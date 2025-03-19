import './App.css';
import { useState } from "react"
import { io, Socket } from 'socket.io-client';
import { ChatWindow } from './classes/ChatWindow';
import { MessageAdder } from './classes/MessageAdder';
import { uniqueNamesGenerator, animals } from 'unique-names-generator';

declare global{ 

  interface ChatMessage {
    readonly id: number;
    readonly author: string;
    readonly message: string;
    readonly date: Date;
  }

  const socket:Socket;

}

const userName = uniqueNamesGenerator({dictionaries: [animals]});

function App() {

  const [allMessages, setMessages] = useState<Array<ChatMessage>>([]);  
  const socket = io('http://localhost:3000');

  //Request all current messages on the server every 1000ms
  socket.on('sendMessages', (response:ChatMessage[]) => {
    if(response !== allMessages){
      console.log("got messages...");
      setMessages(response);
    }
  })
    
  return (
    <>
      <h1>Chat</h1>
      <ChatWindow {...allMessages}/>
      <br></br>
      <MessageAdder userName={userName} />
    </>
  )
}

export default App;
