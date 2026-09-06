const input = document.getElementById("input");
const preview = document.getElementById("preview");
const size = document.getElementById("size");
const sizeValue = document.getElementById("sizeValue");
const clear = document.getElementById("clear");
const download = document.getElementById("download");

function updatePreview() {
  preview.textContent = input.value || "Type something above...";
  preview.style.fontSize = `${size.value}px`;
  sizeValue.textContent = `${size.value}px`;
}

input.addEventListener("input", updatePreview);
size.addEventListener("input", updatePreview);

clear.addEventListener("click", () => {
  input.value = "";
  updatePreview();
  input.focus();
});

// Download the preview using the browser's canvas.
// The font must be loaded before measuring/drawing.
download.addEventListener("click", async () => {
  await document.fonts.ready;

  const text = input.value || "Decoy Font";
  const fontSize = Number(size.value);
  const padding = 60;
  const maxWidth = 1600;

  const measureCanvas = document.createElement("canvas");
  const measure = measureCanvas.getContext("2d");
  measure.font = `${fontSize}px "DecoyFont"`;

  const lines = text.split("\n");
  const lineHeight = fontSize * 1.2;

  let width = 0;
  for (const line of lines) {
    width = Math.max(width, measure.measureText(line || " ").width);
  }

  width = Math.min(Math.max(width + padding * 2, 400), maxWidth);
  const height = Math.max(lines.length * lineHeight + padding * 2, 300);

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width);
  canvas.height = Math.ceil(height);

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";
  ctx.font = `${fontSize}px "DecoyFont"`;
  ctx.textBaseline = "top";

  lines.forEach((line, i) => {
    ctx.fillText(line, padding, padding + i * lineHeight);
  });

  const link = document.createElement("a");
  link.download = "decoy-text.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

updatePreview();
