// Array containing questions, choices and correct choice.
var trivia = {
    questions: [
        {
            question: "What did 'Humpty-Dumpty' sit on?",
            choices: [
                "A Chair",
                "A Wall",
                "A Bed"
            ],
            answer: 1,
            image: "humpty"
        },
        {
            question: "What do you get when you freeze water?",
            choices: [
                "Ice",
                "Soup",
                "Juice"
            ],
            answer: 0,
            image: "ice"
        },
        {
            question: "What do many children ride on to get to school?",
            choices: [
                "A Bike",
                "A Skateboard",
                "A Bus"
            ],
            answer: 2,
            image: "bus"
        },
        {
            question: "Who lives in a trash can on 'Seasame Street'?",
            choices: [
                "Big Bird",
                "Oscar the Grouch",
                "Elmo"
            ],
            answer: 1,
            image: "oscar"
        },
        {
            question: "Jack and Jill go up the hill to fetch a pail of what?",
            choices: [
                "Mud",
                "Food",
                "Water"
            ],
            answer: 2,
            image: "pail"
        },
        {
            question: "Who is Peppa Pigs brother?",
            choices: [
                "George",
                "Bob",
                "Henry"
            ],
            answer: 0,
            image: "george"
        },
        {
            question: "Who is the baby in the Incredibles Family?",
            choices: [
                "Baby Ron Ron",
                "Baby Jack Jack",
                "Baby Robert"
            ],
            answer: 1,
            image: "jackjack"
        },
        {
            question: "Who 'Lives in a Pineapple Under the Sea?",
            choices: [
                "Patrick",
                "Stillworth",
                "Sponge Bob Square Pants"
            ],
            answer: 2,
            image: "spongebob"
        },
        {
            question: "What do you use to eat soup?",
            choices: [
                "Fork",
                "Knife",
                "Spoon"
            ],
            answer: 2,
            image: "spoon"
        },
        {
            question: "What pet did Mary have?...'Mary had a little _____",
            choices: [
                "Frog",
                "Lamb",
                "Dog"
            ],
            answer: 1,
            image: "littlelamb"
        },
    ],
    // score counters
    rightAnswers: 0,
    wrongAnswers: 0,
    // chosen answer
    chosenAnswer: "",
    // index of current question
    currentIndex: 0,
    // object of current question
    currentQuestion: {},
    // count down timer
    timer: 10,
    // interval variable
    interval: null,
    
    // randomize question order
    randomizeOrder: function() {
        var currentIndex = this.questions.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.questions[currentIndex];
            this.questions[currentIndex] = this.questions[randomIndex];
            this.questions[randomIndex] = temporaryValue;
        }
    },

    // display new set of questions and answers
    showQuestion: function() {

        //set current question
        this.currentQuestion = this.questions[this.currentIndex];

        // display question on page
        $("#question").text(this.currentQuestion.question);

        // display answers on page
        for (var i = 0; i < this.currentQuestion.choices.length; i++) {
            var newAns = $("<a href='#' class='answer'>").text(this.currentQuestion.choices[i]);
            $("#answers").append(newAns);
        }

        // display image
        $("#question-image").attr("src", "assets/images/"+this.currentQuestion.image+".jpg");
        
        // countdown timer
        $("#countdown").text(trivia.timer);
        this.interval = setInterval(function() {
            trivia.timer--;
            $("#countdown").text(trivia.timer);
            if (trivia.timer <= 0) {
                trivia.progressGame();
            }
        }, 1000);
    },

    // check for right/wrong answer and move to next question
    progressGame: function() {
        // Correct Answer Logic
        if (this.chosenAnswer == this.currentQuestion.choices[this.currentQuestion.answer]) {
            this.rightAnswers++;
            this.currentIndex++;

            // reset timer
            clearInterval(this.interval);
            this.timer = 10;

            // remove answers from game area and hide it
            $("#answers").empty();
            $("#game-area").attr("class", "hidden");

            // add text to result area and show it
            $("#result-area").append("<h2>Correct! You picked the right answer.</h2>");
            $("#result-area").append("<h4>Next question in 3 seconds...</h4>");
            $("#result-area").attr("class", "");

            // run this after 5 seconds
            setTimeout(function() {
                // if at the end of questions
                if (trivia.currentIndex >= trivia.questions.length) {
                    trivia.endGame();
                }

                // if not at the end
                else {
                    //hide result area and show game area
                    $("#result-area").empty();
                    $("#result-area").attr("class", "hidden");
                    $("#game-area").attr("class", "");

                    // shoe nect question
                    trivia.showQuestion();
                }
            }, 3000);
        }
        // Wrong Answer / Timeout Logic
        else {
            this.wrongAnswers++;
            this.currentIndex++;

            // reset timer
            clearInterval(this.interval);

            // remove answers from game area and hide it
            $("#answers").empty();
            $("#game-area").attr("class", "hidden");

            // if time runs out
            if (this.timer <= 0) {
                // add text to the result area and show it
                $("#result-area").append("<h2>Times Up! The correct answer was: '" +this.currentQuestion.choices[this.currentQuestion.answer] +"'</h2>");
                $("#result-area").append("<h4>Next Question in 3 seconds...</h4>");
                $("#result-area").attr("class", "");
                this.timer = 10;
            }
            
            // if wrong answer was chosen
            else {
                // add text to result area and show it
                $("#result-area").append("<h2>Incorrect! The correct answer was: '" +this.currentQuestion.choices[this.currentQuestion.answer] +"'</h2>");
                $("#result-area").append("<h4>Next question in 3 seconds...</h4>");
                $("#result-area").attr("class", "");
                this.timer = 10;
            }

            // run timeout after 5 seconds
            setTimeout(function() {
                //if at the end of questions array
                if (trivia.currentIndex >= trivia.questions.length) {
                    trivia.endGame();
                }
                
                // if not at the end
                else {
                    $("#result-area").empty();
                    $("#result-area").attr("class", "hidden");
                    $("#game-area").attr("class", "");

                    // show next question
                    trivia.showQuestion();
                }
            }, 3000);    
        }
    },
    
    // show end screen
    endGame: function() {
        clearInterval(this.interval);

        $("#game-area").attr("class", "hidden");
        $("#result-area").attr("class", "hidden");
        $("#end-screen").attr("class", "");

        $("#right-answers").text("Correct Answers: " +this.rightAnswers);
        $("#wrong-answers").text("Incorrect Answers: " +this.wrongAnswers);
        $("#percent-correct").text("Percentage Correct: " +Math.round((this.rightAnswers / this.questions.length) * 100) +"%");
    },

    // reset and restart game
    resetGame: function() {
        // empty out all changing text
        $("#question").empty();
        $("#answers").empty();
        $("#result-area").empty();
        $("#right-answers").empty();
        $("#wrong-answers").empty();
        $("#percent-right").empty();

        //reset all variables
        this.currentIndex = 0;
        this.rightAnswers = 0;
        this.wrongAnswers = 0;
        this.currentQuestion = {};
        this.chosenAnswer = "";
        this.timer = 10;
        clearInterval(this.interval);

        // show/hide sections
        $("#end-screen").attr("class", "hidden");
        $("#result-area").attr("class", "hidden");
        $("#game-area").attr("class", "");

        // randomize question order and restart game
        this.randomizeOrder();
        this.showQuestion();
    },
}
$(document).ready(function() {
    // randomize question order and start game
    trivia.randomizeOrder();
    trivia.showQuestion();

    //listener for clicking an answer
    $("body").on("click", ".answer", function() {
        trivia.chosenAnswer = $(this).text();
        trivia.progressGame();
    });

    //listener for restart button
    $("body").on("click", "#restart-button", function () {
        trivia.resetGame();
    });
}); 