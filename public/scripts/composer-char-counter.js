$(document).ready(() => {
  console.log("hello world");

  $("textarea").on("input", function () {
    let counter = $("textarea")
      .parent()
      .find("output")
      .val(140 - this.value.length);
  });
});
