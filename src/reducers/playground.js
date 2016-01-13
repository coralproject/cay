import * as types from '../actions/playground';

const initialState = {
  customizerIsVisible: false,
  togglerGroups: [
    {
      name: "Moderation",
      togglers: [
        {
          id: "emoji",
          label: "Enable Emoji",
          description: "Enables Emoji icons on comments.",
          status: false
        },
        {
          id: "reactions",
          label: "Enable Reactions",
          description: "Enables Reactions (other than likes) on comments.",
          status: false
        }
      ]
    },
    {
      name: "Privacy",
      togglers: [
        {
          id: "anonymity",
          label: "Anonimity is OFF",
          description: "This means pseudonyms (nicknames) are allowed.",
          status: false
        },
        {
          id: "public_profile",
          label: "Public Profile is OFF",
          description: "Visitor are able to see your public profile.",
          status: false
        }
      ]
    }
  ],
  comments: [
    {
      content: "Lorem ipsum dollar",
      likes: 28
    },
    {
      content: "Another comment",
      likes: 41
    }
  ]
};

const playground = (state = initialState, action) => {

  switch (action.type) {

    case types.SHOW_CUSTOMIZER:
      return Object.assign({}, state, { customizerIsVisible: true });

    case types.HIDE_CUSTOMIZER:
      return Object.assign({}, state, { customizerIsVisible: false });

    case types.SET_TOGGLER:
      state.togglerGroups[ action.groupIndex ].togglers[ action.togglerIndex ].status = action.status;
      return state;

    default:
      console.log('Not a Playground action:', action.type);
      return state;
  }

  return state;

};

export default playground;
