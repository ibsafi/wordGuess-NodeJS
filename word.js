var Letter = require("./letter");

var Word = function(underlying_word){
    this.is_revealed = false;
    this.letters = [];
    for(var i=0; i<underlying_word.length; i++){
        this.letters.push( new Letter(underlying_word[i]) );
    }
}

Word.prototype.check = function(guessed_letter){
    for(var key in this.letters){
        this.letters[key].check(guessed_letter);
    }
};

Word.prototype.update = function(){
    this.is_revealed = true;

    this.revealed_word = "";
    for(var key in this.letters){
        this.revealed_word += this.letters[key].update() + " ";

        if(this.letters[key].is_guessed === false){
            this.is_revealed = false;
        }
    }

    return this.revealed_word;
};

module.exports = Word;