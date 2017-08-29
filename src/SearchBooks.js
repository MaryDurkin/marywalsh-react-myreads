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

/*
* shelfBooks is a copy , used to compare with the search results
* so we can update searchResults with the correct shelf
*/

  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    shelfBooks: PropTypes.array.isRequired
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
      // get the books from the backend
      BooksAPI.search(query, 20).then(results => {
        // catch API errors
        if (typeof results === 'undefined' || results.error) return

        for (const book of results){
          //check if book is already on the bookshelf
          for (const b of this.props.shelfBooks){
            // if it is, update the search results with the correct shelf
            if (b.id === book.id) {
              book.shelf = b.shelf
              break
            }
            else {
            // if it isn't on the book shelf, set self to 'none'
              book.shelf = "none"
            }
          }
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
