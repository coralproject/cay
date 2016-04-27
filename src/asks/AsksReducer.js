
const initial = [];
for (let i = 0; i < 100; i++) { initial.push({name: 'My ask', description: 'This is my first ask, I\'m pretty excited', answers: Math.floor(Math.random() * 100), _id: i}); }

const asks = (state = [], action) => {
  return initial;
};

export default asks;
