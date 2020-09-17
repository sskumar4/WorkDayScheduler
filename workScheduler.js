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
       // else path is taken when app is launched first time 
       planTextArr = new Array(9);
     
    }

    // jQuery variables referencing DOM
    let $schedulesDiv = $('#schedulesContainer');

    // emptyout all schedules
    $schedulesDiv.empty();

    