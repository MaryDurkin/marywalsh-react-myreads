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

      const { books } = this.state
      return (
        <div className="app">
          <Route exact path="/search" render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search" >Close</Link>
                <SearchBooks updateShelf={this.updateShelf}/>
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
