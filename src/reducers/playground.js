import * as types from '../actions/playground';

const initialState = {
  customizerIsVisible: false,
  currentSidebarTopic: null,
  togglerGroups: { 
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
  },
  comments: [
    {
      user: 0,
      content: "{community.mentions} Hello, @coolcat{/community.mentions}. Clinton is a smart guy, but I only started to trust or like him was when he was no longer running. And here he is running for his wife, Hillary. For him to lecture Sanders, or the public about Sanders, on the subject of honesty or integrity, is too much. I don't buy it. {content.emoji}:smile:{/content.emoji}",
      likes: 28,
      liked: false,
      reactions: ['heart', 'ok_woman'],
      upvoted: false
    },
    {
      user: 1,
      content: 'Testing some emojis. :ok_woman: :heart: :bowtie: :hankey:  :horse_racing:',
      likes: 11,
      liked: false,
      reactions: ['heart', 'ok_woman'],
      upvoted: false
    },
    {
      user: 2,
      content: "Hillary placed a bet a few years ago, that the system was corrupt, that SuperPAC's were the only way to go in the post-Citizens United era, and that she could get speaking fees from Wall St. and still come across as being less in-their-pocket than her Republican rivals.",
      likes: 4,
      liked: false,
      reactions: ['heart', 'ok_woman'],
      upvoted: false
    },
    {
      user: 1,
      content: "Is it possible that Bill is going off script here? It would be hard to believe the campaign is encouraging this. Maybe he's become a difficult to control wildcard.",
      likes: 7,
      liked: false,
      reactions: ['heart', 'ok_woman'],
      upvoted: false
    },
    {
      user: 3,
      content: "Sanders will keep the high road because so many young people are supporting him. Ignore the side show!",
      likes: 2,
      liked: false,
      reactions: ['heart', 'ok_woman'],
      upvoted: false
    },
    {
      user: 2,
      content: "Bill's petty and pathetic remarks should be enough to make any undecided voter vote for Bernie. It's sad to see Bill shilling for Hillary in such a vulgar way.",
      likes: 9,
      liked: false,
      reactions: ['heart', 'ok_woman'],
      upvoted: false
    },
    {
      user: 1,
      content: "What sickness that the Clintons think they can criticize anybody about anything. They are greedy, hypocritical, untruthful sociopaths who will take those qualities to the White House in less than a year. ",
      likes: 1,
      liked: false,
      reactions: ['heart', 'ok_woman'],
      upvoted: false
    },
    {
      user: 0,
      content: "Anybody but Clinton. Heck, I would even vote for Sarah Palin before I would vote for Hillary Clinton. At least Palin appears to be honest, and she is not part of a corrupt political machine.",
      likes: 24,
      liked: false,
      reactions: ['heart', 'ok_woman'],
      upvoted: false
    },

  ],
  wizardSteps: [
    {
      content: 'Do you think users should be able to remain anonymous (using a nickname)?',
      yesLabel: 'Yes',
      noLabel: 'No',
      affectedGroup: 'privacy',
      affectedToggler: 'anonymity'
    },
    {
      content: 'Should rich content (bold, italics, links) be allowed inside comments?',
      yesLabel: 'Yes',
      noLabel: 'No',
      affectedGroup: 'content',
      affectedToggler: 'rich_content'
    }
  ],
  topics: {
    'anonymity': {
      title: 'Anonymity',
      description: 'Some users prefer being anonymous to express their opinions freely, others think that this leads to...',
      hashtag: 'Anonymity',
      links: [
        {
          friendlyName: 'Anonymity - Wikipedia',
          href: 'https://en.wikipedia.org/wiki/Anonymity'
        },
        {
          friendlyName: 'Anonymity - Electronic Frontier Foundation',
          href: 'https://www.eff.org/es/issues/anonymity'
        }
      ]
    },
    'public_profile': {
      title: 'Public Profiles',
      description: 'Having a public profile on a community allows people to find you with different search methods. Some users prefer not to be searchable or having a public profile at all.',
      hashtag: 'PublicProfiles',
      links: [
        {
          friendlyName: '(links pending)',
          href: 'https://en.wikipedia.org/wiki/Anonymity'
        }
      ]
    },
    'emoji': {
      title: 'Emojis',
      description: 'After years of different emoticon packs and instant messengers, Emojis made it into a standard. They can be used to convey emotions and feelings in conversation, but they can also lead to introducing noise if abused.',
      hashtag: 'Emojis',
      links: [
        {
          friendlyName: 'Emojipedia',
          href: 'http://emojipedia.org/'
        }
      ]
    },
    'badges': {
      title: 'Badges',
      description: 'Badges are a way to show recognition on diffent aspects of a user\'s community participation...',
      hashtag: 'Badges',
      links: [
        {
          friendlyName: 'Badges - Poynter.org',
          href: 'http://www.poynter.org/2011/how-badges-help-news-websites-build-community-make-money/140653/'
        }
      ]
    },
    'muting': {
      title: 'Blocking & Muting Users',
      description: 'Muting a user is the most basic way to avoid unwanted behaviour on your comment stream...',
      hashtag: 'Blocking',
      links: [
        {
          friendlyName: '(link pending)',
          href: 'http://#'
        }
      ]
    }
  },
  users: [
    {
      nickName: 'democrateel',
      realName: 'Eelary Clintoon',
      comments: 1912,
      points: 1244,
      membershipAge: '2 years',
      location: 'Denver, AR',
      education: 'B.S. Computer Science',
      upvoteBalance: 89,
      badges: [
        {
          name: 'Verified identity',
          icon: 'badge',
          color: '#090'
        }
      ]
    },
    {
      nickName: 'republicantrout',
      realName: 'Donald Trout',
      comments: 243,
      points: 124,
      membershipAge: '2 years',
      location: 'Portland, OR',
      education: 'Ph. D. Economics',
      upvoteBalance: 42,
      badges: [
        {
          name: 'Top 5% contributors',
          icon: 'trophy',
          color: '#a90'
        },
        {
          name: 'Expert moderator',
          icon: 'medal',
          color: '#09a'
        }
      ]
    },
    {
      nickName: 'satanicverses',
      realName: 'Salmon Rushdie',
      comments: 110,
      points: 244,
      membershipAge: '1 year',
      location: 'New York, NY',
      education: 'Ph. D. Arts History',
      upvoteBalance: 22,
      badges: [
        {
          name: 'Expert moderator',
          icon: 'medal',
          color: '#09a'
        }
      ]
    },
    {
      nickName: 'nobeyonce',
      realName: 'Tuna Turner',
      comments: 124,
      points: 124,
      membershipAge: '6 years',
      location: 'Seattle, WA',
      education: 'B.A. Popular music',
      upvoteBalance: 42,
      badges: [
        {
          name: 'Expert moderator',
          icon: 'medal',
          color: '#09a'
        }
      ]
    }
  ]
};

