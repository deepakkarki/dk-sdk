const { processSort, processFilter } = require('./api')

class Cursor{
  constructor(limit){
    this.page = 1;
    this.limit = limit;
  }

  next(){
    let params = {limit:this.limit, page: this.page}
    this.page += 1
    return this._next(params)
  }
}

class Book{
  #handle;

  constructor(handle, id, name){
    this.#handle = handle;
    this.id = id;
    this.name = name;
  }

  getChapters(args){
    const url = `/book/${this.id}/chapter`;
    return this.#handle._cursorCall(url, oCreator('chapter'), args);
  }
}

class Chapter{
  #handle;
  constructor(handle, id, name, book=""){
    this.#handle = handle;
    this.id = id;
    this.name = name;
    this.book = book;
  }
}

class Movie{
  #handle;

  constructor(handle, id, name, runtime=0, budget=0, nominations=0, wins=0, rts=0){
    this.#handle = handle;
    this.id = id;
    this.name = name;
    this.runtime = runtime;
    this.budget = budget;
    this.nominations = nominations;
    this.wins = wins;
    this.rts = rts;
  }

  getQuotes(args){
    const url = `/movie/${this.id}/quote`;
    return this.#handle._cursorCall(url, oCreator('quote'), args);
  }
}

class Quote{
  #handle;
  constructor(handle, id, dialog="", movie="", character=""){
    this.#handle = handle;
    this.id = id;
    this.dialog = dialog;
    this.movie = movie;
    this.character = character;
  }
}

class Character{
  #handle;

  constructor(handle, id, name='', race='', gender='', death=''){
    this.#handle = handle;
    this.id = id;
    this.name = name;
    this.race = race;
    this.gender = gender;
    this.death = death;
  }

  getQuotes(args){
    const url = `/character/${this.id}/quote`;
    return this.#handle._cursorCall(url, oCreator('quote'), args);
  }
}

function oCreator(type){
  let omap = {
    book : (args) => {
      let {handle, _id, name} = args;
      return new Book(handle, _id, name);
    },
    chapter: (args) => {
      let {handle, _id, chapterName, book} = args;
      return new Chapter(handle, _id, chapterName, book);
    },
    movie: (args) => {
      let { handle, _id, name, runtimeInMinutes:runtime, budgetInMillions:budget,
            academyAwardNominations:nominations, academyAwardWins:wins, 
            rottenTomatoesScore:rts 
          } = args;
      return new Movie(handle, _id, name, runtime, budget, nominations, wins, rts);
    },
    quote: (args) => {
      let {handle, _id, dialog, movie, character} = args;
      return new Quote(handle, _id, dialog, movie, character);
    },
    character: (args) => {
      let {handle, _id, name, race, gender, death} = args;
      return new Character(handle, _id, name, race, gender, death);
    }
  }

  return omap[type];
}

module.exports = {
  Book,
  Chapter,
  Cursor,
  Movie,
  Character,
  oCreator
}