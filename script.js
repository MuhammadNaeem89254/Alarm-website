const currentTime = document.querySelector("h1")
// console.log("this is a" , currentTime );
content = document.querySelector(".content");
selectMenu = document.querySelectorAll("select");
setAlarmBtn = document.querySelector("button");

let alarmTime , isAlarmSet = false;
ringtone = new Audio("ringtone.mp3");

// console.log(selectMenu);
for (let i = 12 ; i > 0; i--){
    i = i < 10 ? "0" + i : i ;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for (let i = 59; i >= 0; i--){
    i = i < 10 ? "0" + i : i ;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for (let i = 2 ; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}  

setInterval(() => {
    // get hour, mint, secs
    let date  = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm ="AM";

    if(h >= 12){
        h = h - 12;
        ampm = "PM";
    }
    // if hour value is 0, xet this value to 12
    h = h == 0 ? 12 : h ;
//  adding 0 before hr, min , sec if this value is less then 10
h = h < 10 ? "0" + h : h ;
m = m < 10 ? "0" + m : m ;
s = s < 10 ? "0" + s : s ;
currentTime.innerText =  `${h}:${m}:${s} ${ampm}`;

if(alarmTime == `${h}:${m} ${ampm}`){
    ringtone.play();
    ringtone.loop = false ;
}

}, 1000);

// Alarm

function setAlarm(){
if(isAlarmSet){ //if isAlarmSet is true
    alarmTime = ""; // clear the value of alarmTime
    ringtone.pause(); //pause the ringtone
    setAlarmBtn.innerText = "Set Alarm";
    return isAlarmSet = false; //return isAlarmSet value to false
}

// getting hour, minute,ampm select tag value
    let time  = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("please,select a time to set Alarm")
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "clear Alarm";
    // console.log(time); 

}
setAlarmBtn.addEventListener("click",setAlarm);