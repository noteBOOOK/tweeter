$(document).ready(function() {
  
  
  
  
  $("#tweet-text").on("keyup", function() {
    const remainingChars = 140 - $(this).val().length;
    $(this).siblings("div").children("output").text(remainingChars);
    if (remainingChars <= 0) {
      $(this).siblings("div").children("output").attr("charLimit", true);
    } else {
      $(this).siblings("div").children("output").attr("charLimit", false);
    }
  })
});