import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {
  static propTypes = {
  bookList: PropTypes.array.isRequired,
  shelfTitle: PropTypes.string.isRequired
  }

render () {

  const { bookList, shelfTitle } = this.props
  console.log("shelf", shelfTitle )
  const currentShelf = bookList.filter(book => book.shelf === shelfTitle)
  console.log(currentShelf )
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books" >
        <ol className="books-grid" >
          { currentShelf.map((book) =>(
            <li key={book.title} ><Book book={ book} /></li>
          ))}

        </ol>
      </div>
    </div>
  )
}
}
export default BookShelf
