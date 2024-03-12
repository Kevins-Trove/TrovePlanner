// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

setInterval(() => {
  updateClock();
}, 1000);

updateClock()
function updateClock() {
  $('#currentDay').text(dayjs().format('dddd, MMMM D YYYY, h:mm:ss a'));
}

updatePlanner();
function updatePlanner(){
  var min = 11;
  var max = 22;
  var currentHour = dayjs().hour();

    // Generate hour slots
    for (let i = min; i <= max; i++) { 
      var hour = $('<div>');
      // Set the class of the div
      hour.addClass("hour row time-block");
      
      if (i < currentHour  ){
        hour.addClass("past");
      } else if (i == currentHour) {
        hour.addClass("present");
      } else {
        hour.addClass("future");
      }

      
      hour.attr("id", "hour-" + i);
      
      var col = $('<div>');
      col.addClass("col-2 col-md-1 hour text-center py-3");
      
      col.text( dayjs().hour(i).format('hh A'));
      hour.append(col);

      var textArea = $('<textarea>');
      textArea.addClass("col-8 col-md-10 description");
      textArea.attr("rows", "3" );
      textArea.attr("aria-label", "save" );
      hour.append(textArea);

      var button = $('<button>');
      button.addClass("btn saveBtn col-2 col-md-1");
      button.attr("aria-label", "save" );
      

      var iClass = $('<i>');
      iClass.addClass("fas fa-save");
      iClass.attr("aria-hidden", "true" );
      button.append(iClass);
      
      hour.append(button);
     
      
      $('#calendar').append(hour);

    }
}

