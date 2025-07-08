import { useState, useEffect } from "react";
import Greeting from "./basic/Greeting";

function Home() {
    console.log('Home Called');
    // const result = useState("hello"); 
    // console.log(result);  // 输出：["hello", BoundFunctionObject]
    // useEffect(() => {
    //     console.log("Home component mounted");
    //     // document.title = `Clicked ${count} times`;
    //     return () => {
    //         console.log('Home will unmount');
    //     };
    // }, []);
    const [count, setCount] = useState(0); // set initial value to 0
    useEffect(() => {
        const msg = `count changed: ${count}`;
        console.log(msg);
        document.title = msg;
        return (() => {
            console.log('Count useEffect cleared');
        });
    }, [count]);

    const handleAddTopping  = (topping) => {
        console.log('Add topping:', topping); // 实际从child组件传了一个值给topping。
    };
    console.log(count , 'Home End');
    return (
        <>
            <h1>Ciao, Welcome to the Pizza Shop</h1>
            <Clock />
            <Greeting />
            <ToppingButton onClick={handleAddTopping}/>
            <Card>
                <h2>Pizza Title</h2>
                <p>Delicious details...</p>
            </Card>
            <p>
                You clicked {count} times
            </p>
            <button onClick={() => {
                setCount(prevCount => prevCount + 1);
            }}
            >
                Click me
            </button>
        </>
    );
}
function Clock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timeId = setInterval(() => setTime(new Date()), 1000);
        console.log(timeId);
        return () => {
            clearInterval(timeId);
            console.log('Clock cleared');
        }
    }, []);
    // console.log(time);
    return (
        <>
            <h2>{time.toLocaleTimeString()}</h2>
        </>
    );
}
function ToppingButton(props) {

    return (
        <button onClick={()=>props.onClick('Cheese')}>Cheese</button>
    );
}

function Card({children}) {
    return <div className="card">{children}</div>
}
export default Home;