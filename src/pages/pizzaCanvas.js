import { useRef, useEffect } from "react";

function PizzaCanvas({ baseImage, toppingsImages }) {
  console.log(toppingsImages)
  const canvasRef = useRef(null);

  // Why do we use useEffect here?
  // DOM is not mounted when the PizzaCanvas being called
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => {
          console.error(`Fail to load image: ${src}`, err);
          reject(err);
        };
      });
    };

    const loadAndDraw = async () => {
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw base
      const base = await loadImage(baseImage);
      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

      const existingPositions = [];
      const safeMargin = 50; // padding from edge
      const toppingRadius = 15; // set the same radius for all toppings for now
      const maxAttempts = 100;

      // 2. Draw each topping
      for (const toppingImage of toppingsImages) {
        const img = await loadImage(toppingImage);
        const count = Math.floor(Math.random() * 3) + 8;

        for (let i = 0; i < count; i++) {
          let placed = false;
          let attempt = 0;

          while (!placed && attempt < maxAttempts) {
            attempt++;

            // position within circular area
            const angle = Math.random() * 2 * Math.PI;
            const radius = (canvas.width / 2 - safeMargin) * Math.sqrt(Math.random());
            const x = canvas.width / 2 + radius * Math.cos(angle);
            const y = canvas.height / 2 + radius * Math.sin(angle);

            // check for overlap
            let overlapping = false;
            for (const pos of existingPositions) {
              const dx = pos.x - x;
              const dy = pos.y - y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < toppingRadius * 1.5) {
                overlapping = true;
                break;
              }
            }

            if (!overlapping) {
              const rotation = Math.random() * 2 * Math.PI;

              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(rotation);
              ctx.drawImage(img, -toppingRadius, -toppingRadius, toppingRadius * 2, toppingRadius * 2);
              ctx.restore();

              existingPositions.push({ x, y });
              placed = true;
            }
          }
        }
      }
    };

    loadAndDraw();
  }, [toppingsImages, baseImage]);

  return <canvas ref={canvasRef} width={300} height={300}></canvas>;
}

export default PizzaCanvas;
