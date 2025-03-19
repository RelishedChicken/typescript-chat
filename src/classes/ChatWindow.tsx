import { useEffect, useState } from "react"

export function ChatWindow(allMessages:ChatMessage[]){


    const [allMessagesValues, setAllMessagesValues] = useState(allMessages);
    useEffect(() => {
        setAllMessagesValues(allMessagesValues);
    }, [allMessagesValues]);


    return(
        <>
            <div style={{position: "relative", width: "calc(100%)", minHeight: "calc(100%) - 250px", borderRadius: "15px", border: "5px solid white"}}>
                <div style={{width: "100%", minHeight: "100%"}} id="messages">
                    {Object.values(allMessages).map((item, index) => (
                        <p key={index} style={{width: "100%", fontSize: "25px", borderRadius: "12px", backgroundColor: "grey", margin: "0", marginTop: "2px", marginBottom: "2px"}}>{item.author}: {item.message}</p>
                    ))}
                </div>
            </div>
        </>
    )

}