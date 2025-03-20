import './App.css';
import { useState } from "react"
import { io } from 'socket.io-client';
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

}
  
const host = 'ws://typescript-chat-server-2a4af974e68f.herokuapp.com:80';
const socket = io(host);
const userName = uniqueNamesGenerator({dictionaries: [animals]});

function App() {

  const [allMessages, setMessages] = useState<Array<ChatMessage>>([]);

  //Listen for message broadcasts
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
      <MessageAdder host={host} userName={userName} />
    </>
  )
}

export default App;
