import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import PizzaCanvas from "./pizzaCanvas";

const basePizza = { id: 1, name: "Base", price: 10, image: "/images/basePizza.png" };

function PizzaBuilder() {
    console.log("Pizza builder called");
    const [allToppings, setAllToppings] = useState([]);
    const [selectedToppingsId, setSelectedToppingsId] = useState([]); // Array of toppings'ID
    const location = useLocation();
    const userName = location.state?.userName || "guest";
    const navigate = useNavigate();
    const handleSubmit = () => {
        const selectedToppingsObjects = allToppings
            .filter((topping) => selectedToppingsId.includes(topping.id));
        navigate("/confirm", {
            state: {
                newOrder: {
                    userName,
                    pizza: { basePizza, selectedToppingsObjects },
                    totalPrice
                }
            }
        });
    }
    // mock fetching toppings data 
    useEffect(() => {
        async function updateToppings() {
            const fetchToppings = () => new Promise((resolveFn, rejectFn) => {
                setTimeout(() => {
                    console.log("Toppings Loaded");
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
            setAllToppings(response); // re-render the page
        }
        updateToppings();
    }, []);


    const totalPrice = allToppings.filter(topping => selectedToppingsId.includes(topping.id))
        .reduce((sum, topping) => (sum = sum + topping.price), basePizza.price);

    const changeSelectedToppings = (e) => {
        const toppingId = parseInt(e.target.value);
        setSelectedToppingsId(
            (prev) => prev.includes(toppingId) ?
                // delete the topping from the prev list
                prev.filter((item) => item !== toppingId) :
                // add the topping into the prev list 
                [...prev, toppingId]
        )
    };
    console.log(`Selected Toppings:${selectedToppingsId}`);
    return (
        <>
            <h2>Ciao, {userName}!</h2>
            <p>Your pizza comes with sauce and cheese. Add more toppings below:</p>
            <PizzaCanvas
                baseImage={basePizza.image}
                toppingsImages={allToppings
                    .filter(topping => selectedToppingsId.includes(topping.id) && topping.image)
                    .map(topping => topping.image)}
            />

            {/* Display all available toppings */}
            <br />
            {allToppings.map(
                (topping) => (
                    <ToppingCheckCard key={topping.id}
                        onChange={changeSelectedToppings}
                        isSelected={selectedToppingsId.includes(topping.id)}
                        topping={topping}
                    />
                )
            )}
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleSubmit}>Make It!</button>
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