export function generateColors(numColors: number) {
  const colors = [];
  const hueStart = 220;
  const hueEnd = 270;
  const saturation = 100;

  const lightnessIncrement = 70 / numColors;
  for (let i = 0; i < numColors; i++) {
    const hue = hueStart + (i * (hueEnd - hueStart)) / numColors;
    const lightness = 10 + i * lightnessIncrement;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    colors.push(color);
  }

  return colors;
}
