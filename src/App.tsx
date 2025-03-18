import './App.css';
import { ChatWindow } from './classes/ChatWindow';

//Make the application types available everywhere
declare global{
  type ChatMessage = {id:number, message:string, date:Date};
}

function App() {

  const allMessages:ChatMessage[]=[];
  
  allMessages.push({
    id: 1,
    message: "test message",
    date: new Date()
  });
  
  return (
    <>
      <h1>Chat</h1>
      <ChatWindow {...allMessages}/>
      <MessageAdder />
    </>
  )
}

export default App;
