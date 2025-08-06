import { useEffect, useState } from "react";

export default function usePizzaResources() {
    console.log("usePizzaResources called");
    const [pizzaBase, setPizzaBase] = useState(null);
    const [toppings, setToppings] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchResources() {
            try {
                console.log("fetching resources...");
                setLoaded(false);
                const [productsRes, toppingsRes, visualsRes] = await Promise.all([
                    fetch("http://localhost:3001/products"),
                    fetch("http://localhost:3001/toppings"),
                    fetch("/config/pizzaCanvasVisual.json")
                ]);

                const [products, toppings, visuals] = await Promise.all([
                    productsRes.json(),
                    toppingsRes.json(),
                    visualsRes.json()
                ]);
                console.log("data parsed\n");
                console.log("type of id", typeof products[0].id,
                    typeof toppings[0].id
                );

                // merge pizza data with visual resources
                const pizzaBaseData = products.find(p => p.type === "pizza");
                const pizzaBaseVisual = visuals.pizzaBase;
                const finalPizzaBase = {
                    ...pizzaBaseData,
                    image: pizzaBaseVisual?.image,
                    size: pizzaBaseVisual?.size
                };
                // merge topping data with relavant visual resources
                const toppingsVisual = visuals.toppings;
                const finalToppings = toppings.map(t => {
                    const tName = toSnakeCase(t.name);
                    console.log("tName:", tName);
                    const tVisual = toppingsVisual.find(v => tName === v.name);
                    return {
                        ...t,
                        image: tVisual?.image,
                        radius: tVisual?.radius
                    }
                });
                console.log("data merged with visuals ");
                setToppings(finalToppings);
                setPizzaBase(finalPizzaBase);
            } catch (error) {
                console.error("Error loading resources:", error);
                setError(error);
            } finally {
                console.log("Data are ready， refresh the page");
                setLoaded(true);
            }
        }
        console.log("before calling fetchResources");
        fetchResources();
        console.log("after calling fetchResources");
    }, []);
    console.log("returning resources");
    return { pizzaBase, toppings, loaded, error };
}

function toSnakeCase(str) {
    return str
        .replace(/[\s\-]+/g, '_')               // space or dash -> underscore
        .toLowerCase();
}
