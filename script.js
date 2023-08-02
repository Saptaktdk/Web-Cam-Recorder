let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont")
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false;

let recorder;
let chunks = [] //? media data in chunks

let constraints = {
    video: true,
    audio: true
}

// TODO: Access the camera and microphone
navigator.mediaDevices.getUserMedia(constraints) 
.then((stream) => {
    video.srcObject = stream;

    recorder = new MediaRecorder(stream);

    //? When you start recording, clear the chunks array to include fresh data
    recorder.addEventListener("start", (e) => {
        chunks = [];
    })

    //? Keep pushing the recorded datas into the chunks array
    recorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
    })

    //? Convert media chunks data to video, when you stop recording
    recorder.addEventListener("stop", (e) => {
        let blob = new Blob(chunks, {type: "video/mp4"});
        let videoUrl = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = videoUrl;
        a.download = "stream.mp4";
        a.click();
    })
})

// TODO: Record Buttton style implementation
recordBtnCont.addEventListener("click", (e) => {
    if (!recorder) return;  

    recordFlag = !recordFlag;

    if (recordFlag) {
        //? start recording
        recorder.start();
        recordBtn.classList.add("scale-record");
        startTimer();
    }
    else {
        //? stop recording
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }
})

let timerID;
let counter = 0; //? Represents total second
let timer = document.querySelector(".timer"); 

// TODO: Start the timer during recording
function startTimer() {

    timer.style.display = "block";
    
    // TODO: Display the timer in UI
    function displayTimer() {
        
        let = totalSeconds = counter;

        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds % 3600; //? Remaining value
        
        let minutes = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds % 60; 

        let seconds = totalSeconds;

        hours = ( hours < 10 ) ? `0${hours}` : hours;
        minutes = ( minutes < 10 ) ? `0${minutes}` : minutes;
        seconds = ( seconds < 10 ) ? `0${seconds}` : seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`;

        counter ++;
    }
    timerID = setInterval(displayTimer, 1000);
}

function stopTimer() {
    clearInterval(timerID);
    timer.innerText = "00:00:00";
    timer.style.display = "none";
}