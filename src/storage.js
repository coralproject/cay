
export default {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return;
    }
  },

  set(key, value) {
    try {
      return localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      return;
    }
  },

  remove(key) {
    delete localStorage[key];
  }
};
