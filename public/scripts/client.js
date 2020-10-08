/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
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
];


// Escape function to prevent Cross Site Scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// Create Tweet element to render
const createTweetElement = function(tweetObj) {
  let date = new Date(tweetObj.created_at);
  
  let $tweet = `<article class="tweet">
  <header class="tweet-header">
  <div class="tweet-user">
  <img src="${tweetObj.user.avatars}">
  <span class="tweeter-name">${tweetObj.user.name}</span>
  </div>
  <span class="tweeter-handle">${tweetObj.user.handle}</span>
  </header>
  <p class="tweet-content">${escape(tweetObj.content.text)}</p>
  <footer class="tweet-footer">
  <span>${moment(date).fromNow()}</span>
  <div class="symbols">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
  </footer>
  </article>`;
  
  return $tweet;
};

// Renders loaded tweets from GET request
const renderTweets = function(tweets) {
  $(".tweet-log").html("");
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $(".tweet-log").prepend($tweet);
  }
};

// Makes GET request for database of tweets
const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET"
  }).then(res => {
    renderTweets(res);
  });
};

// Checks for errors before making AJAX POST request
const createErrorMessage = function(tweet) {
  if (tweet.length <= 5) {
    $("#error-message").text("You cannot post an empty Tweet!");
    $(".error").slideDown(500);
    return false;
  } else if (tweet.length > 145) {
    $("#error-message").text("Your Tweet is over the character limit! (140)");
    $(".error").slideDown(500);
    return false;
  }
  return true;
};

////////////////////////////////////////////////////////////////////

$(document).ready(function() {
  
  // AJAX POST request to submit new tweets
  $("form").submit(function(event) {
    event.preventDefault();
    $(".error").slideUp(50);
    const tweet = $(this).serialize();
    if (createErrorMessage(tweet)) {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: tweet
      }).then(res => {
        loadTweets();
        $("#tweet-text").val("").trigger("keyup");
      });
    }
  });

  // Character counter set to 140 per tweet
  $("#tweet-text").on("keyup", function() {
    const remainingChars = 140 - $(this).val().length;
    $(this).siblings("div").children("output").text(remainingChars);
    if (remainingChars <= 0) {
      $(this).siblings("div").children("output").attr("charLimit", true);
    } else {
      $(this).siblings("div").children("output").attr("charLimit", false);
    }
    $(this).siblings("div").children("output").trigger("reload");
  })
  
  // Resets textarea and character counter when submitting new tweets
  $(".new-tweet-button").on("click", function() {
    if ($(".tweet-form").is(":hidden")) {
      $(".tweet-form").slideDown(500, function() {
        $("#tweet-text").focus();
      });
    } else {
      $(".tweet-form").slideUp(500);
    }
  });
  
  
  loadTweets();
  $(".error").hide();
  $(".tweet-form").hide();
  
});