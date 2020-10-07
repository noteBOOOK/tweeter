$(document).ready(function() {
  
  // $("button").on("click", function() {
  //   const remainingChars = 140 - $(this).parentElement.siblings("#tweet-text").val().length;

  //   if (remainingChars <= 0) {
  //     $(this).siblings("output").attr("charLimit", true);
  //   } else {
  //     $(this).siblings("output").attr("charLimit", false);
  //   }
  // })
  
  
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
});