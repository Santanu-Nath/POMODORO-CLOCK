const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');
const pomoCountsDisplay = document.querySelector('.pomoCountsDisplay');

//making Variable
const WORK_TIME = 1 * 60;
const BREAK_TIME = 0.5 * 60;
let timerID = null;
let oneRoundCompleted = false; //One Round = Work Time + Break Time
let totalCount = 0;
let paused = false;

//function to save pomodoro counts to local storage
const saveLocalCounts = () =>{
    let counts = JSON.parse(localStorage.getItem("pomoCounts"));
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("pomoCounts", JSON.stringify(counts));
} 


//function to update title
const updateTitle = (msg) => {
    title.textContent = msg;
}

// function to countdown
const countDown = (time) => {
    return () => {
        const mins = Math.floor(time / 60).toString().padStart(2, '0');
        const secs = Math.floor(time % 60).toString().padStart(2, '0');
        //timer.textContent = time;
        timer.textContent = `${mins}:${secs}`;
        time--;
        if(time < 0){
            stopTimer();
            if(!oneRoundCompleted){ 
                timerID = startTimer(BREAK_TIME);
                oneRoundCompleted = true;
                updateTitle("it's work time");
            }
            else{
                updateTitle("Completed 1 Round Of Pomodoro Technique!");
                setTimeout(() => updateTitle("Start Timer Again!"), 2000);
                totalCount++;
                //console.log(totalCount);
                saveLocalCounts();
                showPomoCounts();
            }
            
        }
    }
}

// arrow unction to start timer
const startTimer = (startTime) => {
    //alert("Started!");
    if(timerID !== null){
        stopTimer();
    }
   return setInterval(countDown(startTime), 1000);
}

//arrow function to stop timer
const stopTimer = () => {
    clearInterval(timerID);
    timerID = null;
}

// function tpo get time in seconds
const getTimeInSeconds = (timeString) =>{
    const[minutes, seconds] = timeString.split(":");
    return parseInt(minutes * 60) + parseInt(seconds);

}

//adding Event Listener to start button
startBtn.addEventListener('click', ()=>{
    timerID = startTimer(WORK_TIME);
    updateTitle("Tt's Work Time");
});

// adding event listner to reset  button
resetBtn.addEventListener('click', () =>{
    stopTimer();
    timer.textContent = "25:00";
    updateTitle("Click Start To Start Timer")
});

// adding event listner to pause  button
pauseBtn.addEventListener('click', () =>{
    stopTimer();
    paused = true;
    updateTitle("Timer paused")
    
});

// adding event listner to resume  button
resumeBtn.addEventListener('click', () =>{
    if(paused){
        const currentTime = getTimeInSeconds(timer.textContent);
        timerID = startTimer(currentTime);
        paused = false;
        (oneRoundCompleted === false) ? updateTitle("It's Work Time") : updateTitle("It's Break Time");
    }
});




//function to show completd pomodoros to screen from local storage
const showPomoCounts = () =>{
    const counts = JSON.parse(localStorage.getItem("pomoCounts"));
    console.log(counts);
    if(counts > 0){
        pomoCountsDisplay.style.display = "flex";
    }
    pomoCountsDisplay.firstElementChild.textContent = counts;
}

showPomoCounts();