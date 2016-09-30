(function() {
    //initialize variables
    var startButton = $('#start');

    var seconds = $('#seconds');
    var minutes = $('#minutes');
    var breakButton = $('#break');
    var isOnBraek = false;
    var timerInterval;
    // main functionaility

    startButton.on('click', startTimer);
    breakButton.on('click', startBreak);

    function startBreak() {
        isOnBraek = true;
        //set minutes to 5 minutes
        minutes.text('05');

        //set seconds to 5 seconds
        seconds.text('00');
        //hide break button
        breakButton.hide();
        //start timer
        startTimer();

    }

    function startTimer() {

        //  console.log(timerInterval);

        if (!timerInterval) {
            timerInterval = setInterval(countdown, 1000);
        }
        // add condition
        //           if(startButton.html()==="Start" || !timerInterval){
        //             startButton.html('Pause');
        // // add condition
        //             timerInterval = setInterval(countdown , 1000);
        //           }
        // // add condition
        //           else if(startButton.html()==="Pause")
        //           {
        //             clearInterval(timerInterval);
        //             startButton.html('Start');
        //           }
        // add condition
    }
    //function definition

    function countdown() {
        var secondsText = seconds.text();
        var secondsTextAsNumber = parseInt(secondsText);
        var minutesText = minutes.text();
        var minutesTextAsNumber = parseInt(minutesText);

        if (minutesTextAsNumber === 0 && secondsTextAsNumber === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            if (!isOnBraek) {
                 //disable the start button
                startButton.attr('disabled', true);
                //unhide the break button
                breakButton.show();

            } else {

                seconds.text('00');
                minutes.text('25');
                startButton.attr('disabled', false);
                isOnBraek = false;

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
