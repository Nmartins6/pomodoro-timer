let action = document.getElementById('action');
let pause = document.getElementById('pause');
let sessions = document.getElementById('sessions');
let seconds;

function start() {

    let bell = new Audio("./audio/bell.mp3");
    let focusReturn = new Audio("./audio/final.mp3");
    let final = new Audio("./audio/return.mp3");

    if (action.value == 0) {
        alert("Please specify the number of minutes of focus until the break.");
        document.getElementById('fail_focus').innerHTML = "Set how many minutes of focus";
        action.focus();
    } else if (pause.value == 0) {
        alert("Please specify how many miunutes of break between the sessions.");
        document.getElementById('fail_break').innerHTML = "Set how many minutes of break";
        pause.focus();
    } else if (sessions.value == 0) {
        alert("Please specify how many sessions.");
        document.getElementById('fail_sessions').innerHTML = "Set how many sessions of study";
        sessions.focus();
    } else {
        localStorage.setItem('action', String(action.value));
        localStorage.setItem('pause', String(pause.value));
        localStorage.setItem('sessions', String(sessions.value));

        document.getElementById('set_timer').style.setProperty('display', 'none', 'important');
        document.getElementById('timer').style.setProperty('display', 'block', 'important');
        
        focusTime();
    }
}

function focusTime() {
    let sessions_value = localStorage.getItem('sessions');

    if (sessions_value != '1') {
        document.getElementById('title_session').innerHTML = sessions_value + " Remaining sessions."
    } else {
        document.getElementById('title_session').innerHTML = sessions_value + " Remaining session."
    }

    let title = document.getElementById('title');
    title.innerHTML = 'Focus';
    title.style.fontSize = '25pt';
    title.style.fontWeight = 'bold';
    title.style.setProperty('color', '#fff', 'important');

    let min = Number(localStorage.getItem('action'));
    min -= 1;

     let seconds = 59;

    document.getElementById('minutes_timer').innerHTML = min;
    document.getElementById('seconds_timer').innerHTML = seconds;

    let minutes_interval = setInterval(minInterval, 60000);
    let seconds_interval = setInterval(secInterval, 1000);

    function minInterval() {
        min = min - 1;
        document.getElementById('minutes_timer').innerHTML = min;
    }

    function secInterval() {
        seconds = seconds - 1;
        document.getElementById('seconds_timer').innerHTML = seconds;
        console.log(seconds);
        if (seconds <= 0) {
            if (min <= 0) {
                clearInterval(minutes_interval);
                clearInterval(seconds_interval);

                bell.play();

                breakTime();
            }
            seconds = 60;
        }
    }
}

function breakTime() {
    let title = document.getElementById('title');
    title.innerHTML = 'Break';
    title.style.fontSize = '25pt';
    title.style.fontWeight = 'bold';
    title.style.setProperty('color', '#fff', 'important');

    let min_pause = Number(localStorage.getItem('action'));
    min_pause -= 1;

    seconds = 59;

    document.getElementById('minutes_timer').innerHTML = min_pause;
    document.getElementById('seconds_timer').innerHTML = seconds;

    let minutes_interval = setInterval(minTimer, 60000);
    let seconds_interval = setInterval(secTimer, 1000);

    function minTimer() {
        let min_pause = min_pause - 1;
        document.getElementById('minutes_timer').innerHTML = min_pause;
    }

    function secTimer() {
        seconds = seconds - 1;
        document.getElementById('seconds_timer').innerHTML = seconds;

        if (seconds <= 0) {
            if (min_pause <= 0) {
                let sess = Number(localStorage.getItem('sessions'));
                sess = sess - 1;
                localStorage.setItem('sessions', String(sess));

                clearInterval(minutes_interval);
                clearInterval(seconds_interval);
                if (sess <= 0) {
                    final.play();
                    localStorage.clear();

                    document.getElementById('set_timer').style.setProperty('display', 'none', 'important');
                    document.getElementById('timer').style.setProperty('display', 'none', 'important');
                    document.getElementById('end').style.setProperty('display', 'block', 'important');

                } else {
                    focusReturn.play();
                    focusTime();
                }
                
            }
            seconds = 60;
        }
    }
}
