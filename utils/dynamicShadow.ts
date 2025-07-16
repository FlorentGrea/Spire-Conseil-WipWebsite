export const getDynamicShadow = (hasMounted: boolean, time: number = Date.now()) => {
  if (!hasMounted) return 'rgba(0, 0, 0, 0.1)';
  
  // Create a smooth oscillation between yellow and blue
  const animationTime = time * 0.001; // Faster animation (increased from 0.0003)
  const oscillation = Math.sin(animationTime); // Creates a value between -1 and 1
  
  // Map oscillation to color intensity with smoother transition
  const yellowIntensity = (oscillation + 1) / 2; // Maps -1,1 to 0,1
  const blueIntensity = 1 - yellowIntensity;
  
  // Blend the colors between blue and yellow
  const blendedColor = `rgba(${Math.round(0 * blueIntensity + 236 * yellowIntensity)}, ${Math.round(32 * blueIntensity + 181 * yellowIntensity)}, ${Math.round(115 * blueIntensity + 41 * yellowIntensity)}, 0.9)`;
  
  // Return just the color for use with drop-shadow filter
  return blendedColor;
}; 