let minute = 0;
let second = 0;
let millisecond = 0;

let cron = 0;

export function start(){
    cron = setInterval(() => { timer(); }, 10);
}

export function stop(){
    clearInterval(cron);
}

export function reset(){
    minute = 0;
    second = 0;
    millisecond = 0;

    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
    document.getElementById('millisecond').innerText = '000';
}

function timer(){
    if((millisecond += 10) == 1000){
        millisecond = 0;
        second++;
    }

    if(second == 60){
        second = 0;
        minute++;
    }   

    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
    return input >= 10 ? input : `0${input}`
}

