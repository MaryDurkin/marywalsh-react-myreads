import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

/*
* This component initial displays a blank (except for the placeholder) search package
* when the user types in a query, books are retreived using BooksAPI.search
* a 'shelf' is added to the book object
* the books are then displayed using Book
*/

class SearchBooks extends React.Component {

  static propTypes = {
    updateShelf: PropTypes.func.isRequired
  }

  state = { query: '',
            searchResults: []
          }

  updateQuery = (query) => {

    query = query.trim()
    if (query===''){
      this.setState({searchResults: [], query: query})
    } else
    {
      // get the books frm the backend
      BooksAPI.search(query, 20).then(results => {
        // catch API errors
        if (typeof results === 'undefined' || results.error) return

        // add shelf to returned books with the initial value of 'none'
        for (const book of results){
          book.shelf = 'none'
        }

        this.setState({searchResults: results, query: query})
      })
    }
  }

  render () {
    const { searchResults } = this.state
    const { updateShelf } = this.props
    return (
      <div className="search-books-input-wrapper">

        <input type="text" placeholder="Search by title or author"  onChange={event => this.updateQuery(event.target.value)}/>

        <ol className="books-grid" >
          { searchResults.length > 0  && (
            searchResults.map((book) =>(
            <li key={book.id} ><Book book={book} updateShelf={updateShelf}/></li>
          )))}
        </ol>

      </div>
    )
  }
}

export default SearchBooks
