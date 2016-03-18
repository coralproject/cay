const togglerGroups = { 
  'layout': {
    name: 'Layout',
    togglers: {
      'hiddenbydefault': {
        label: 'Hidden by default is ON',
        offLabel: 'Hidden by default is OFF',
        description: 'Hides comments until a user clicks to read them.',
        status: false,
        topic: 'hiddenbydefault'
      }
    }
  },
  'moderation': {
    name: 'Moderation',
    togglers: {
      'muting': {
        label: 'Block/mute is ON',
        offLabel: 'Block/mute is OFF',
        description: 'Blocking users will hide their posts from the comment stream.',
        status: false,
        topic: 'muting'
      }
    }
  },
  'privacy': {
    name: 'Privacy',
    togglers: {
      'anonymity': {
        label: 'Anonymity is ON',
        offLabel: 'Anonymity is OFF',
        description: 'This means pseudonyms (nicknames) are allowed.',
        status: false,
        topic: 'anonymity'
      },
      'public_profile': {
        label: 'Public Profile is ON',
        offLabel: 'Public Profile is OFF',
        description: 'Visitors are able to see your public profile.',
        status: false,
        topic: 'public_profile'
      }
    }
  },
  'reputation': {
    name: 'Reputation',
    togglers: {
      'badges': {
        label: 'Badges are ON',
        offLabel: 'Badges are OFF',
        description: 'Badges are common in discussion boards to show reputation achievements of a user.',
        status: false,
        topic: 'badges'
      },
      'privileges': {
        label: 'Privileges are ON',
        offLabel: 'Privileges are OFF',
        description: 'Many reputation systems allow certain privileges (as moderating others) as you gain reputation.',
        status: false,
        topic: 'privileges'
      }
    }
  },
  'content': {
    name: 'Content',
    togglers: {
      'rich_content': {
        label: 'Rich content is ON',
        offLabel: 'Rich content is OFF',
        description: 'Using bold or italic typefaces, possibly adding images.',
        status: false,
        topic: 'rich_content'
      },
      'emoji': {
        label: 'Emojis are ON',
        offLabel: 'Emojis are OFF',
        description: 'Emojis and other types of emoticons are widely used to convey emotion.',
        status: false,
        topic: 'emoji'
      }
    }
  },
  'interaction': {
    name: 'Interaction',
    togglers: {
      'reactions': {
        label: 'Reactions are ON',
        offLabel: 'Reactions are OFF',
        description: 'Enables Reactions (other than likes) on comments.',
        status: false
      },
      'likes': {
        label: 'Likes are ON',
        offLabel: 'Likes are OFF',
        description: 'Enables likes on comments, no dislikes, just likes.',
        status: false
      },
      'upvotes': {
        label: 'Up/Down voting is ON',
        offLabel: 'Up/Down voting is OFF',
        description: 'Enables up/down voting on comments.',
        status: false
      }
    }
  },
  'stream': {
    name: 'Stream',
    togglers: {
      'replies': {
        label: 'Replies are ON',
        offLabel: 'Replies are OFF',
        description: 'Allows nested replies on comments.',
        status: false,
        topic: 'replies'
      },
      'trolls': {
        label: 'Trolls are ON',
        offLabel: 'Trolls are OFF',
        description: 'Show sample troll-like content in the stream.',
        status: false,
        topic: 'trolls'
      }
    }
  },
  'community': {
    name: 'Community',
    togglers: {
      'mentions': {
        label: 'Mentions are ON',
        offLabel: 'Mentions are OFF',
        description: 'Mentions are often used as...',
        status: false,
        topic: 'replies'
      },
      'following': {
        label: 'Following is ON',
        offLabel: 'Following is OFF',
        description: 'Allows following users and getting notified of new posts.',
        status: false,
        topic: 'following'
      },
      'privatemessages': {
        label: 'Private messages are ON',
        offLabel: 'Private messages are OFF',
        description: 'Allows sending private messages between users.',
        status: false,
        topic: 'privatemessages'
      }
    }
  }
};

export default togglerGroups;