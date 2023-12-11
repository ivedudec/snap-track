// filename: complex_script.js

/**
 * This code demonstrates a complex script that generates a fractal pattern called the Mandelbrot set.
 * It utilizes advanced mathematical calculations, graphics manipulation, and complex control flow.
 */

// Canvas settings
const canvasWidth = 800;
const canvasHeight = 800;
const maxIterations = 10000;
const zoomFactor = 200;
const offsetX = -canvasWidth / 2;
const offsetY = -canvasHeight / 2;

// Create canvas element
const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
document.body.appendChild(canvas);

// Get canvas context
const ctx = canvas.getContext('2d');

// Set up color scheme
const colors = [];
for (let i = 0; i < maxIterations; i++) {
  const hue = (360 / maxIterations) * i;
  const saturation = 100;
  const lightness = 50;
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  colors.push(color);
}

// Function to calculate Mandelbrot set
function calculateMandelbrot(x1, y1, x2, y2) {
  const pixels = [];

  for (let py = 0; py < canvasHeight; py++) {
    for (let px = 0; px < canvasWidth; px++) {
      const x = (px + offsetX) * zoomFactor / canvasWidth + x1;
      const y = (py + offsetY) * zoomFactor / canvasHeight + y1;

      let zx = 0;
      let zy = 0;

      let iterCount = 0;

      while (iterCount < maxIterations && zx * zx + zy * zy < 4) {
        const xtemp = zx * zx - zy * zy + x;
        zy = 2 * zx * zy + y;
        zx = xtemp;
        iterCount++;
      }

      const color = iterCount === maxIterations ? '#000' : colors[iterCount];

      pixels.push({
        x: px,
        y: py,
        color: color
      });
    }
  }

  return pixels;
}

// Function to render pixels on canvas
function renderPixels(pixels) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  pixels.forEach(pixel => {
    ctx.beginPath();
    ctx.rect(pixel.x, pixel.y, 1, 1);
    ctx.fillStyle = pixel.color;
    ctx.fill();
    ctx.closePath();
  });
}

// Function to zoom in on click
canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const zoomX = (x + offsetX) * zoomFactor / canvasWidth;
  const zoomY = (y + offsetY) * zoomFactor / canvasHeight;

  offsetX -= 0.25 * canvasWidth;
  offsetY -= 0.25 * canvasHeight;
  zoomFactor *= 2;

  const newPixels = calculateMandelbrot(zoomX, zoomY, zoomX + 1 / zoomFactor, zoomY + 1 / zoomFactor);
  renderPixels(newPixels);
});

// Initial rendering
const initialPixels = calculateMandelbrot(-2, -1.5, 1, 1);
renderPixels(initialPixels);
