import { useState, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Main from './components/Main/Main'
import { BooksProvider } from './BooksProvider'
import { getAll, update } from './BooksAPI'

const BooksApp = () => {
  const [searchResults, setSearchResults] = useState([])
  const [books, setBooks] = useState([])
  const [shouldUpdate, setShouldUpdate] = useState(true)

  const currentlyReading = books && books.filter((book) => book.shelf === 'currentlyReading')
  const wantToRead = books && books.filter((book) => book.shelf === 'wantToRead')
  const read = books && books.filter((book) => book.shelf === 'read')

  useEffect(() => {
    if (shouldUpdate) {
      console.log('reloaded')
      getAll()
        .then((data) => {
          setBooks(data)
        })
        .then(() => setShouldUpdate(false))
        .catch((err) => console.log(err))
    }
    setShouldUpdate(false)
  }, [shouldUpdate])

  const handleShelf = (shelf, book) => {
    const { id } = book

    // update server
    update(id, shelf)
    // check if book is already on the shelf
    const isBook = books.find((book) => book.id === id)

    // when book already exists, change it to the selected shelf
    if (isBook !== undefined) {
      const myBooks = [...books]
      const bookIndex = myBooks.findIndex((book) => book.id === id)
      myBooks[bookIndex].shelf = shelf
      setBooks(myBooks)

      // When book does not exists, add it to the selected shelf and update the state
    } else {
      // force update to update the books
      setShouldUpdate(true)
    }
  }

  return (
    <div className='app'>
      <Navigation />

      {/* Pass books down to make it available for any consumer component within the provider */}
      <BooksProvider
        value={{
          books,
          handleShelf,
          searchResults,
          setSearchResults,
          currentlyReading,
          read,
          wantToRead,
        }}
      >
        <Main />
      </BooksProvider>
    </div>
  )
}

export default BooksApp
