/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function (tweetObj) {
  let $tweet;
  $tweet += `<article class="tweet">
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

$(document).ready(function() {

$('.tweet-log').append($tweet);
});