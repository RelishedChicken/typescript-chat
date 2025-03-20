import $ from 'jquery';
import { io } from 'socket.io-client';

export interface Props {
    host: string;
    userName: string;
  }

export function MessageAdder(props: Props){
    
    const handleNewMessage = () => {
        
        const socket = io(props.host);
        const input:JQuery<HTMLInputElement> = $('#inputBox');

        if(input.val() !== ""){
            console.log("sending message...");
            socket.emit('message', {
                id: Math.random() * 9999,
                author: props.userName,
                message: input.val(),
                date: new Date()
            });
        }else{
            console.log("Empty message box!");
        }
        
    }

    return(
        <div style={{width: "100%", height: "50px"}}>
            <input id="inputBox" style={{
                float: "left",
                width: "calc(100% - 144px)",
                borderRadius: "15px",
                border: "5px solid white",
                fontSize: "35px",
                textAlign: "center"}} type="text" />
            <button onClick={() => handleNewMessage()} id="submitButton" style={{
                float: "right",
                width: "130px",
                borderRadius: "15px",
                border: "5px solid white",
                fontSize: "35px",
                backgroundColor: "#242424"
            }} type="submit">Send</button>
        </div>
    )

}