import { useState } from "react";
function Greeting() {
    const [userName, setUserName] = useState("");
    const handleChange = (e) => {
        setUserName(e.target.value);
    };
    return (
        <>
            <h2>Please enter your name:</h2>
            <input type="text" placeholder="Enter your name" value={userName} 
             onChange={handleChange} />  {/* uncontrolled without the value property, not recommanded*/}
            <p>Hello, {userName || "stranger"} </p>
        </>
    );
}
export default Greeting;