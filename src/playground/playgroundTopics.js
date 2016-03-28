const topics = {

  'upvotes': {
    title: 'Up/Down voting',
    description: 'Voting content up and down and its many flavors (likes, dislikes, etc) share a common purpose: to let users curate their streams and provide crowd-sourced sorting of content through a manual ranking. However, the design of ranking systems can be tricky, and some of these mechanisms are vulnerable to attacks from people wanting to get a higher rank by cheating the system, specially spammers.',
    hashtag: 'upvotes',
    links: [
      {
        title: 'Reddit on their sorting algorithms',
        href: 'http://www.redditblog.com/2009/10/reddits-new-comment-sorting-system.html'
      },
      {
        title: 'Jeff Atwood on downvoting',
        href: 'https://blog.stackoverflow.com/2009/03/the-value-of-downvoting-or-how-hacker-news-gets-it-wrong/'
      }
    ]
  },
  'replies': {
    title: 'Nested Replies',
    description: 'Threaded comments (or Nested Replies) enabled .',
    hashtag: 'threadedcomments',
    links: [
      {
        title: 'Threaded comments in Blogger',
        href: 'https://blogger.googleblog.com/2012/01/engage-with-your-readers-through.html'
      },
      {
        title: 'Threaded comments in Wordpress',
        href: 'https://en.blog.wordpress.com/2009/02/19/comment-threading-is-here-plus-other-cool-comment-settings/'
      }
    ]
  },
  'mentions': {
    title: 'Mentions',
    description: 'Mentions provided a way to engage in conversations with other users traversing the stream, specially in platforms where the stream was not threaded, as Twitter. They introduced a few privacy issues, since messages mentioning a user but written by others would appear in a search for that particular user, giving abusers a possible attack opportunity.',
    hashtag: 'mentions',
    links: [
      {
        title: 'Twitter "Replies"',
        href: 'https://blog.twitter.com/2008/how-replies-work-on-twitter-and-how-they-might'
      },
      {
        title: 'Twitter replies are now "Mentions"',
        href: 'https://blog.twitter.com/2009/replies-are-now-mentions'
      },
      {
        title: 'Mentions in Drupal',
        href: 'https://www.drupal.org/project/mentions'
      },
    ]
  },
  'directmessages': {
    title: 'Direct Messages',
    description: 'Direct messaging is a community tool that goes beyond the comment thread, building community amongst the users of a given platform. Some platforms allow messaging between any two users, regardless of they following each other or not. This led to some controversy, as unsolicited direct messages can be troublesome and prone to spam, harassment, and other types of abuse entering the private space.',
    hashtag: 'directmessages',
    links: [
      {
        title: 'Direct messaging first enabled on Twitter',
        href: 'https://blog.twitter.com/2006/six-more-twitter-updates'
      },
      {
        title: 'Direct messaging from anyone on Twitter',
        href: 'https://blog.twitter.com/2015/easier-than-ever-to-have-private-conversations'
      },
    ]
  },
  'profilepictures': {
    title: 'Profile Pictures',
    description: 'User pictures were not always there. They were introduced by commenting systems and discussions forums to make users more accountable, and as a customization element.',
    hashtag: 'profilepictures',
    links: [
      {
        title: 'Avatars added to Wordpress Comments',
        href: 'https://en.blog.wordpress.com/2007/07/04/avatar-powered-recent-comments/'
      },
      {
        title: 'Profile pictures in Blogger',
        href: 'https://blogger.googleblog.com/2009/09/show-your-face.html'
      },
      {
        title: 'Gravatar tips',
        href: 'http://www.blogtyrant.com/gravatar-tips-get-comments-clicked/'
      }
    ]
  },
  'hiddenbydefault': {
    title: 'Hidden comments',
    description: 'Hiding comments by default is a common practice nowadays, however, this wasn\'t the case a few years ago. ',
    hashtag: 'Anonymity',
    links: [
      {
        title: 'Anonymity - Wikipedia',
        href: 'https://en.wikipedia.org/wiki/Anonymity'
      }
    ]
  },
  'anonymity': {
    title: 'Anonymity',
    description: 'Some users prefer being anonymous to express their opinions freely, others think that this leads to...',
    hashtag: 'Anonymity',
    links: [
      {
        title: 'Anonymity - Wikipedia',
        href: 'https://en.wikipedia.org/wiki/Anonymity'
      },
      {
        title: 'Anonymity - Electronic Frontier Foundation',
        href: 'https://www.eff.org/es/issues/anonymity'
      },
      {
        title: 'NY Times - Using your real name in comments',
        href: 'http://www.nytimes.com/content/help/site/usercontent/usercontent.html#usercontent-name'
      },
      {
        title: 'NY Times - Verified identity',
        href: 'http://www.nytimes.com/content/help/site/usercontent/verified/verified-commenters.html'
      }
    ]
  },
  'public_profile': {
    title: 'Public Profiles',
    description: 'Having a public profile on a community allows people to find you with different search methods. Some users prefer not to be searchable or having a public profile at all.',
    hashtag: 'PublicProfiles',
    links: [
      {
        title: 'User search in Twitter (2006)',
        href: 'https://blog.twitter.com/2006/six-more-twitter-updates'
      }
    ]
  },
  'emoji': {
    title: 'Emojis',
    description: 'After years of different emoticon packs and instant messengers, Emojis made it into a standard. They can be used to convey emotions and feelings in conversation, but they can also lead to introducing noise if abused.',
    hashtag: 'Emojis',
    links: [
      {
        title: 'Emojipedia',
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
        title: 'Badges - Poynter.org',
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
        title: '(link pending)',
        href: 'http://#'
      }
    ]
  }
};

export default topics;