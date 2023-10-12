$(document).ready(() => {
  console.log("hello world");

  $("textarea").on("input", function () {
    let updateCounter = $("textarea").parent().find("output").val(140 - this.value.length);
    let counterNumber = $("textarea").parent().find("output");
    
      if (counterNumber.val() < 0) {
        counterNumber.addClass("counter-negative");
      } else {
        counterNumber.removeClass("counter-negative");
      }
  });
});
