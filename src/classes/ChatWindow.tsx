export function ChatWindow(allMessages:ChatMessage[]){

    return(
        <>
            <div style={{position: "relative", width: "calc(100%)", minHeight: "calc(100%) - 250px", borderRadius: "15px", border: "5px solid white"}}>
                <div style={{width: "100%", minHeight: "100%"}} id="messages">
                    {Object.values(allMessages).map((item, index) => (
                        <span key={index} style={{minHeight: "50px", width: "calc(100%)"}}>{item.message}</span>
                    ))}
                </div>
            </div>
        </>
    )

}