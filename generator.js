import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import {
  generatePalette,
  generateFaviconFromSVG,
  updateUrl,
  getParamsFromUrl,
} from "./utils.js";

const SIZE = getParamsFromUrl().size || 5;
const HEIGHT = 50;
const WIDTH = HEIGHT * SIZE;

const svg = SVG()
  .addTo("#sketch")
  .size(WIDTH, HEIGHT)
  .viewbox(0, 0, WIDTH, HEIGHT);

const drawPalette = (palette) => {
  palette.forEach((color, index) => {
    const size = WIDTH / SIZE;

    svg
      .rect(size, size)
      .x(size * index)
      .fill(color);
  });

  document.querySelector("#colors").textContent = palette.toString();
};

const removeOldPalette = () => {
  document.querySelectorAll("rect").forEach(square => square.remove())
}

const obtainPalette = (ignoreUrl) => {
  const paletteParams = !ignoreUrl &&
    getParamsFromUrl().palette && getParamsFromUrl().palette.split(",");
  const palette = paletteParams || generatePalette(SIZE);

  return palette
}

const generate = (ignoreUrl) => {
  const palette = obtainPalette(ignoreUrl)

  const favicon = SVG().size(10, 10).viewbox(0, 0, 10, 10);
  favicon.rect(10, 10).fill(palette[0]);

  removeOldPalette()
  drawPalette(palette);
  updateUrl({ size: SIZE, palette: palette.toString()});
  generateFaviconFromSVG(favicon.node);
};

document.querySelector("#generate").addEventListener("click", () => {
  generate(true);
});

generate();
