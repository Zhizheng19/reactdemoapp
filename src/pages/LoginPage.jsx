import { useState } from "react";
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
            navigate("/pizza-builder", {
                state: { userName },
                replace: true
            });
        }
    };

    // recommand to use <form> for Login 
    return (
        <div className="page-container animate-slideUp">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r
            from-yellow-300 to-orange-500 text-center mb-10-title">Domi Pizza Wagon</h1>
            <div className="w-full text-center">
                <div className="mb-6 text-left">
                    <label htmlFor="userNameInput"
                        className="block font-semibold text-gray-700 mb-2 text-lg">
                        Name:
                    </label>
                    {error && <div className="text-red-600 text-sm mb-2">This field is required</div>}
                    <input id="userNameInput" type="text" placeholder="Enter your name" value={userName} onChange={saveUserName}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900
                        focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition" />
                </div>
                <button className="bg-gradient-to-r from-yellow-300 to-orange-500 text-blue-900 font-semibold rounded-full
                px-10 py-4 text-lg hover:shadow-xl hover:from-yellow-400 hover:to-orange-400 transition-all"
                    onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
export default LoginPage;