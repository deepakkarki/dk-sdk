const { API, processSort, processFilter } = require('./api');
const { Book, Chapter, Cursor } = require('./resources');

class OneAPI{
  constructor(key, settings){
    this.api = API(key);
  }

  getBooks({limit=100, filter={}, sort={}}){
    filter = processFilter(filter);
    sort = processSort(sort)
    const url = '/book';
    const cur = new Cursor(limit);
    const api = this.api;
    cur._next = function(params) {
      params = {...filter, ...sort, ...params}
      return api.get(url, {params})
                .then(res => res.docs.map(book => new Book(api, book._id, book.name)))
    }
    return cur;
  }

  getBookById(id){
    const url = `/book/${id}`;
    return this.api.get(url).then(res => 
              new Book(this.api, res.docs[0]._id, res.docs[0].name)
          )
  }

  getBookChapters(id, {limit=100, filter={}, sort={}}){
    filter = processFilter(filter);
    sort = processSort(sort);
    const url = `/book/${id}/chapter`;
    const cur = new Cursor(limit);
    const api = this.api;
    cur._next = function(params) {
      params = {...filter, ...sort, ...params}
      return api.get(url, {params})
                .then(res => res.docs.map(ch => new Chapter(api, ch._id, ch.chapterName)))
    }
    return cur;
  }

  getChapters({limit=100, filter={}, sort={}}){
    filter = processFilter(filter);
    sort = processSort(sort)
    const url = '/chapter';
    const cur = new Cursor(limit);
    const api = this.api;
    cur._next = function(params) {
      params = {...filter, ...sort, ...params}
      return api.get(url, {params})
                .then(res => res.docs.map(ch => new Chapter(api, ch._id, ch.chapterName)))
    }
    return cur;
  }

  getChapterById(id){
    const url = `/chapter/${id}`;
    return this.api.get(url).then(res => 
            new Chapter(this.api, res.docs[0]._id, res.docs[0].chapterName)
          )
  }
}

module.exports = {
  OneAPI
}