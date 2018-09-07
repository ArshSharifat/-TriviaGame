$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // questions and answers objects 
    questions: {
      q1: 'Which player is the NBA all time leader in scoring?',
      q2: 'Which players silhouette is on the NBA logo?',
      q3: 'How many championships have the Lakers won?',
      q4: 'Who is the all time leader in made 3 pointers?',
      q5: 'What is Kobe Bryants career high in points for a single game?',
      q6: 'What team was the OKC Thunder before they relocated Oklahoma?',
      q7: 'Who was the 2017-18 NBA MVP?',
      q8: 'What coach has the most NBA championships?',
     
    },
    multiChoice: {
      q1: ['Lebron James', 'Michael Jordan', 'Kareem Abdul Jabar', 'Kobe Bryant'],
      q2: ['Jerry West', 'Magic Johnson', 'Bill Russell', 'Michael Jordan'],
      q3: ['2', '16', '24', '18'],
      q4: ['Steph Curry', 'Michael Jordan', 'Ray Allen', 'Steve Nash'],
      q5: ['100', '81', '72', '90'],
      q6: ['Bobcats', 'Sonics', 'Lakers','Bulletts'],
      q7: ['Lebron James', 'James Harden', 'Kevin Durant', 'Russel Westbrook'],
      q8: ['Red Auerbach', 'Greg Popavich', 'Phil Jackson', 'Tom Brady'],
      
    },
    correctAnswers: {
      q1: 'Kareem Abdul Jabar',
      q2: 'Jerry West',
      q3: '16',
      q4: 'Ray Allen',
      q5: '81',
      q6: 'Sonics',
      q7: 'James Harden',
      q8: 'Phil Jackson',
      
    },
    // start game method
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game section
      $('#game').show();
      
      //  empty last results
      $('#results').html('');
      
      // show timer
      $('#timer').text(trivia.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    // method to loop through and display questions and options 
    nextQuestion : function(){
      
      // set timer to 15 seconds each question
      trivia.timer = 15;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // prevent timer from going faster
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // multi choice for the question
      var questionOptions = Object.values(trivia.multiChoice)[trivia.currentSet];
      
      // all the buttons for current question
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-outline-dark btn-lg m-1">'+key+'</button>'));
      })
      
    },
    // count down timer 
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer is '+ Object.values(trivia.correctAnswers)[trivia.currentSet] +'</h3>');
      }
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        //results of game 
        $('#results')
          .html('<h3>Results</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Click start game to play again!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // start button to begin a new game
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.correctAnswers)[trivia.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Wrong! Correct Answer is: '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }



