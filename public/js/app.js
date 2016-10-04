(function() {
    //initialize variables
    var startButton = $('#start');

    var seconds = $('#seconds');
    var minutes = $('#minutes');
    var breakButton = $('#break');
    var resetButton = $('#reset');
    var isOnBraek = false;
    var isOnReset = false;
    var timerInterval;
    // var arrayWorktime=[];

// Total Work & Break Time - Start
var progressButton = $('#progress');
var resetprogressButton = $('#resetprogress');

var inputworktime = $('#inputworktime');
var inputbreaktime = $('#inputbreaktime');

var worktime = $('#worktime');
var breaktime = $('#breaktime');
// Total Work & Break Time - End

    // main functionaility

    // Total Work & Break Time - Start
    $('#divprogress').hide();
    progressButton.on('click', showProgress);
    resetprogressButton.on('click', resetProgress);

    if (localStorage.worktime) {
      worktime.text(localStorage.worktime);
    } else
        worktime.text("0");

        if (localStorage.breaktime) {
          breaktime.text(localStorage.breaktime);
        } else
            breaktime.text("0");

    function showProgress(){
      $('#divprogress').show();
      // var array = ['TEST1','TEST2'];
      // var newHTML = [];
      // for (var i = 0; i < array.length; i++) {
      //     newHTML.push('<span>' + array[i] + '</span><br>');
      // }$("#divarray").html(newHTML.join(""));
    }
    function resetProgress(){
      localStorage.clear();
      worktime.text("0");
      breaktime.text("0");

    }
    // Total Work & Break Time - End

    startButton.on('click', startTimer);
    breakButton.on('click', startBreak);
    resetButton.on('click', resetTimer);

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

            if(isOnBraek) {
              minutes.text(pad(inputbreaktime.val()));
            }
            else {
              minutes.text(pad(inputworktime.val()));
            }

        }

        // add condition
        //            if(startButton.html()==="Start" || !timerInterval){
        //              startButton.html('Pause');
        // // // add condition
        //              timerInterval = setInterval(countdown , 1000);
        //            }
        // // // add condition
        //            else if(startButton.html()==="Pause")
        //            {
        //             clearInterval(timerInterval);
        //           startButton.html('Start');
        //        }
        // // add condition
    }
    //function definition
    function resetTimer() {

      clearInterval(timerInterval);
      timerInterval = null;
      var secondsText = "00";
      var secondsTextAsNumber = parseInt(secondsText);
      var minutesText = "00";
      var minutesTextAsNumber = parseInt(minutesText);
      seconds.text(pad(secondsTextAsNumber));
      minutes.text(pad(minutesTextAsNumber));

      // Total Work & Break Time - Start
      if(timerInterval!==null){
        var numworktime = parseInt(worktime.text());
        var intseconds = parseInt(seconds.text());
        var intminutes = parseInt(minutes.text());
        worktime.text(numworktime+((parseInt(inputworktime.val())*60)-(intseconds+(intminutes*60)))/60);
        localStorage.worktime = parseInt(worktime.text());
     }
     // Total Work & Break Time - End

    }

    function countdown() {
        var secondsText = seconds.text();
        var secondsTextAsNumber = parseInt(secondsText);
        var minutesText = minutes.text();
        var minutesTextAsNumber = parseInt(minutesText);

        if (minutesTextAsNumber === 0 && secondsTextAsNumber === 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            // Total Work & Break Time - Start
            if(!isOnBraek) {
              var numworktime = parseInt(worktime.text());
              worktime.text((numworktime*60)+parseInt(inputworktime.val()*60)/60);
              localStorage.worktime = parseInt(worktime.text());
            }
            else {
              var numbreaktime = parseInt(breaktime.text());
              breaktime.text((numbreaktime*60)+parseInt(inputbreaktime.val()*60)/60);
              localStorage.breaktime = parseInt(breaktime.text());

            }
            // Total Work & Break Time - End

            if (!isOnBraek) {
                //disable the start button
                startButton.attr('disabled', true);
                resetButton.attr('disabled', true);
                progressButton.attr('disabled', true);
                resetprogressButton.attr('disabled', true);

                //unhide the break button
                breakButton.show();

            } else {

                seconds.text('00');
                minutes.text(inputbreaktime.val());
                startButton.attr('disabled', false);
                resetButton.attr('disabled', false);
                progressButton.attr('disabled', false);
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
}());
