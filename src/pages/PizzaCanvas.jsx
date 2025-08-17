import { useRef, useEffect } from "react";
import { loadImage } from "../utils/imageLoader"
import { drawPizza } from "../utils/drawPizza";
let number = 0;
function PizzaCanvas({ baseImage, baseSize, toppings }) {
  console.log("PizzaCanvas has toppings:", toppings)

  const canvasRef = useRef(null);
  // Why do we use useEffect here?
  // DOM is not mounted when the PizzaCanvas being called
  useEffect(() => {

    let cancelled = false; // a flag to prevent updating the canvas after a new change of dependencies

    const onCancel = () => cancelled;
    const onCount = () => number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawPizza(canvas, baseImage, baseSize, toppings, onCancel, onCount);


    return () => {
      cancelled = true
      number += 1;
    };
  }, [toppings, baseImage, baseSize]);

  return <canvas ref={canvasRef} width={baseSize || 300} height={baseSize || 300} ></canvas>;
}

export default PizzaCanvas;
