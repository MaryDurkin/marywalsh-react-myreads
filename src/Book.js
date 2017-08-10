import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    const { book, updateShelf } = this.props
    let newShelf = e.target.value
    if (newShelf !== "none" && newShelf !== "remove"){ //take "remove" later
      updateShelf(book, newShelf)
    }
  }

  render () {
    const { book, updateShelf } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleChange} value='none'>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="remove">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    )
  }
}

export default Book
// mw  - note authors is an array - check how to render more than one
//<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imagelinks.thumbnail})` }}></div>
