export const SHOW_CUSTOMIZER = "SHOW_CUSTOMIZER";
export const HIDE_CUSTOMIZER = "HIDE_CUSTOMIZER";
export const SET_TOGGLER = "SET_TOGGLER";

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

export const setToggler = (groupIndex, togglerIndex, status) => {
  return {
    type: SET_TOGGLER,
    groupIndex: groupIndex,
    togglerIndex: togglerIndex,
    status: status
  };
};

