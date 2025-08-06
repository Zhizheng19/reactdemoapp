import React, { useState } from "react";
import { createRoutesFromChildren, Form, useNavigate } from "react-router-dom";

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

    // recommand to use <form> for Login 
    return (
        <div className="page-container">
            <h1 className="welcome-title">Domi Pizza Wagon</h1>
            <div className="login-container">
                <div className="form-group">

                    <label htmlFor="userNameInput">Name:</label>
                    {error && (
                        <div style={{ color: "red" }}>this field is required</div>
                    )}
                    <br />
                    <input id="userNameInput" type="text" placeholder="Enter your name" value={userName} onChange={saveUserName} />
                </div>
                <button className="btn btn-large hover-glow" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
export default LoginPage;