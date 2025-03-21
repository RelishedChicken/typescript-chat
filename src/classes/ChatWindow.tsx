import { useEffect, useState } from "react"

export interface Props {
    userName: string,
    allMessages: ChatMessage[]
}
    
const authorColours:Map<string, string> = new Map<string, string>();

export function ChatWindow(props: Props){

    const [allMessagesValues, setAllMessagesValues] = useState(props.allMessages);
    useEffect(() => {
        setAllMessagesValues(allMessagesValues);
    }, [allMessagesValues]);

    const messageStyle = {
        width: "100%",
        minHeight: "50px",
        fontSize: "25px", 
        margin: "0",
        marginTop: "2px",
        marginBottom: "2px",
        borderBottom: "3px solid white",
        paddingBottom: "5px",
        color: "white",
    }

    props.allMessages.forEach(message => {
        if(!authorColours.has(message.author)){
            let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            while(color == "#00ff44"){
                color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            }

            if(message.author !== props.userName){
                authorColours.set(message.author, color)
            }else{
                authorColours.set(props.userName, "#00ff44")
            }
        }
    });

    return(
        <>
            <div style={{position: "relative", width: "calc(100%)", height: "100%", minHeight: "calc(100%) - 250px", maxHeight: "calc(100%) - 450px", borderRadius: "15px", border: "5px solid white"}}>
                <div style={{width: "100%", minHeight: "100%", maxHeight: "100%", overflowY: "auto", overflowWrap:"break-word"}} id="messages">
                    {Object.values(props.allMessages).map((item, index) => (
                        <p key={index} style={messageStyle}>
                            <span style={{color: (authorColours.get(item.author))}}>{(item.author === props.userName) ? "You" : item.author}</span>: {item.message}
                        </p>
                    ))}
                </div>
            </div>
        </>
    )

}