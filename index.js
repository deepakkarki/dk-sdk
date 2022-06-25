const { API } = require('./api');
const { Book, Cursor } = require('./resources');

class OneAPI{
  constructor(key, settings){
    this.api = API(key);
  }

  getBooks(limit=100){
    const url = '/book';
    const cur = new Cursor(limit);
    const api = this.api;
    const next = function(params) {
      return api.get(url, {params})
                .then(res => res.docs.map(book => new Book(api, book._id, book.name)))
    }
    cur._next = next;
    return cur;
  }

  getBookById(id){
    const url = `/book/${id}`;
    return this.api.get(url).then(res => 
              new Book(this.api, res.docs[0]._id, res.docs[0].name)
          )
  }
}

module.exports = {
  OneAPI
}