import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
    
    console.log("LoginPage Called");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState(false); // let error = false;  Don't do this and change it to true in the call back
    const navigate = useNavigate();
    
    // call back functions
    const saveUserName = (e) => {
        setUserName(e.target.value);
        setError(false);
    };
    const handleSubmit = () => {
        if (!userName.trim()) {
            setError(true);
            // show alert: the user's name is required 
        }
        else {
            navigate("/pizzaBuilder", { 
                state: { userName },
                replace: true
            });
        }
    };
    return (
        <>
            <h2>Welcome to Domi Pizza Wagon</h2>
            <label htmlFor="userNameInput">Name:</label>
            {error && (
                <div style={{ color: "red" }}>this field is required</div>
            )}
            <br />
            <input id="userNameInput" type="text" placeholder="Enter your name" value={userName} onChange={saveUserName} />
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
}
export default LoginPage;