var Word = require("./word");
var inquirer = require("inquirer");


function select_new_word(){
    return words_list[ Math.floor( Math.random() * words_list.length ) ];
}

function askUser(){
    playing_word.update();
    console.log( "\n" + playing_word.revealed_word + "\n" );

    inquirer.prompt([
        {
            type: "input",
            message: "Guess a Letter!",
            name: "guessed_letter"
        }
    ])
    .then(function(answers){
        //check for it's one letter and not a number
        if(answers.guessed_letter.length === 1 && isNaN(answers.guessed_letter)){
            //get a copy of the revealed word before the comparison
            var before = playing_word.revealed_word;

            //check the user guess letter
            playing_word.check(answers.guessed_letter);
            playing_word.update();

            if( playing_word.is_revealed === true ){
                //The user got the word guessed successfully
                console.log("\n" + playing_word.revealed_word + "\n");
                console.log("\nPerfect! You guessed the complete word!\n");

                //Generate new word
                playing_word = new Word(select_new_word());
                console.log("\nNew Word Generated!\n");
            }else{
                if( before === playing_word.revealed_word){
                    //wrong guess
                    if(available_guesses > 0){
                        //there is enough tries for the user to guess
                        console.log("\nWrong Guess!\n");

                        //Reduce one guess of available_guesses
                        available_guesses--;
                        console.log("\nRemaining Guesses: " + available_guesses + "\n");
                    }else{
                        //GameOver
                        console.log("\nGame Over\n");
                        available_guesses--;

                        //ask user for retry!
                        inquirer.prompt([
                            {
                                type: "list",
                                message: "Do You Want to play again!",
                                name: "confirm",
                                choices: ["Yes", "No"]
                            }
                        ]).then(function(answers){
                            if(answers.confirm === "Yes"){
                                available_guesses = 10;
                                
                                //Generate new word
                                playing_word = new Word(select_new_word());
                                console.log("\nNew Word Generated!\n");
                                askUser();
                            }else{
                                console.log( "Good Bye!" );
                                return 0;
                            }
                        })
                    }
                }else{
                    //correct guess
                    console.log("\nRight Guess!\n");
                }
            }
        }else{
            console.log("\nPlease enter a valid input!\n");
        }
        if( available_guesses >= 0){
            askUser();
        }
    });

}

var words_list = [
    "banana",
    "car",
    "language"
];
var playing_word = new Word(select_new_word());
var available_guesses = 10;
askUser();