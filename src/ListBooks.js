import React from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {
 static propTypes = {
    bookList: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render (){

    const { bookList, updateShelf } = this.props
    return (
      <div className="list-books-content">
        <BookShelf  shelfTitle="currentlyReading" formattedTitle="Currently Reading" bookList={bookList} updateShelf={updateShelf} />
        <BookShelf  shelfTitle="wantToRead" formattedTitle="Want To Read" bookList={bookList} updateShelf={updateShelf}/>
        <BookShelf  shelfTitle="read" formattedTitle="Read" bookList={bookList} updateShelf={updateShelf}/>
      </div>
    )
  }
}
export default ListBooks
