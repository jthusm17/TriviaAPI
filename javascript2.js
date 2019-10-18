const apiUrl = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean'
let arrayNum = 0
let falseBtn = $("#falseBtn");
let trueBtn = $("#trueBtn");
let score = $("#score");
let scoreNum = 0;
let help = $("#help");
let quest = $("#quest");
let userChoice = 'True';
let nextBtn = $("#nextBtn");
    nextBtn.hide();
let resetBtn = $("#resetBtn");
    resetBtn.hide();

$(document).ready(function(){
    // load data
    $.ajax({
        url: apiUrl
      }).then((data) => {
        console.log(data.results[arrayNum].question)
        console.log(data.results[arrayNum].correct_answer)
        quest.text(data.results[arrayNum].question)

    // functions
    
    const truePress=() => {
        userChoice =  'True'
        console.log("true pressed");
        }
    const falsePress=() => {
        userChoice =  'False'
        console.log("false pressed");
    }
    const checkAnswer=() => {
        let rightAnswer = data.results[arrayNum].correct_answer;
        if(userChoice ==  rightAnswer) {
        scoreNum++;
        help.text("Correct!");
        score.text(`Your score: ${scoreNum}`);
        }
        else {
        help.text("Wrong!");
        }
        nextBtn.show();
        trueBtn.hide();
        falseBtn.hide();
    }
    const nextQuestion=() => {
        arrayNum ++;
        console.log(data.results[arrayNum].question);
        console.log(data.results[arrayNum].correct_answer);
        quest.text(data.results[arrayNum].question); 
        if(arrayNum > 8) {
            nextBtn.text("No more Questions.");
            nextBtn.prop("disabled", true)
        }
    }
    const resetGame=() => {
        arrayNum = 0;
        scoreNum = 0;
        console.log(data.results[arrayNum].question);
        console.log(data.results[arrayNum].correct_answer);
        quest.text(data.results[arrayNum].question); 

        
        console.log("game reset");
        help.text("Click True or False");
        score.text(`Your score: ${scoreNum}`);
        resetBtn.hide();
        nextBtn.text("Next Question.");
        nextBtn.prop("disabled", false)
        nextBtn.hide();
        }

    // buttons
    trueBtn.click (() => {
        truePress();
        checkAnswer();
        if(arrayNum > 8) {
            resetBtn.show();
        }
        
        });
    falseBtn.click (() => {
        falsePress();
        checkAnswer();
        if(arrayNum > 8) {
            resetBtn.show();
        }
        });
    nextBtn.click (() => {
        nextQuestion();
        help.text("Click true or False");
        nextBtn.hide();
        trueBtn.show();
        falseBtn.show();
        });
    resetBtn.click (() => {
        resetGame();
        trueBtn.show();
        falseBtn.show();
        });

    });
});

