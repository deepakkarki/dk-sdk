let { OneAPI } = require('./index');

const SECRET = "<YOUR SECRET HERE>"
let cli = new OneAPI(SECRET);
let bid = ['5cf5805fb53e011a64671582', '5cf58077b53e011a64671583', '5cf58080b53e011a64671584']
let cid = ['6091b6d6d58360f988133b8b', '6091b6d6d58360f988133b8d', '6091b6d6d58360f988133b8f']
let mid = ['5cd95395de30eff6ebccde5d']
let qid = ['5cd96e05de30eff6ebcce7e9']
let chid = ['5cd99d4bde30eff6ebccfe9e']

async function testBooks(){
  let cur = cli.getBooks({limit:1})
  while(true){
    let books = await cur.next();
    if(!books.length) break;
    console.log(books)
  }
}
testBooks()


async function testBookChapters(){
  let book = await cli.getBookById(bid[0]);
  let cur = book.getChapters({limit:10})
  while(true){
    let chapters = await cur.next();
    if(!chapters.length) break;
    console.log(chapters)
  }
}
// testBookChapters()

async function testFilters(){
  let filters = [
    {match:{name:"The Fellowship Of The Ring"}},
    {like:{name:"King"}},
    {includes:{name:["The Fellowship Of The Ring", "The Return Of The King"]}}
  ];
  let cur = cli.getBooks({filter:filters[2]});
  let books = await cur.next();
  console.log(books)
}

// testFilters()


async function testgetBC(){
  let cur = cli.getBookChapters('5cf5805fb53e011a64671582', {limit:5});
  let chapters = await cur.next();
  console.log(chapters)
}
// testgetBC()

async function testGetChapters(){
  let cur = cli.getChapters({limit:5});
  let chs = await cur.next();
  console.log(chs)
}
// testGetChapters()

async function testGetChapter(){
  let ch = await cli.getChapterById(cid[0]);
  console.log(ch)
}
// testGetChapter()

async function testSort(){
  // filter only works with top level elements
  let cur = cli.getChapters({limit:5, sort:{chapterName:'desc'}});
  let chs = await cur.next();
  console.log(chs)
}
// testSort()


async function testGetMovies(){
  let cur = cli.getMovies({limit:5});
  let movies = await cur.next();
  console.log(movies)
}
// testGetMovies()

async function testGetMovieQuotes(){
  let mov = await cli.getMovieById(mid[0]);
  console.log(mov)
  let cur = mov.getQuotes({limit:5});
  let quotes = await cur.next()
  console.log(quotes);
}
// testGetMovieQuotes()


async function testGetMQ(){
  let cur = cli.getMovieQuotes(mid[0], {limit:5});
  let quotes = await cur.next();
  console.log(quotes)
}
// testGetMQ()


async function testQuotes(){
  let cur = cli.getQuotes({limit:5});
  let quotes = await cur.next();
  console.log(quotes)
}
// testQuotes()

async function testQuoteId(){
  let quote = await cli.getQuoteById(qid[0]);
  console.log(quote)
}
// testQuoteId()

async function testGetCharacters(){
  let cur = cli.getCharacters({limit:5});
  let chars = await cur.next();
  console.log(chars)
}
// testGetCharacters()

async function testGetCharactersQuotes(){
  let ch = await cli.getCharacterById(chid[0]);
  console.log(ch)
  let cur = ch.getQuotes({limit:5});
  let quotes = await cur.next()
  console.log(quotes);
}
// testGetCharactersQuotes()