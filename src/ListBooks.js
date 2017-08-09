import React from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {
 static propTypes = {
    bookList: PropTypes.array.isRequired
  }

  render (){

    const { bookList } = this.props
    return (
      <div className="list-books-content">
        <BookShelf shelfTitle="currentlyReading" formattedTitle="Currently Reading" bookList={bookList} />
        <BookShelf shelfTitle="wantToRead" formattedTitle="Want To Read" bookList={bookList} />
        <BookShelf shelfTitle="read" formattedTitle="Read" bookList={bookList} />
      </div>
    )
  }
}
export default ListBooks
