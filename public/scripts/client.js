$(document).ready(function () {
  submitTweet();
  loadTweets();
});

// intakes tweet data parameter and uses a template to return completed tweet element
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
      <p class="date">${timeago.format(tweetObject.created_at)}</p>
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

// renders tweets and appends it to client page
const renderTweets = function (tweets) {
  // loops through array of tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").append($tweet);
  }
};

// serializes input data and sends to server
const submitTweet = function () {
  $("form").on("submit", function (event) {
    event.preventDefault();

    // textarea input length used for form validation
    const textAreaLength = $("form").find("textarea").val().length;
    if (textAreaLength > 140) {
      event.preventDefault();
      alert("You are over the character limit! :(");
      return;
    }

    if (textAreaLength === 0) {
      event.preventDefault();
      alert("Please write something before submitting!");
      return;
    }

    // if all is well, serializes form input
    const data = $("form").serialize();

    // and then sends serialized data to server
    $.post("/tweets", data);
  });
};

// fetches array of tweets from /tweet and calls renderTweets with that data
const loadTweets = function () {
  $.get("/tweets", function (data) {
    renderTweets(data);
  });
};
