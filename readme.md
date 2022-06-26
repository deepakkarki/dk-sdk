# OneAPI SDK

This is the SDK for the LoTR [OneAPI](https://the-one-api.dev/).

The SDK mirrors the REST API.

There are five key resources - Book, Movie, Character, Quote and Chapter.

## Installation

`npm install dk-sdk`

## Usage

```js
let { OneAPI } = require('dk-sdk');

const SECRET = "<YOUR SECRET>";
let cli = new OneAPI(SECRET);

function printCh(){
  let cursor = cli.getChapters({limit:5})
  const chapters = await cur.next()
  console.log(chapters)
}
printCh();
```

At the high level, the enumeration of any resource can be got with `cli.getResources` style API, eg (`cli.getBooks()`).
This always returns a cursor, you can start querying the values by calling `cursor.next()` which returns the list of results until they run out at which point in time an empty list (`[]`) is returned.

The methods exposed by the client,

```js
getBooks({args})
getBookById(id)
getBookChapters(id, {args})

getChapters({args})
getChapterById(id)

getMovies({args})
getMovieById(id)
getMovieQuotes(id, {args})

getQuotes({args})
getQuoteById(id)

getCharacters({args})
getCharacterById(id)
getCharacterQuotes(id, {args})
```

Here `{args}` is of the following form, `{limit:number, filter:FilterObj, sort: SortObj}`

* `limit` : sets the number of results per call to the cursor
* `filter` : Asks the server to filter the results based on FilterObj (see below)
* `sort` : Asks the server to sort the results based on SortObj

Here is a sample filter "kitchen sink",

```js
let FilterObj = {
  match:{ // =
    name: 'foo'
  },
  reject:{ // !=
    name: 'bar'
  },
  includes:{ // in
    race:['x', 'y']
  },
  excludes:{ // not in
    race:['a', 'b']
  },
  lt: { // <
    budgetInMillions: 100
  },
  gt: { // >
    academyAwardWins: 0
  },
  eq: { // ==
    academyAwardWins: 2
  },
  like: { // regex
    name : 'hello'
  }
}
```

And here is a sample sort object,

```js
SortObj = {
  name : 'asc', // or 'desc'
}
```

Then there is the API to fetch a specific resource instance i.e. by an `id` then you have `cli.getResourceById`.
eg (`cli.getBookById(id)`). These return a promise that resolves to an object of the specific resource type (eg. `Book` or `Quote`).


Look into the `examples.js` file for more usage information.