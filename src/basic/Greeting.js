import { useState } from "react";
function Greeting() {
    const [userName, setUserName] = useState("");
    const handleChange = (e) => {
        setUserName(e.target.value);
    };
    return (
        <>
            <h2>Please enter your name:</h2>
            {/* an uncontrolled comp if we don't use 'value' attribute in <input>, which is not recommanded*/}
            <input type="text" placeholder="Enter your name" value={userName}  
             onChange={handleChange} /> 
            <p>Hello, {userName || "stranger"} </p>
        </>
    );
}
export default Greeting;