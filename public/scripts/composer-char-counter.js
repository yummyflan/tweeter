$(document).ready(() => {
// retrieves text area input and changes character counter based on input
  $("textarea").on("input", function() {
    // create a variable to access counter number 
    let counterNumber = $("textarea").parent().find("output");
    
    // changes counter based on current form text input by subtraction
    counterNumber.val(140 - this.value.length);
    
    // if counter number is negative, add CSS class that changes text color to red
    if (counterNumber.val() < 0) {
      counterNumber.addClass("counter-negative");

    // if counter number is no longer negative, removes the CSS class
    } else {
      counterNumber.removeClass("counter-negative");
    }
  });
});
