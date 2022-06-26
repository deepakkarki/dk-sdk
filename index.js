const { API } = require('./api');
const { Book, Cursor } = require('./resources');

class OneAPI{
  constructor(key, settings){
    this.api = API(key);
  }

  getBooks(limit=100, filter={}, sort={}){
    filter = processFilter(filter);
    const url = '/book';
    const cur = new Cursor(limit);
    const api = this.api;
    const next = function(params) {
      params = {...filter, ...params}
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

let sampleFilter = {
  match:{
    name: 'foo'
  },
  reject:{
    name: 'bar'
  },
  includes:{
    race:['x', 'y']
  },
  excludes:{
    race:['a', 'b']
  },
  lt: {
    budgetInMillions: 100
  },
  gt: {
    academyAwardWins: 0
  },
  eq: {
    academyAwardWins: 2
  },
  like: {
    name : 'hello'
  }
}

function processFilter(filter){
  let nop = {}
  for(let prop in filter){
    switch (prop) {
      case 'match':
        nop = {...nop, ...filter['match']}
      break;

      case 'reject':
        for(let k in filter[prop])
          nop[`${k}!`] = filter[prop][k];
      break;

      case 'includes':
        for(let k in filter[prop]){
          nop[k] = filter[prop][k].toString();
        }
      break;

      case 'excludes':
        for(let k in filter[prop]){
          nop[`${k}!`] = filter[prop][k].toString();
        }
      break;

      case 'lt':
        for(let k in filter[prop]){
          nop[`${k}<${filter[prop][k]}`] = '';
        }
      break;

      case 'gt':
        for(let k in filter[prop]){
          nop[`${k}>${filter[prop][k]}`] = '';
        }
      break;

      case 'eq':
        nop = {...nop, ...filter['eq']}
      break;

      case 'like':
        for(let k in filter[prop]){
          nop[k] = `/${filter[prop][k]}/i`;
        }
      break;
    
      default:
        break;
    }
  }
  return nop;
}

opts = {
  limit: 1,
  name: 'foo',
  race:['x', 'y'],
  "budgetInMillions<100":"",
  "academyAwardWins>0":"",
}