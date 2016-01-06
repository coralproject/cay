export const SHOW_CUSTOMIZER = "SHOW_CUSTOMIZER";
export const HIDE_CUSTOMIZER = "HIDE_CUSTOMIZER";

export const showCustomizer = () => {
  return {
    type: SHOW_CUSTOMIZER
  };
};

export const hideCustomizer = () => {
  return {
    type: HIDE_CUSTOMIZER
  };
};
