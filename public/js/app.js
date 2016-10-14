(function() {
    //initialize variables
    var startButton = $('#start');

    var seconds = $('#seconds');
    var minutes = $('#minutes');
    var breakButton = $('#break');
    var resetButton = $('#reset');
    var timername = $('#timername');
    var isOnBraek = false;
    var isOnReset = false;
    var timerInterval;

    // var trackTime = {
    //     trackId: 0,
    //     startTime: Date(),
    //     totalSeconds: 0,
    //     trackType: "Test",
    //     getTime: function() {
    //         return this.trackId + " -> " + this.startTime + " to " + this.endTime + " is a " + this.trackType;
    //     }
    // };

    // var trackTimes = [trackTime];
    // var arrayWorktime=[];

    // Total Work & Break Time - Start
    // var progressButton = $('#progress');
    var resetprogressButton = $('#resetprogress');

    var inputworktime = $('#inputworktime');
    var inputbreaktime = $('#inputbreaktime');

    var totalworktime = $('#totalworktime');
    var totalbreaktime = $('#totalbreaktime');

    var totalseconds = 0;
    breakButton.hide();
    // Total Work & Break Time - End

    // main functionaility

    // Total Work & Break Time - Start
    // $('#divprogress').hide();
    // progressButton.on('click', showProgress);
    startButton.on('click', startTimer);
    breakButton.on('click', startBreak);
    resetButton.on('click', resetTimer);

    resetprogressButton.on('click', resetProgress);

    if (localStorage.worktime && !isNaN(localStorage.worktime)) {
        totalworktime.text(convertSeconds(localStorage.worktime));
    } else {
        totalworktime.text("0");
        localStorage.worktime = 0;
    }
    if (localStorage.breaktime && !isNaN(localStorage.breaktime)) {
        totalbreaktime.text(convertSeconds(localStorage.breaktime));
    } else {
        totalbreaktime.text("0");
        localStorage.breaktime = 0;
    }

    // function showProgress(){
    //   $('#divprogress').show();
    //   // var array = ['TEST1','TEST2'];
    //   // var newHTML = [];
    //   // for (var i = 0; i < array.length; i++) {
    //   //     newHTML.push('<span>' + array[i] + '</span><br>');
    //   // }$("#divarray").html(newHTML.join(""));
    // }
    function resetProgress() {
        localStorage.clear();
        totalworktime.text("0");
        totalbreaktime.text("0");

    }
    // Total Work & Break Time - End

    function startBreak() {
        isOnBraek = true;
        //set minutes to 5 minutes
        minutes.text(pad(inputbreaktime.val()));

        //set seconds to 5 seconds
        seconds.text('00');
        //hide break button
        breakButton.hide();

        //start timer
        resetButton.hide();
        startTimer();

    }

    function startTimer() {

        //  console.log(timerInterval);
        if (!timerInterval) {
            timerInterval = setInterval(countdown, 1000);

            totalseconds = 0;

            if (isOnBraek) {
                minutes.text(pad(inputbreaktime.val()));
                timername.text("Break Time ");
            } else {
                minutes.text(pad(inputworktime.val()));
                // timername.text("Work Time ");
            }

        }

    }
    //function definition
    function resetTimer() {

        clearInterval(timerInterval);
        timerInterval = null;
        timername.text(" ");
        var currentminutes = parseInt(minutes.text());
        var currentseconds = parseInt(seconds.text());
        var secondsText = "00";
        var secondsTextAsNumber = parseInt(secondsText);
        var minutesText = "00";
        var minutesTextAsNumber = parseInt(minutesText);
        seconds.text(pad(secondsTextAsNumber));
        minutes.text(pad(minutesTextAsNumber));

        // Total Work & Break Time - Start
        var numworktime = 0;
        if(!isNaN(localStorage.worktime))
          numworktime = parseInt(localStorage.worktime);

        localStorage.worktime = parseInt((numworktime + totalseconds));
        totalworktime.text(convertSeconds(parseInt(localStorage.worktime)));
        // Total Work & Break Time - End

    }

    function countdown() {
        var secondsText = seconds.text();
        var secondsTextAsNumber = parseInt(secondsText);
        var minutesText = minutes.text();
        var minutesTextAsNumber = parseInt(minutesText);

        totalseconds = totalseconds + 1;

        if (minutesTextAsNumber === 0 && secondsTextAsNumber === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timername.text(" ");

            // Total Work & Break Time - Start
            if (!isOnBraek) {
                breakButton.show();

                var numworktime = 0;
                if(!isNaN(localStorage.worktime))
                  numworktime = parseInt(localStorage.worktime);

                localStorage.worktime = parseInt((numworktime + parseInt(inputworktime.val() * 60)));
                totalworktime.text(convertSeconds(parseInt(localStorage.worktime)));

                //                trackTimes.push(trackTimes.length, formatDateTime(Date()), (inputworktime.val() * 60), "WorkTime");
                //                console.write(trackTimes[trackTimes.length - 1].getTime());
                //              $(document.body).append($.now()+' - Worktime till now : '+localStorage.worktime+'<br>');
            } else {

                breakButton.hide();

                var numbreaktime = 0;
                if(!isNaN(localStorage.breaktime))
                  numbreaktime = parseInt(localStorage.breaktime);


                localStorage.breaktime = parseInt((numbreaktime + parseInt(inputbreaktime.val() * 60)));
                totalbreaktime.text(convertSeconds(parseInt(localStorage.breaktime)));

                //                trackTimes.push(trackTimes.length, formatDateTime(Date()), (inputbreaktime.val() * 60), "BreakTime");
                //                console.write(trackTimes[trackTimes.length - 1].getTime());
                //              $(document.body).append($.now()+' - Breaktime till now : '+localStorage.worktime+'<br>');
            }
            // Total Work & Break Time - End

            if (!isOnBraek) {
                //disable the start button
                startButton.attr('disabled', true);
                resetButton.attr('disabled', true);
                // progressButton.attr('disabled', true);
                resetprogressButton.attr('disabled', true);

                //unhide the break button
                breakButton.show();

            } else {

                seconds.text('00');
                minutes.text(pad(inputbreaktime.val()));
                startButton.attr('disabled', false);
                resetButton.attr('disabled', false);
                // progressButton.attr('disabled', false);
                resetprogressButton.attr('disabled', false);
                isOnBraek = false;
                resetButton.show();

                //minutes.text("24");
            }
            return;
        }
        if (secondsTextAsNumber === 0) {
            if (minutesTextAsNumber !== 0) {
                var decreasedMinutesAsNumberByOne = minutesTextAsNumber - 1;
                var padMinutesTextAsNumber = pad(decreasedMinutesAsNumberByOne);
                minutes.text(padMinutesTextAsNumber);
            }
            seconds.text("59");
            //then change sec text to 59
        } else {
            // var secondsvalue = parseInt(seconds.text());
            //
            // seconds.text(pad(secondsvalue - 1));
            var decreasedSecondsAsNumberByOne = secondsTextAsNumber - 1;
            var padSecondsTextAsNumber = pad(decreasedSecondsAsNumberByOne);
            seconds.text(padSecondsTextAsNumber);
        }

    }

    function pad(num) {
        if (num < 10) {
            //spit out num leading 0
            return "0" + num;
        } else {
            //spit out the original number
            return num;
        }
    }

    function formatDateTime(valDate) {
        var d = new Date(valDate);
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var date = d.getDay() + " " + month[d.getMonth()] + ", " + d.getFullYear();
        var time = d.toLocaleTimeString().toLowerCase();

        return date + " " + time;
    }

    function convertSeconds(valSeconds) {
        var totalSec = valSeconds;
        var hours = parseInt(totalSec / 3600) % 24;
        var minutes = parseInt(totalSec / 60) % 60;
        var seconds = totalSec % 60;

        var result = " ";
        if (hours > 0)
            result = (hours < 10 ? "0" + hours : hours) + " Hrs ";
        if (minutes > 0)
            result = result + (minutes < 10 ? "0" + minutes : minutes) + " Min ";
        if (seconds > 0)
            result = result + (seconds < 10 ? "0" + seconds : seconds) + " Sec ";
        if(result.trim().length===0)
          result ="00";
        return result;
    }

    $(window).keypress(function(e) {
        var ev = e || window.event;
        var key = ev.keyCode || ev.which;
        if (key == 115 || key == 83)
            startTimer();
        if (key == 98 || key == 66)
            startBreak();
        if (key == 114 || key == 82)
            resetTimer();
        if (key==99 || key==67)
            resetProgress();
    });
}());
