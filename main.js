// Global Variables
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var user_name = "name"
var need_to_set_name = false;

function getDate() {
    var date = new Date()
    var doc = document.getElementById("date")
    var replacement = "Today is " + days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    doc.textContent = replacement
}

function getTime() {
    var time = new Date()
    var html_time = document.getElementById("time")

    // Get time in 24-hour clock
    var hours = time.getHours()
    var mins = time.getMinutes()
    var ampm = "am"
    // Convert 24-hour time object to 12-hour clock
    if(hours == 0) {
        hours = 12
    } else if(hours >= 12){
        hours = hours - 12
        ampm = "pm"
    }
    // Then adjust minutes < 10 as they will normally be single digit
    mins = mins < 10 ? "0" + mins : mins

    // Finally, adjust the HTML
    var final_time = `${hours}:${mins}` + ampm
    html_time.innerText = final_time
    // And then set a timeout to update the clock once a minute
    setTimeout(getTime, 60000);
}

function getGreeting() {
    var time = new Date()
    var html_greeting = document.getElementById("hello")

    // Get the time as a 24-hour clock
    var hours = time.getHours()
    var greeting = "Good "
    // And append to the greeting
    if(hours >= 6 && hours < 12){
        greeting = greeting + "morning "
    } else if(hours > 12 && hours < 17){
        greeting = greeting + "afternoon "
    } else if (hours >= 17 && hours < 23){
        greeting = greeting + "evening "
    } else if (hours > 0 && hours < 6){
        greeting = "See you in the morning "
    }
    greeting = greeting + user_name;
    html_greeting.innerText = greeting
}

function setName() {
    // Get user's name when they add the extension and store it locally
    let temp_name =  window.prompt("Enter your name")
    chrome.storage.local.set({"user_name": temp_name})
    update(temp_name)
}

function update(name){
    // Update the global name variable
    window['user_name'] = name
    getGreeting()
}

// When script runs, first load user's name
chrome.storage.local.get(['user_name'], function(result) {
    if(result['user_name'] == undefined){
        setName()
    } else {
        update(result['user_name'])
    }
});

// Then get date/time
getDate()
getTime()

// Runs when Chrome/Edge creates a new tab
chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({active: true})
})