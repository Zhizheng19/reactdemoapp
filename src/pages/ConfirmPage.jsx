import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PizzaCanvas from "./PizzaCanvas";

function ConfirmPage() {
    const location = useLocation();
    const { userName, pizza } = location.state || {};
    console.log(userName, pizza);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userName) {
            navigate("/login");
        }
        else if (!pizza) {
            navigate("/pizzaBuilder", {
                state: { userName },
                replace: true
            });
        }
    }, [userName, pizza, navigate]);

    if (!userName || !pizza) {
        return <div>Redirecting...</div>;
    }

    const handlePlaceOrder = () => {

        navigate("/login", { replace: true }); // direct to login page for now.
        // TODO: direct to financial transaction page.
    };
    return (
        <div className="page-container">
            <div className="confirmation-container">
                <h2>Order Confirmation</h2>
                <p className="customer-name">Name: {userName}</p>
                <div className="canvas-container">
                    <PizzaCanvas
                        baseImage="/images/basePizza.png"
                        toppingsImages={pizza.selectedToppings
                            .filter(t => t.image)
                            .map(t => t.image)}
                    />
                </div>
                <h4>You selected:</h4>
                <table className="confirmation-table">
                    <thead>
                        <tr>
                            <th>Items</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Base</td>
                            <td>${pizza.base.price.toFixed(2)}</td>
                        </tr>
                        {pizza.selectedToppings.map((t) => (
                            <tr key={t.id}>
                                <td>{t.name}</td>
                                <td>${t.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="order-total">Total Price: ${pizza?.price.toFixed(2)}</p>
                <button className="btn btn-large hover-glow" onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
}

export default ConfirmPage;