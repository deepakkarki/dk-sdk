const { API, processSort, processFilter } = require('./api');
const { Book, Chapter, Cursor, Movie, oCreator } = require('./resources');

class OneAPI{
  constructor(key, settings){
    this.api = API(key);
  }

  _cursorCall(url, creator, {limit=100, filter={}, sort={}}){
    filter = processFilter(filter);
    sort = processSort(sort)
    const cur = new Cursor(limit);
    const handle = this;
    cur._next = function(params) {
      params = {...filter, ...sort, ...params}
      return handle.api.get(url, {params})
                .then(res => res.docs.map(obj => creator({handle, ...obj})))
    }
    return cur;
  }

  _resourceCall(ep, id){
    const handle = this;
    return handle.api.get(`/${ep}/${id}`).then(res => 
      oCreator(ep)({handle, ...res.docs[0]})
    )
  }

  getBooks(args){
    return this._cursorCall('/book', oCreator('book'), args)
  }

  getBookById(id){
    return this._resourceCall('book', id)
  }

  getBookChapters(id, args){
    return this._cursorCall(`/book/${id}/chapter`, oCreator('chapter'), args)
  }

  getChapters(args){
    return this._cursorCall('/chapter', oCreator('chapter'), args)
  }

  getChapterById(id){
    return this._resourceCall('chapter', id)
  }

  getMovies(args){
    return this._cursorCall('/movie', oCreator('movie'), args)
  }

  getMovieById(id){
    return this._resourceCall('movie', id)
  }
}

module.exports = {
  OneAPI
}