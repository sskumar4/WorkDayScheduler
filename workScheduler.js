/*Work day scheduler code*/
$(document).ready(function() {
  //set today's date
let date = moment().format('MMMM Do YYYY');  

//set day of week
let day = moment().format('dddd');


//Display  date
function outputTheDay() {
  $('#day').html(day + ', ' + date);
};

outputTheDay();

// fetch time
const time = moment();
console.log('time',time);
console.log('time.hour',time.hour());
let time24 = moment().format('H');
console.log('time24',time24);

    // Fetch saved items from localStorage 
    let schedules = JSON.parse(localStorage.getItem("schedules"));

    // If saved items are not null, update the plan array to it
    if (schedules !== null) {
        schedules = schedules;
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
       let i = hr - 9;
      // create row 
      let hrDiv = $('<div>');
      hrDiv.addClass('row');
      hrDiv.addClass('scheduleHr');
      hrDiv.attr('hr-idx', hr);

      // create Time column part of row
      let timeDiv = $('<div>');
      timeDiv.addClass('col-md-2');

      // create container element
      const timeSpn = $('<span>');

      // extract value
      timeSpn.attr('class', 'timeSpan');

      // format hrs for display
      let outputHr = 0;
      let HramPm = "";
      if (hr > 12) {

          outputHr = hr - 12;
          HramPm = "pm";

      } else {
          outputHr = hr;
          HramPm = "am";
      }

      // Fill time column with time
      timeSpn.text(`${outputHr} ${HramPm}`);

      hrDiv.append(timeDiv);
      timeDiv.append(timeSpn);
      let scheduleSpn = $('<input>');
      scheduleSpn.attr('id', `input-${i}`);
      scheduleSpn.attr('hr-idx', i);
      scheduleSpn.attr('type', 'text');
      scheduleSpn.attr('class', 'plan');
      scheduleSpn.val(schedules[i]);
      if ( hr < time24) {
      scheduleSpn.attr("disabled", "true");
      }
      // create schedule column
      let scheduleDiv = $('<div>');
      scheduleDiv.addClass('col-md-9');
    
      // append schedule div and span to hrDiv
      hrDiv.append(scheduleDiv);
      scheduleDiv.append(scheduleSpn);

      // create save colum at the end of hrDiv
      let savIconDiv = $('<div>');
      savIconDiv.addClass('col-md-1');
      let savIcon = $('<i>');
      savIcon.attr('id', `savid-${i}`);
      savIcon.attr('sav-id', i);
      savIcon.attr('class', "far fa-save saveIcon");
      hrDiv.append(savIconDiv);
      savIconDiv.append(savIcon);

      //apply color
      applyColorToHrDiv(hrDiv, hr);

      //add hrDiv to schedulesDiv
      schedulesDiv.append(hrDiv);
      hr++;
    } while (hr <= 17);

    //  update row color
    function applyColorToHrDiv(thisHr, hr) {
        if (hr < time.hour()) {
            thisHr.css("background-color", "lightgrey");
        } else if (hr > time24) {
            thisHr.css("background-color", "lightgreen");
        } else {
            thisHr.css("background-color", "tomato");
        }
    };

    // save to localStorage on clicking save button
    $(document).on('click', 'i', function(event) {
        event.preventDefault();
        let savId = $(this).attr('sav-id');
        let scheduleId = '#input-' + savId;
        let schedule = $(scheduleId).val();
        schedules[savId] = schedule;
        localStorage.setItem("schedules", JSON.stringify(schedules));
    });

    // save when the input changes
    $(document).on('change', 'input', function(event) {
        event.preventDefault();

        // neeed to check for save button
        let i = $(this).attr('hr-idx');

    });
});