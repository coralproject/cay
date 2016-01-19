import * as types from '../actions/playground';

const initialState = {
  customizerIsVisible: false,
  togglerGroups: { 
    "moderation": {
      name: "Moderation",
      togglers: {
        "emoji": {
          label: "Enable Emoji",
          description: "Enables Emoji icons on comments.",
          status: false
        },
        "reactions": {
          label: "Enable Reactions",
          description: "Enables Reactions (other than likes) on comments.",
          status: false
        }
      }
    },
    "privacy": {
      name: "Privacy",
      togglers: {
        "anonymity": {
          label: "Anonimity is OFF",
          description: "This means pseudonyms (nicknames) are allowed.",
          status: false
        },
        "public_profile": {
          label: "Public Profile is OFF",
          description: "Visitor are able to see your public profile.",
          status: false
        }
      }
    },
    "reputation": {
      name: "Reputation",
      togglers: {
        "badges": {
          label: "Badges are OFF",
          description: "Badges are common in discussion boards to show reputation achievements of a user.",
          status: false
        },
        "privileges": {
          label: "Privileges are ON",
          description: "Many reputation systems allow certain privileges (as moderating others) as you gain reputation.",
          status: false
        }
      }
    },
    "content": {
      name: "Content",
      togglers: {
        "rich_content": {
          label: "Rich content is OFF",
          description: "Using bold or italic typefaces, possibly adding images.",
          status: false
        },
        "emojis": {
          label: "Emojis are ON",
          description: "Emojis or other types or emoticons are widely used to convey emotion.",
          status: false
        }
      }
    },
  },
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
