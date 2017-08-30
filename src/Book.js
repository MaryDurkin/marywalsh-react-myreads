import React from 'react'
import PropTypes from 'prop-types'
/*
* this is the lowest level componet
* it renders a book object with its shelf selector
* and calls updateShelf which is passed as a prop from App.js through
* the ListBooks and BookShelf components
*/
class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    const { book, updateShelf } = this.props
    updateShelf(book, e.target.value)
  }

  render () {
    const { book } = this.props
    let bookCover = ( //use placeholder if no image is available
          book.imageLinks
          ? book.imageLinks.thumbnail
          : "http://via.placeholder.com/128x193?text=cover+not+available"
    )
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url(${bookCover})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleChange} value={book.shelf}>
              <option value="moveTo" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(',') : ''}

        </div>
      </div>
    )
  }
}

export default Book
/*   { book.authors && (book.authors.map(author =>
    <div key={author}>{author}</div>
  ))}
  */
