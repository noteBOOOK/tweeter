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






$(document).ready(function() {
  
  const createTweetElement = function (tweetObj) {
    let $tweet = `<article class="tweet">
              <header class="tweet-header">
                <div class="tweet-user">
                  <img src="${tweetObj.user.avatars}">
                  <span class="tweeter-name">${tweetObj.user.name}</span>
                </div>
                <span class="tweeter-handle">${tweetObj.user.handle}</span>
              </header>
              <p>${tweetObj.content.text}</p>
              <footer>
                <span>${tweetObj.created_at}</span>
                <div class="symbols">
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
                </div>
              </footer>
              </article>`;
    
    return $tweet;
  };
  
  
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-log').append($tweet);
    }
  };

  $('form').submit(function(event) {
    event.preventDefault();
    
    const tweet = $(this).serialize();
    if (tweet.length <= 5) {
      alert("You cannot post an empty Tweet!");
    } else if (tweet.length > 145) {
      alert("Your Tweet is over the character limit!")
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: tweet
      }).then(res => {
        console.log("CHECK HERE!", res);
      })
    }
  })
  
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then(res => {
      renderTweets(res);
    })
  }

  loadTweets();


});