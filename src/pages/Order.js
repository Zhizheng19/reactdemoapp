import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const allToppings = ["Pepperoni", "Mushroom", "Green Olives", "Green Peppers", "Double Cheese"];

function OrderPage() {
    const [SelectedToppings, setSelectedToppings] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const userName = location.state?.userName || "guest";


    const changeSelectedToppings = (e) => {
        setSelectedToppings(
            (prev) => prev.includes(e.target.value) ?
                // delete the topping from the prev list
                prev.filter((item) => item !== e.target.value) :
                // add the topping into the prev list 
                [...prev, e.target.value]
        )
    };
    return (
        <div>
            <h2>Ciao, {userName}!</h2>
            <img src="images/basePizza.png" alt="Pizza"></img>
            <p>Choose your pizza toppings:</p>
            {allToppings.map(
                (topping) => (
                    <ToppingCheckCard key={topping}
                        onChange={changeSelectedToppings}
                        selectedItems={SelectedToppings}>
                        {topping}
                    </ToppingCheckCard>
                )
            )}
        </div>
    );
}

function ToppingCheckCard({ children, onChange, selectedItems }) {
    // what do I do to keep tracking how many times the componet has been called?
    console.log("ToppingCheckCard");
    return (
        <>
            <input id={children} type="checkbox" value={children}
                onChange={onChange} checked={selectedItems.includes(children)}></input>
            <label htmlFor={children}>{children}</label>
        </>
    );
}

export default OrderPage;