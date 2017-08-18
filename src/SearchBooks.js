import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

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
      BooksAPI.search(query, 5).then(results => {
        // catch API errors
        if (typeof results === 'undefined' || results.error) return
        //console.log( "results ", results)

        // add shelf to returned objects with the initial value of 'none'
        for (const book of results){
          book.shelf = 'none'
        }

        //console.log("shelf added ? ", results)
        this.setState({searchResults: results, query: query})
      })
    }
  }

  render () {
    const { searchResults } = this.state
    const { updateShelf } = this.props
    return (
      <div className="search-books-input-wrapper">
        {/*

          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
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
//<BookShelf shelfTitle="none" formattedTitle="I found the following books for you..." bookList={searchResults} updateShelf={this.updateShelf} />
//value={this.state.query}
