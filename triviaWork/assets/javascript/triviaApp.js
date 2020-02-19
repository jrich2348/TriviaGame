var card = $("#quiz-area");

// Question set
var questions = [
  {
    question: "Doritos were invented in a magical land?",
    answers: ["True","False"],
    correctAnswer: "False"
  },
  {
    question: "Oreos are vegan?",
    answers: ["True","False"],
    correctAnswer: "True"
  },  {
    question: "Twinkies don't last as long as you think?",
    answers: ["True","False"],
    correctAnswer: "True"
  },  {
    question: "A Pringles can once served a very strange purpose?",
    answers: ["True","False"],
    correctAnswer: "True"
  },  {
    question: "The cotton candy machine had an unlikely inventor.?",
    answers: ["True","False"],
    correctAnswer: "True"
  },  
 
];

// Variable that will hold the timer
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>El Final!</h2>");
    card.append("<h3>Right Answers: " + this.correct + "</h3>");
    card.append("<h3>Wrong Answers: " + this.incorrect + "</h3>");
  }
};

// On Clicks events

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
