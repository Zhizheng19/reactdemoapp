import { useLocation } from "react-router-dom";
import PizzaCanvas from "./pizzaCanvas";

function ConfirmPage() {
    const location = useLocation();
    const newOrder = location.state?.newOrder || {};
    return (
        <>
            <h2>Order Confirmation</h2>
            <p>Name: {newOrder.userName}</p>

            <PizzaCanvas
                baseImage="/images/basePizza.png"
                toppingsImages={newOrder.pizza.selectedToppingsObjects
                    .filter(t => t.image)
                    .map(t => t.image)}
            />

            <h4>You selected:</h4>
            <table className="confirmation-table">

                <tbody>
                    <tr>
                        <td>Base</td>
                        <td>${newOrder.pizza.basePizza.price.toFixed(2)}</td>
                    </tr>
                    {newOrder.pizza.selectedToppingsObjects.map((t) => (
                        <tr key={t.id}>
                            <td>{t.name}</td>
                            <td>${t.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p><strong>Total Price: ${newOrder.totalPrice?.toFixed(2)}</strong></p>
        </>

    );
}

export default ConfirmPage;