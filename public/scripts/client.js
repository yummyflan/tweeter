$(document).ready(function () {
  loadTweets();
  submitTweet();
  renderTweets(data);
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

// prevents default of form submission and uses AJAX to send serialized data to server
const submitTweet = function () {
  $("form").on("submit", function (event) {
    event.preventDefault();

    // serializes form input
    const data = $("form").serialize();

    // sends serialized data to server
    $.post("/tweets", data);
    console.log(data);
  });
};

// fetches array of tweets from /tweet as a JSON
const loadTweets = function () {
  $.get("/tweets", function (data) {
    renderTweets(data);
  });
};
