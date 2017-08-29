import React from 'react'
import { Link } from 'react-router-dom'
import { Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state={
      books: []
    }

  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books })
    })
  }
/*
* this function puts the book on the correct shelf,
* updates the backend with BooksAPI.update
* and calls setState to update state.books
*/
  updateShelf = (book, newShelf) => {

    // if the shelf has changed, update.....
    if (book.shelf !== newShelf){
      BooksAPI.update(book, newShelf).then(() => {
        book.shelf = newShelf
        // filter out the book from the state.books, then concat it back it with the new shelf
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <SearchBooks updateShelf={this.updateShelf} shelfBooks={this.state.books}/>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}></Route>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks bookList={books} updateShelf={this.updateShelf}/>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
        )}></Route>
      </div>
    )
  }
}

export default BooksApp
