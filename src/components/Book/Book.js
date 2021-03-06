import { useContext } from 'react'
import StoreContext from '../../Store'
import BookShelfChanger from '../BookShelfChanger/BookShelfChanger'
import placeholder from '../../assets/book-placeholder.jpeg'

const Book = ({ book, search }) => {
  const { title, authors, shelf, id, imageLinks } = book
  const { books, darkTheme } = useContext(StoreContext)
  const titleDarkStyle = { color: '#7dad7b' }
  const authorDarkStyle = { color: '#abb3af' }

  // if book list coming from search results, check if book is already is in any shelf
  // if book is on the shelf it will return the book
  // if it returns the it will be used instead of API results
  const isBook = () => {
    if (search) {
      return books && books.find((book) => book.id === id)
    }
  }

  const thumbnail = imageLinks ? book.imageLinks.thumbnail : placeholder

  const bookAuthors = authors && authors.map((author) => <p key={author}>{author}</p>)

  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${thumbnail})`,
            }}
          >
            <BookShelfChanger shelf={shelf} book={isBook() !== undefined ? isBook() : book} search={search} />
          </div>
        </div>
        <div style={darkTheme ? titleDarkStyle : null} className='book-title'>
          {title}
        </div>
        <div style={darkTheme ? authorDarkStyle : null} className='book-authors'>
          {bookAuthors}
        </div>
      </div>
    </li>
  )
}
export default Book
