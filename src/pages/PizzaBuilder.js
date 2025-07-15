import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import PizzaCanvas from "./pizzaCanvas";
import "./PizzaBuilder.css";

const basePizza = { id: 1, name: "Base", price: 10, image: "/images/basePizza.png" };

function PizzaBuilder() {
    const [allToppings, setAllToppings] = useState([]);
    const [selectedToppings, setSelectedToppings] = useState([]); // Array of toppings'ID
    const location = useLocation();
    // const navigate = useNavigate();
    const userName = location.state?.userName || "guest";
    // mock fetching toppings data 
    useEffect(() => {
        async function updateToppings() {
            const fetchToppings = () => new Promise((resolveFn, rejectFn) => {
                setTimeout(() => {
                    resolveFn([
                        { id: 1, name: "Pepperoni", price: 1.5, image: "/images/pepperoni.png" },
                        { id: 2, name: "Mushroom", price: 1.0, image: "/images/mushroom.png" },
                        { id: 3, name: "Green Olives", price: 1.0, image: "/images/green olive.png" },
                        { id: 4, name: "Green Peppers", price: 1.0, image: "/images/green pepper.png" },
                        { id: 5, name: "Double Cheese", price: 2.25 }
                    ])
                }, 500);
                
            });
            const response = await fetchToppings();
            setAllToppings(response);
        }
        updateToppings();
    }, []);


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
    console.log(selectedToppings);
    return (
        <>
            <h2>Ciao, {userName}!</h2>
            <p>Your pizza comes with sauce and cheese. Add more toppings below:</p>
            <PizzaCanvas
                baseImage={basePizza.image}
                toppingsImages={allToppings
                    .filter(topping => selectedToppings.includes(topping.id) && topping.image)
                    .map(topping=>topping.image) }
            />

            {/* Display all available toppings */}
            {/* {allToppings
                .filter((t) => selectedToppings.includes(t.id))
                .map((t) => (
                    <img
                        key={t.id}
                        src={t.image}
                        alt={t.name}
                        className="pizza-layer"
                        style={{ zIndex: 10 + t.id }}
                    />
                ))} */}
                <br/>
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
        </>
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