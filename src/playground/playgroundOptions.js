const togglerGroups = {
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
  'layout': {
    name: 'Layout',
    togglers: {
      'hiddenbydefault': {
        label: 'Hidden by default is ON',
        offLabel: 'Hidden by default is OFF',
        description: 'Hides comments until a user clicks to read them.',
        status: false,
        topic: 'hiddenbydefault'
      },
      'profilepictures': {
        label: 'Profile pictures are ON',
        offLabel: 'Profile pictures are OFF',
        description: 'Whether to show profile pictures or not.',
        status: false,
        topic: 'profilepictures'
      }
    },
  },
  'moderation': {
    name: 'Moderation',
    togglers: {
      'staffpicks': {
        label: 'Staff Picks is ON',
        offLabel: 'Staff Picks is OFF',
        description: 'Shows a tab separating staff picks from other comments.',
        status: false,
        topic: 'staffpicks'
      },
      'muting': {
        label: 'Block/mute is ON',
        offLabel: 'Block/mute is OFF',
        description: 'Blocking users will hide their posts from the comment stream.',
        status: false,
        topic: 'muting',
        pulseTarget: 'commentName'
      }
    }
  },
  'privacy': {
    name: 'Privacy',
    togglers: {
      'anonymity': {
        label: 'Anonymity is ON',
        offLabel: 'Anonymity is OFF',
        description: 'Enabling users to remain completely anonymous (no real names or nicknames).',
        status: false,
        topic: 'anonymity',
        pulseTarget: 'commentName'
      },
      'pseudonyms': {
        label: 'Pseudonyms are ON',
        offLabel: 'Pseudonyms are OFF',
        description: 'This means pseudonyms (nicknames) are allowed.',
        status: false,
        topic: 'pseudonyms',
        pulseTarget: 'commentName'
      },
      'public_profile': {
        label: 'Public Profile is ON',
        offLabel: 'Public Profile is OFF',
        description: 'Visitors are able to see your public profile.',
        status: false,
        topic: 'public_profile',
        pulseTarget: 'commentName'
      }
    }
  },
  'reputation': {
    name: 'Reputation',
    togglers: {
      'stats': {
        label: 'Statistics are ON',
        offLabel: 'Statistics are OFF',
        description: 'Reputation statistics...',
        status: false,
        topic: 'stats'
      },
      'badges': {
        label: 'Badges are ON',
        offLabel: 'Badges are OFF',
        description: 'Badges are common in discussion boards to show reputation achievements of a user.',
        status: false,
        topic: 'badges'
      },
      'privileges': {
        label: 'Moderation Privileges are ON',
        offLabel: 'Moderation Privileges are OFF',
        description: 'Many reputation systems allow certain privileges (as moderating others) as you gain reputation.',
        status: false,
        topic: 'privileges',
        pulseTarget: 'commentTools'
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
        status: false,
        topic: 'reactions'
      },
      'likes': {
        label: 'Likes are ON',
        offLabel: 'Likes are OFF',
        description: 'Enables likes on comments, no dislikes, just likes.',
        status: false,
        topic: 'likes'
      },
      'upvotes': {
        label: 'Up/Down voting is ON',
        offLabel: 'Up/Down voting is OFF',
        description: 'Enables up/down voting on comments.',
        status: false,
        topic: 'upvotes'
      }
    }
  },
  'stream': {
    name: 'Stream',
    togglers: {
      'permalinks': {
        label: 'Permalinks are ON',
        offLabel: 'Permalinks are OFF',
        description: 'Displays a link to a specific comment on a thread.',
        status: false,
        topic: 'permalinks'
      },
      'replies': {
        label: 'Nested Replies are ON',
        offLabel: 'Nested Replies are OFF',
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
      'guidelines': {
        label: 'Guidelines are ON',
        offLabel: 'Guidelines are OFF',
        description: 'Show community guidelines on top of the comment box.',
        status: false,
        topic: 'guidelines'
      },
      'mentions': {
        label: 'Mentions are ON',
        offLabel: 'Mentions are OFF',
        description: 'Mentions are often used as...',
        status: false,
        topic: 'mentions'
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
  },
  'experimental': {
    name: 'Experimental',
    togglers: {
      'replyrating': {
        label: 'Reply Rating is ON',
        offLabel: 'Reply Rating is OFF',
        description: 'Asks for a reply rating before posting a Reply. Enable Nested Replies to see it in action.',
        status: false,
        topic: 'replyrating'
      }
    }
  }
};

export default togglerGroups;
