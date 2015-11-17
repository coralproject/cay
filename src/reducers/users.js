import * as types from '../actions';

['Thorin', 'Fili', 'Kili', 'Balin', 'Dwalin', 'Oin', 'Gloin', 'Dori', 'Nori', 'Ori', 'Bifur', 'Bofur', 'Bombur'];

const initialState = {
  loading: false,
  message: 'It works',
  usersVisible: true,
  data: [
    {name: 'Thorin'},
    {name: 'Fili'},
    {name: 'Kili'},
    {name: 'Balin'},
    {name: 'Dwalin'},
    {name: 'Oin'},
    {name: 'Gloin'},
    {name: 'Dori'},
    {name: 'Nori'},
    {name: 'Ori'},
    {name: 'Bifur'},
    {name: 'Bofur'},
    {name: 'Bombur'}
  ]
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALL:
      return Object.assign({}, state, {usersVisible: true});
    case types.HIDE_ALL:
      return Object.assign({}, state, {usersVisible: false});
    default:
      return state;
  }
}

export default users;
