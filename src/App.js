import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'
import SearchResults from './SearchResults.js'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
    query: '',
    searchResults: []
  }
  setBookShelfs(books) {
    return books.map((book) => {
      this.state.books.forEach((mybook) => {
        if (mybook.id == book.id) {
          book.shelf = mybook.shelf;
        }
      })
      return book;
    })
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))

    BooksAPI.search(query)
      .then((books) => {
        if (Array.isArray(books)) {
          this.setState({
            searchResults: this.setBookShelfs(books),
            notfound: false
          })
        } else {
          this.setState({
            searchResults: [],
            notfound: true,
          })
        }
      })
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
      })
  }
  onQueryChange = (event) => {
  }

  onShelfChange = (changeBook, shelf) => {
    let found = false;
    this.state.books.forEach((book) => {
      if (changeBook.id === book.id) {
        book.shelf = shelf;
        found = true
      }
    })
    if (!found) {
      changeBook.shelf = shelf;
      this.state.books.push(changeBook);
    }

    this.setState({
      books: this.state.books
    })

    console.log("onShelfChange:book", changeBook, shelf)

    BooksAPI.update(changeBook, shelf)
      .catch(err => {
        console.log("err", err)
        alert("Someting went wrong! Call me." + err)
      })
  }

  render() {
    const { query } = this.state
    const shelfs = {
      read: this.state.books.filter((book) => book.shelf === "read"),
      currentlyReading: this.state.books.filter((book) => book.shelf === "currentlyReading"),
      wantToRead: this.state.books.filter((book) => book.shelf === "wantToRead"),
      none: this.state.books.filter((book) => book.shelf === "none")
    }

    const SearchResultsWrapper = () => (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href="/">Close</a>
          <div className="search-books-input-wrapper">
            <input onChange="onQueryChange"
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <SearchResults
              books={this.state.searchResults}
              onShelfChange={this.onShelfChange}
              notfound={this.state.notfound}
              query={this.state.query}/>
          </ol>
        </div>
      </div>
    );
    const Library = () => (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              books={shelfs.read}
              onShelfChange={this.onShelfChange}
              title="Read"
            />
            <Bookshelf
              books={shelfs.wantToRead}
              onShelfChange={this.onShelfChange}
              title="Want to Read"
            />
            <Bookshelf
              books={shelfs.currentlyReading}
              onShelfChange={this.onShelfChange}
              title="currentlyReading"
            />
          </div>
        </div>
        <div className="open-search">
          <a href="/search" >Add a book</a>
        </div>
      </div>
    );

    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/search" component={SearchResultsWrapper} />
            <Route path="/" component={Library} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
