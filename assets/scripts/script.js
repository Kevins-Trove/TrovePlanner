// Global varibles
var data;
var localName = "TrovePlanner";
var min = 8;
var max = 17;

$(function () {
  getData();
  updateClock();
  updatePlanner();
});

setInterval(() => {
  updateClock();
}, 1000);


function updateClock() {
  $('#currentDay').text(dayjs().format('dddd, MMMM D YYYY, h:mm:ss a'));
}


function updatePlanner(){
  var currentHour = dayjs().hour();

    // Generate hour slots
    for (let i = min; i <= max; i++) { 
      // Hour div
      var hour = $('<div>');
      hour.addClass("hour row time-block");
 
      // Set class by time slot
      if (i < currentHour  ){
        hour.addClass("past");
      } else if (i == currentHour) {
        hour.addClass("present");
      } else {
        hour.addClass("future");
      }
      
      hour.attr("id", "hour-" + i);
      
      // Create coloum for text area
      var col = $('<div>');
      col.addClass("col-2 col-md-1 hour text-center py-3");
      
      col.text( dayjs().hour(i).format('hh A'));
      hour.append(col);

      var textArea = $('<textarea>');
      textArea.attr("id", "text" + i);
      textArea.addClass("col-8 col-md-10 description");
      textArea.attr("rows", "3" );
      textArea.attr("aria-label", "save" );
      
      for (var j = 0; j < data.length; j++){
        if (i == data[j].hour){
          textArea.val(data[j].note);
        }
      }
      
      hour.append(textArea);

      // Creat button 
      var button = $('<button>');
      button.attr("id", "button" + i);
      button.addClass("btn saveBtn col-2 col-md-1");
      button.attr("aria-label", "save" );
      // Assing click event to button
      
      button.click(function() {
        var buttonId = $(this).attr("id");
        saveData(buttonId);
    });

      var iClass = $('<i>');
      iClass.addClass("fas fa-save");
      iClass.attr("aria-hidden", "true" );
      button.append(iClass);
      
      hour.append(button);
      
      $('#calendar').append(hour);

    }
}

// Function to save button click by index
function saveData(buttonId){
    var id = buttonId.replace(/button/g, "");
    var textArea =  document.getElementById("text" + id);

    // Find index in array and save
    for (var i = 0; i < data.length; i++){
      if (id == data[i].hour){
        console.log(data[i]);
        data[i].note = textArea.value;
      }
    }

    localStorage.setItem(localName,JSON.stringify(data));
    
  console.log(data);
  
  //console.log(id, matchingItem.text);
  
  
}

function getData(){
  var result;

  result = localStorage.getItem(localName);
  
  if (result) {
    data = JSON.parse(result);
  } else {
    // Create blank array if it does not exist
     // Generate hour slots
     var slot = {
      hour: 0,
      note: ""
     }

     data = [];
     for (let i = min; i <= max; i++) { 
      var slot = {
        hour: i,
        note: ""
        }
        
      data.push(slot);
    }
  }

}