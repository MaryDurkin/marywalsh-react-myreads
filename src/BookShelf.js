import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    formattedTitle: PropTypes.string.isRequired
  }


render () {

  const { bookList, shelfTitle, formattedTitle, updateShelf } = this.props
  const currentShelf = bookList.filter(book => book.shelf === shelfTitle)
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{formattedTitle}</h2>
      <div className="bookshelf-books" >
        <ol className="books-grid" >
          { currentShelf.map((book) =>(
            <li key={book.title} ><Book book={ book} updateShelf={updateShelf}/></li>
          ))}

        </ol>
      </div>
    </div>
  )
}
}
export default BookShelf
