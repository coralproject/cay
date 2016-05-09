// this method should clamp Dates too, because why not.
export const clamp = function(val, min, max) {

  const clamped =  Math.min(Math.max(val, min), max);

  if (Object.prototype.toString.call(val) === '[object Date]') {
    return new Date(clamped);
  } else {
    return clamped;
  }

};
