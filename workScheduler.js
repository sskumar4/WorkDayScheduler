/*Work day scheduler code*/
$(document).ready(function() {
  //setting today's date
let date = moment().format('MMMM Do YYYY');  

//setting day of week
let day = moment().format('dddd');


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
    let schedules = JSON.parse(localStorage.getItem("schedules"));

    // If saved items are not null , update the plan array to it
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
      // index for array use offset from hr
      let i = hr - 9;

      // create and construct row 
      let hrDiv = $('<div>');
      hrDiv.addClass('row');
      hrDiv.addClass('scheduleHr');
      hrDiv.attr('hr-idx', hr);

      // create and construct Time column portion of row
      let timeDiv = $('<div>');
      timeDiv.addClass('col-md-2');

      // create timeBox element (contains time)
      const timeSpn = $('<span>');

      // to extract value
      timeSpn.attr('class', 'timeSpan');

      // format hrs for display
      let outputHr = 0;
      let ampm = "";
      if (hr > 12) {

          outputHr = hr - 12;
          ampm = "pm";

      } else {
          outputHr = hr;
          ampm = "am";
      }

      // Fill timeSpn with time
      timeSpn.text(`${outputHr} ${ampm}`);

      hrDiv.append(timeDiv);
      timeDiv.append(timeSpn);
      let dailyScheduleSpn = $('<input>');
        dailyScheduleSpn.attr('id', `input-${i}`);
        dailyScheduleSpn.attr('hr-idx', i);
        dailyScheduleSpn.attr('type', 'text');
        dailyScheduleSpn.attr('class', 'dailyPlan');

        
        dailyScheduleSpn.val(schedules[i]);

        // create schedule column
        let scheduleDiv = $('<div>');
        scheduleDiv.addClass('col-md-9');
        
        // append schedule div and span to hrDiv
        hrDiv.append(scheduleDiv);
        scheduleDiv.append(dailyScheduleSpn);

        // create save colum at the end of
        // hrDiv
        let savIconDiv = $('<div>');
        savIconDiv.addClass('col-md-1');
        let savIcon = $('<i>');
        savIcon.attr('id', `savid-${i}`);
        savIcon.attr('sav-id', i);

        savIcon.attr('class', "far fa-save saveIcon");

        hrDiv.append(savIconDiv);
        savIconDiv.append(savIcon);

        //apply proper color
        applyColorToHrDiv(hrDiv, hr);

        //add hrDiv to schedulesDiv
        schedulesDiv.append(hrDiv);
        hr++;
    } while (hr < 17);

    //  row color update
    function applyColorToHrDiv(thisHr, hr) {
        if (hr < time24) {
            // thisHr.css('')
            thisHr.css("background-color", "lightgrey");
        } else if (hr > time24) {
            thisHr.css("background-color", "lightgreen");
        } else {
            thisHr.css("background-color", "tomato");
        }
    };

    // save to localStorage on save
    $(document).on('click', 'i', function(event) {
        event.preventDefault();
        let savId = $(this).attr('sav-id');
        let scheduleId = '#input-' + savId;
        let schedule = $(scheduleId).val();
        schedules[savId] = schedule;

        // remove shawdow pulse class
        $(`#savid-${savId}`).removeClass('shadowPulse');
        localStorage.setItem("schedules", JSON.stringify(schedules));

    });

    // save when the input changes

    $(document).on('change', 'input', function(event) {
        event.preventDefault();

        // neeed to check for save button
        let i = $(this).attr('hr-idx');

        // add shawdow pulse class
        $(`#savid-${i}`).addClass('shadowPulse');

    });

});