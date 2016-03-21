export const clamp = function(val, min, max) {
  return Math.min(Math.max(val, min), max);
};
