import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

/*
* this component displays a shelf of books
* bookList, shelfTitle and formattedTitle are passed as props
* updateShelf is passed as a prop to Book
*/


class BookShelf extends React.Component {
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    formattedTitle: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

render () {

  const { bookList, shelfTitle, formattedTitle, updateShelf } = this.props
  const currentShelf = bookList.filter(book => book.shelf === shelfTitle)
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{formattedTitle}</h2>
      <div className="bookshelf-books" >
        <ol className="books-grid" key={shelfTitle}>
          { currentShelf.map((book, index) =>(
            <li key={index} ><Book book={ book} updateShelf={updateShelf}/></li>
          ))}

        </ol>
      </div>
    </div>
  )
}
}
export default BookShelf
