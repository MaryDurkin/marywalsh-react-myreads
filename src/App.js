import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
state={
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: []

  }


  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books })
    })
  }


updateShelf = (book, newShelf) => {
let alreadyOnShelf = false
let updatedBookList = this.state.books

  // update the backend
  BooksAPI.update(book, newShelf)

  // check if the book is already on a shelf
  for (const b in updatedBookList){
    if (updatedBookList[b].id === book.id){
      alreadyOnShelf = true
      //update the shelf
      updatedBookList[b].shelf = newShelf
      // if newShelf is 'remove' remove it from the updatedBookList
      updatedBookList = updatedBookList.filter(bk => bk.shelf !== 'remove')
      break
    }
  }
  // if it is a new book add it to the shelf - unless 'none' was selected
  if (!alreadyOnShelf && newShelf !== 'remove') {
    book.shelf = newShelf
    updatedBookList.push(book)
  }
  // set the new state
  this.setState({ books: updatedBookList })
  }

  render() {
    /* use the following to check the JSON retruned from the call
    * remember that API calls should be wrapped in a promise and
    * therender method shouldn't actually call the API
    BooksAPI.getAll().then(response => console.log(response))
    */
    const { books } = this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <SearchBooks updateShelf={this.updateShelf}/>

            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks bookList={books} updateShelf={this.updateShelf}/>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
