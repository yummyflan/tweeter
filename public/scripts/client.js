$(document).ready(function() {
  renderTweets(data);
})

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through array of tweets
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
  }
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
}

const createTweetElement = function (tweetObject) {
  const $tweet = $(`
  <article class="tweet">
  <header>
  <div class="avatar-name">
  <img src="${tweetObject.user.avatars}"/>
  <p>${tweetObject.user.name}</p>
  </div>
      <p class="handle">${tweetObject.user.handle}</p>
    </header>
    <p class="tweet-content">${tweetObject.content.text}</p>
    <hr>
    <footer>
      <p class="date">${tweetObject.created_at}</p>
      <div class="tweet-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);

  return $tweet;
};



