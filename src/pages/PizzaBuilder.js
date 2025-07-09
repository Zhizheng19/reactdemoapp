import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
const basePizza = { id: 1, name: "Base", price: 10 };
const allToppings = [
    { id: 1, name: "Pepperoni", price: 1.50 },
    { id: 2, name: "Mushroom", price: 1.00 },
    { id: 3, name: "Green Olives", price: 1.00 },
    { id: 4, name: "Green Peppers", price: 1.00 },
    { id: 5, name: "Double Cheese", price: 2.25 }
];

function PizzaBuilder() {
    const [selectedToppings, setSelectedToppings] = useState([]); // Array of toppings'ID
    const location = useLocation();
    // const navigate = useNavigate();
    const userName = location.state?.userName || "guest";

    const totalPrice = allToppings.filter(topping => selectedToppings.includes(topping.id))
        .reduce((sum, topping) => (sum = sum + topping.price), basePizza.price);

    const changeSelectedToppings = (e) => {
        const toppingId = parseInt(e.target.value);
        setSelectedToppings(
            (prev) => prev.includes(toppingId) ?
                // delete the topping from the prev list
                prev.filter((item) => item !== toppingId) :
                // add the topping into the prev list 
                [...prev, toppingId]
        )
    };
    // console.log(selectedToppings);
    return (
        <div>
            <h2>Ciao, {userName}!</h2>
            {/* <img src="images/basePizza.png" alt="Pizza"></img> */}
            <p>Your pizza comes with sauce and cheese. Add more toppings below:</p>
            {/* Display all available toppings */}
            {allToppings.map(
                (topping) => (
                    <ToppingCheckCard key={topping.id}
                        onChange={changeSelectedToppings}
                        isSelected={selectedToppings.includes(topping.id)}
                        topping={topping}
                    />
                )
            )}
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button type="submit" name="MakePizza">Make It!</button>
        </div>
    );
}

function ToppingCheckCard({ topping, onChange, isSelected }) {
    // keep tracking how many times the componet has been called?
    // const renderCount = useRef(1);
    // useEffect(() => {renderCount.current += 1});
    // console.log(`ToppingCheckCard ${children} rendered ${renderCount.current} times`);
    const inputId = `topping-${topping.id}`;
    return (
        <>
            <input id={inputId} type="checkbox" value={topping.id}
                onChange={onChange} checked={isSelected}></input>
            <label htmlFor={inputId}>{topping.name}</label>
        </>
    );
}

export default PizzaBuilder;