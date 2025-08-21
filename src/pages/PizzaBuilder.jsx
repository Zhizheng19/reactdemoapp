import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useMemo } from "react";
import usePizzaResources from "../hooks/usePizzaResources";
import PizzaCanvas from "./PizzaCanvas";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal";

function PizzaBuilder() {
    if (process.env.NODE_ENV === "development") {
        console.log("Pizza builder called");
    }
    const { pizzaBase, toppings: allToppings, loaded, error } = usePizzaResources();
    const [selectedToppingsId, setSelectedToppingsId] = useState([]); // Array of toppings'ID
    const [showGoToCartModal, setShowGoToCartModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const location = useLocation();
    const userName = location.state?.userName || "guest";
    const navigate = useNavigate();
    if (process.env.NODE_ENV === "development") {
        console.log('pizzaBase:', pizzaBase, 'allToppings:', allToppings);
        console.log('Selected Toppings:', selectedToppingsId);
    }

    console.time("useMemo:");
    // use useMemo for saving the time for complex caluation
    const selectedToppingsObjects = useMemo(() =>
        loaded && allToppings
            ? allToppings.filter((topping) => selectedToppingsId.includes(topping.id))
            : []
        , [allToppings, selectedToppingsId]);
    const totalPrice = useMemo(() =>
        loaded && selectedToppingsObjects && pizzaBase ?
            selectedToppingsObjects.reduce((sum, topping) => (sum = sum + topping.price), pizzaBase.price)
            : 0
        , [selectedToppingsObjects, pizzaBase]);
    console.timeEnd("useMemo:");

    /*     console.time("wocache:");
        const selectedToppingsObjects = allToppings.filter((topping) => selectedToppingsId.includes(topping.id));
        const totalPrice = selectedToppingsObjects
                .reduce((sum, topping) => (sum = sum + topping.price), pizzBase.price);
        console.timeEnd("wocache:");
     */
    const { addToCart } = useCart();
    const handleAddToCart = async () => {
        const newPizza = {
            base: pizzaBase,
            selectedToppings: selectedToppingsObjects,
            price: totalPrice
        };

        try {
            const result = await addToCart(newPizza);
            if (result.success) {
                setShowGoToCartModal(true);
            } else {
                setErrorMessage(result.error || "Failed to add your pizza to cart");
                setShowErrorModal(true);
            }
        } catch (e) {
            setErrorMessage("Network error, please try again");
            setShowErrorModal(true);
        }

        /*         navigate("/confirm", {
                    state: {
                        userName,
                        pizza: { base: pizzaBase, selectedToppings: selectedToppingsObjects, price: totalPrice }
                    }
                }); */
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
    if (process.env.NODE_ENV === "development") {
        console.log('PizzaBuilder ending...');
    }
    if (!loaded) {
        console.log("loading");
        return (<p>Loading</p>);
    }
    if (error) {
        console.log('error');
        return <p>Error loading resources.</p>
    }
    return (
        <div className="page-container animate-slideUp">

            <div className="text-center">

                <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-yellow-300 to-orange-500 mb-4">
                    Ciao, {userName}!
                </h2>

                <p className="text-gray-700 mb-6 text-lg">
                    Your pizza comes with sauce and cheese. Add more toppings below:
                </p>

                <div className="flex justify-center p-5 
                bg-gradient-to-br from-gray-100 to-blue-200 
                rounded-xl shadow-inner mb-6">
                    <PizzaCanvas
                        baseImage={pizzaBase.image}
                        baseSize={pizzaBase.size}
                        toppings={selectedToppingsObjects}
                    />
                </div>

                {/* Display all available toppings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                <p className="total-text-center text-xl font-bold mb-6">Total Price: ${totalPrice.toFixed(2)}</p>

                <button className="bg-gradient-to-r from-amber-400 to-amber-600 text-white 
                font-semibold rounded-full px-10 py-4 text-lg 
                hover:shadow-xl hover:from-amber-500 hover:to-amber-700 
                transition-all"
                    onClick={handleAddToCart}>
                    Add To Cart
                </button>

            </div>
            {showGoToCartModal && (
                <Modal onClose={() => setShowGoToCartModal(false)}>
                    <h2 className="text-lg font-bold mb-4">
                        Pizza added to your cart!
                    </h2>

                    <button className="flex mt-4 justify-end bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/cart")} >
                        Go to Cart
                    </button>
                    {/* <button className="bg-gray-300 px-4 py-2 rounded" onClick={()=>setShowGoToCartModal(false)}></button> */}
                </Modal>
            )}
            {showErrorModal && (
                <Modal onClose={() => { setShowErrorModal(false) }}>
                    <div className="w-100 p-6">
                        <h2 className="text-lg font-bold text-red-600 text-center mb-4">
                            Error
                        </h2>
                        <p className="text-gray-700 text-center mb-6" >
                            {errorMessage}
                        </p>
                        <div className="mb-4 flex items-center justify-center">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                                onClick={() => setShowErrorModal(false)} >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
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
        <label className="flex items-center p-4 bg-white/70 rounded-xl
        cursor-pointer hover:bg-white/90 hover:shadow-lg transition-all">
            <input className="w-5 h-5 mr-4 accent-blue-600 scale-125"
                id={inputId}
                type="checkbox"
                value={topping.id}
                onChange={onChange}
                checked={isSelected}></input>
            <span className="flex-1 font-medium text-gray-800" >{topping.name}</span>
            <span className="font-bold text-blue-600">${topping.price.toFixed(2)}</span>
        </label>
    );
}

export default PizzaBuilder;