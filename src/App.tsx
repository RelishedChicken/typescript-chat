import './App.css';
import { useState } from "react"
import { io } from 'socket.io-client';
import { ChatWindow } from './classes/ChatWindow';
import { MessageAdder } from './classes/MessageAdder';
import { uniqueNamesGenerator, animals } from 'unique-names-generator';
import $ from 'jquery';

declare global{ 

  interface ChatMessage {
    readonly id: number;
    readonly author: string;
    readonly message: string;
    readonly date: Date;
  }

}
  
const host = 'wss://typescript-chat-server-2a4af974e68f.herokuapp.com';
const socket = io(host);
const userName = uniqueNamesGenerator({dictionaries: [animals]});

function App() {

  const [allMessages, setMessages] = useState<Array<ChatMessage>>([]);  

  //Check for a connection
  socket.on("connect", () => {
    console.log("Succesfully connected with socket.io server");

    //Ask for all messages - mainly for on load
    socket.emit('getAllMessages', (response:ChatMessage[]) => {      
      if(response !== allMessages){
        console.log("got messages...");
        setMessages(response);
      }
    })

  });

  //Listen for message broadcasts
  socket.on('sendMessages', (response:ChatMessage[]) => {
    if(response !== allMessages){
      console.log("got messages...");
      setMessages(response);
    }
  });
    
  return (
    <>
      <h1>Chat</h1>
      <h3>You are: {userName}</h3>
      <ChatWindow userName={userName} allMessages={allMessages}/>
      <br></br>
      <MessageAdder host={host} userName={userName} />
    </>
  )
}

export default App;