const playground = (state = initialState, action) => {

  switch (action.type) {

  case types.SHOW_CUSTOMIZER:
    return Object.assign({}, state, { customizerIsVisible: true });

  case types.HIDE_CUSTOMIZER:
    return Object.assign({}, state, { customizerIsVisible: false });

  case types.LIKE_COMMENT:
    var commentsCopy = state.comments.slice();

    var updatedComment = commentsCopy[action.index];
    updatedComment.liked = true;
    updatedComment.likes++;

    var updatedComments = commentsCopy
      .slice(0, action.index)
      .concat([updatedComment])
      .concat(commentsCopy.slice(action.index + 1));

    return Object.assign({}, state, { comments: updatedComments });

  case types.UNLIKE_COMMENT:
    var commentsCopy = state.comments.slice();

    var updatedComment = commentsCopy[action.index];
    updatedComment.liked = false;
    updatedComment.likes--;

    var updatedComments = commentsCopy
      .slice(0, action.index)
      .concat([updatedComment])
      .concat(commentsCopy.slice(action.index + 1));

    return Object.assign({}, state, { comments: updatedComments });

  case types.SET_TOPIC:
    return Object.assign({}, state, { currentSidebarTopic: action.topic });

  case types.SET_TOGGLER:

    var toggleGroupsUpdater = {};
    toggleGroupsUpdater[action.groupIndex] = { togglers: state.togglerGroups[action.groupIndex].togglers };
    toggleGroupsUpdater[action.groupIndex].togglers[action.togglerIndex].status = action.status;
    return Object.assign({}, state, { toggleGroups: toggleGroupsUpdater });

  case types.SEND_COMMENT:
    return Object.assign({}, state, { comments: [ action.comment, ...state.comments ] });

  default:
    console.log('Not a Playground action:', action.type);
    return state;
  }

  return state;

};

export default playground;
