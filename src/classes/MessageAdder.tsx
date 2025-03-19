import $ from 'jquery';

export function MessageAdder(){
    
    const handleNewMessage = () => {
        const input:JQuery<HTMLInputElement> = $('#inputBox');

        if(input.val() !== ""){
            //Send a message to the server

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