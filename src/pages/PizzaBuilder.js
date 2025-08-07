import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useMemo } from "react";
import usePizzaResources from "../hooks/usePizzaResources.js";
import PizzaCanvas from "./pizzaCanvas";

function PizzaBuilder() {
    console.log("Pizza builder called");
    const {pizzaBase, toppings: allToppings, loaded, error} = usePizzaResources();
    const [selectedToppingsId, setSelectedToppingsId] = useState([]); // Array of toppings'ID
    const location = useLocation();
    const userName = location.state?.userName || "guest";
    // const navigate = useNavigate();

    console.log('pizzaBase:',pizzaBase, 'allToppings:', allToppings);
    console.log('Selected Toppings:', selectedToppingsId);

    console.time("useMemo:");
    // use useMemo for saving the time for complex caluation
    const selectedToppingsObjects = useMemo(() =>
        allToppings?.filter((topping) => selectedToppingsId.includes(topping.id))
        , [allToppings, selectedToppingsId]);
    const totalPrice = useMemo(() =>
        selectedToppingsObjects
            ?.reduce((sum, topping) => (sum = sum + topping.price), pizzaBase.price)
        , [selectedToppingsObjects]);
    console.timeEnd("useMemo:");

    /*     console.time("wocache:");
        const selectedToppingsObjects = allToppings.filter((topping) => selectedToppingsId.includes(topping.id));
        const totalPrice = selectedToppingsObjects
                .reduce((sum, topping) => (sum = sum + topping.price), pizzBase.price);
        console.timeEnd("wocache:");
     */
    const handleSubmit = () => {
        navigate("/confirm", {
            state: {
                userName,
                pizza: { base: pizzaBase, selectedToppings: selectedToppingsObjects, price: totalPrice }
            }
        });
    }

    const changeSelectedToppings = (e) => {
        const toppingId = e.target.value;
        setSelectedToppingsId(
            (prev) => prev.includes(toppingId) ?
                // delete the topping from the prev list
                prev.filter((item) => item !== toppingId) :
                // add the topping into the prev list 
                [...prev, toppingId]
        )
    };
    console.log('PizzaBuilder ending...');
    if (!loaded) {
        console.log("loading");
        return <p>Loading</p>
    }
    if (error) {
        console.log('error');
        return <p>Error loading resources.</p>
    }

    return (
        <div className="page-container">
            <div className="pizza-builder">
                <h2>Ciao, {userName}!</h2>
                <p className="pizza-description">Your pizza comes with sauce and cheese. Add more toppings below:</p>
                <div className="canvas-container">
                    <PizzaCanvas
                        baseImage={pizzaBase.image}
                        baseSize={pizzaBase.size}
                        toppings={allToppings
                            .filter(topping => selectedToppingsId.includes(topping.id) && topping.image)}
                    />
                </div>
                {/* Display all available toppings */}
                <div className="topping-container">
                    {allToppings.map(
                        (topping) => (
                            <ToppingCheckCard key={topping.id}
                                onChange={changeSelectedToppings}
                                isSelected={selectedToppingsId.includes(topping.id)}
                                topping={topping}
                            />
                        )
                    )}
                </div>
                <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
                <button className="btn btn-large hover-glow" onClick={handleSubmit}>Make It!</button>
            </div>
        </div>
    );
}

function ToppingCheckCard({ topping, onChange, isSelected }) {
    // keep tracking how many times the componet has been called?
    // const renderCount = useRef(1);
    // useEffect(() => {renderCount.current += 1});
    // console.log(`ToppingCheckCard ${children} rendered ${renderCount.current} times`);
    const inputId = `topping-${topping.id}`;
    console.log(inputId, topping, isSelected);
    return (
        <label className="topping-card">
            <input className="topping-checkbox" id={inputId} type="checkbox" value={topping.id}
                onChange={onChange} checked={isSelected}></input>
            <span className="topping-label" >{topping.name}</span>
            <span className="topping-price">${topping.price.toFixed(2)}</span>
        </label>
    );
}

export default PizzaBuilder;