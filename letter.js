var Letter = function(underlying_letter){

    this.underlying = underlying_letter;
    this.is_guessed = false;

    this.check = function(letter){
        if(letter === this.underlying){
            this.is_guessed = true;
        }
    };
    this.update = function(){
        if(this.is_guessed){
            return this.underlying;
        }else{
            return "_";
        }
    };
}
module.exports = Letter;