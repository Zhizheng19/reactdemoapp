import { useLocation, useNavigate } from "react-router-dom";
import PizzaCanvas from "./pizzaCanvas";

function ConfirmPage() {
    const location = useLocation();
    const {userName, pizza} = location.state || {};
    console.log(userName, pizza);
    const navigate = useNavigate();

    // !userName || navigate("/login") ;
    // !pizza || navigate(); 

    return (
        <>
            <h2>Order Confirmation</h2>
            <p>Name: {userName}</p>

            <PizzaCanvas
                baseImage="/images/basePizza.png"
                toppingsImages={pizza.selectedToppings
                    .filter(t => t.image)
                    .map(t => t.image)}
            />

            <h4>You selected:</h4>
            <table className="confirmation-table">

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

            <p><strong>Total Price: ${pizza?.price.toFixed(2)}</strong></p>
            {/* <button onClick={handleGoToPayment}>Place Order</button> */}
        </>

    );
}

export default ConfirmPage;