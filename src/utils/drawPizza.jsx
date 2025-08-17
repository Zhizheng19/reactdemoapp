import { loadImage } from "./imageLoader";
/**
 * @param {number} count number of toppings
 * @param {number} radius 
 * @param {number} canvasSize 
 * @param {number} safeMargin 
 * @param {Array} existingPositions avoid overlap
 * @returns {Array} [{x, y, rotation}]
 */
function generateToppingPositions(count, radius, canvasSize, safeMargin, existingPositions) {
  const positions = [];
  const maxAttempts = 100;

  for (let i = 0; i < count; i++) {
    let placed = false;
    let attempt = 0;

    while (!placed && attempt < maxAttempts) {
      attempt++;

      const angle = Math.random() * 2 * Math.PI;
      const distanceFromCenter = (canvasSize / 2 - safeMargin) * Math.sqrt(Math.random());
      const x = canvasSize / 2 + distanceFromCenter * Math.cos(angle);
      const y = canvasSize / 2 + distanceFromCenter * Math.sin(angle);

      // 检查重叠
      let overlapping = false;
      for (const pos of existingPositions) {
        const dx = pos.x - x;
        const dy = pos.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius * 1.5) {
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        positions.push({ x, y, rotation: Math.random() * 2 * Math.PI });
        existingPositions.push({ x, y });
        placed = true;
      }
    }
  }
  return positions;
}

/**
 * @param {HTMLCanvasElement} canvas 
 * @param {string} baseImage url of pizza base
 * @param {number} baseSize 
 * @param {Array} toppings  image and radius 
 * @param {function} onCancel 查询取消信号，返回 true 代表已取消
 * @returns {Promise<void>}
 */
export async function drawPizza(canvas, baseImage, baseSize, toppings, onCancel, onCount) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!baseImage || !baseSize || !toppings) return;

  const base = await loadImage(baseImage);
    console.log(onCancel(), onCount());
  if (onCancel && onCancel()) return;
  ctx.drawImage(base, 0, 0, baseSize, baseSize);

  const existingPositions = [];
  const safeMargin = 50;

  for (const t of toppings) {
    if (!t.image) continue;

    const img = await loadImage(t.image);
    if (onCancel && onCancel()) return;

    const count = Math.floor(Math.random() * 3) + 8;
    const positions = generateToppingPositions(count, t.radius, canvas.width, safeMargin, existingPositions);

    for (const pos of positions) {
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(pos.rotation);
      ctx.drawImage(img, -t.radius, -t.radius, t.radius * 2, t.radius * 2);
      ctx.restore();
    }
  }
}
