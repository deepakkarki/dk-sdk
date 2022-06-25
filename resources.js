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

  getChapters(){
    const url = `/book/${this.id}/chapter`;
    const cur = new Cursor(limit);
    const api = this.#handle;
    const next = function(params){
      return api.get(url, {params}).then(res =>
        res.docs.map(ch => new Chapter(api, ch._id, ch.chapterName))
      );
    }
    cur._next = next;
    return cur;
  }
}

class Chapter{
  #handle;
  constructor(handle, id, name){
    this.#handle = handle;
    this.id = id;
    this.name = name;
  }
}

module.exports = {
  Book,
  Chapter,
  Cursor
}