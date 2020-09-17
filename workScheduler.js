/*Work day scheduler code*/

$(document).ready(function() {

  //setting today's date
let date = moment().format('MMMM Do YYYY');  

//setting day of week
let day = moment().format('dddd');
});

//Display  date
function outputTheDay() {
  $('#day').html(day + ', ' + date);
};

outputTheDay();

// fetch time
const time = moment().format('MMMM Do YYYY');

let time24 = moment().format('H');

const saveIcon = "./images/save-regular.svg";

    // Fetch saved items from localStorage 
    let savedSchedules = JSON.parse(localStorage.getItem("savedSchedules"));

    // If saved items are not null , update the plan array to it
    if (savedSchedules !== null) {
        schedules = savedSchedules;
    } else {
       // else path is taken when app is launched the first time 
       schedules = new Array(9);     
    }

    // jQuery variables referencing DOM
    let schedulesDiv = $('#schedulesContainer');

    // emptyout all schedules
    schedulesDiv.empty();

    // create calendar for the whole work day by each row
    let hr = 9;
    do {
    
      // index for array use offset from hour
      let i = hr - 9;

      // create and construct row 
      let hrDiv = $('<div>');
      hrDiv.addClass('row');
      hrDiv.addClass('scheduleHr');
      hrDiv.attr('hr-index', hr);

      // create and construct Time column portion of row
      let timeDiv = $('<div>');
      timeDiv.addClass('col-md-2');

      // create timeBox element (contains time)
      const timeSpn = $('<span>');

      // to extract value
      timeSpn.attr('class', 'timeSpan');

      // format hours for display
      let outputHr = 0;
      let ampm = "";
      if (hour > 12) {

          outputHr = hour - 12;
          ampm = "pm";

      } else {
          outputHr = hour;
          ampm = "am";
      }

      hr++;
    } while (hr < 17);