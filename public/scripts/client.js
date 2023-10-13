$(document).ready(function() {
  submitTweet();
  loadTweets();
});

// helper function to escape the input data, protecting server from any attacks
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// intakes tweet data parameter and uses a template to return completed tweet element
const createTweetElement = function(tweetObject) {
  const $tweet = $(`
  <article class="tweet">
  <header>
  <div class="avatar-name">
  <img src="${tweetObject.user.avatars}"/>
  <p>${tweetObject.user.name}</p>
  </div>
      <p class="handle">${tweetObject.user.handle}</p>
    </header>
    <body>
      <p class="tweet-content">${escape(tweetObject.content.text)}</p>
      <hr>
    </body>
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

// receives array of tweets and appends it to client page
const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  // loops through array of tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").prepend($tweet);
  }
};

// fetches array of tweets from /tweet and returns the data into renderTweets
const loadTweets = function() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
};

// serializes input data, sends to server, updates tweets, and error handling for form.
const submitTweet = function() {
  $("form").on("submit", function(event) {
    // prevent page refresh
    event.preventDefault();

    // variables for error validation messages
    const errorNone = $("form").siblings("#error-none");
    const errorOver = $("form").siblings("#error-over");

    // variables for textarea input length, form counter
    const textArea = $("form").find("textarea");
    const counter = $("form").find("output");

    // slideUp error messages if visible
    errorNone.slideUp();
    errorOver.slideUp();

    // validation for when there is no text
    if (textArea.val().length === 0) {
      errorNone.slideDown();
      errorNone.css("display", "block");
      return;
    }

    // validation for over 140 characters
    if (textArea.val().length > 140) {
      errorOver.slideDown();
      errorOver.css("display", "block");
      return;
    }

    // if all is well, serializes form input
    const data = $("form").serialize();

    // sends serialized data to server, reloads tweets, clears out the textarea and resets counter
    $.post("/tweets", data).then(function() {
      loadTweets();
      textArea.val("");
      counter.val(140);
    });
  });
};

