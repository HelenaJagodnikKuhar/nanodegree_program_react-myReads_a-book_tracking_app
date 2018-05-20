import React, { Component } from 'react'
import Book from './Book.js'
import Bookshelf from './Bookshelf.js'
import PropTypes from 'prop-types'

class SearchResults extends Component {
    render() {
        return (
            //seznam bookov
            <div className="bookshelf">
                {this.props.notfound && <h2 className="bookshelf-title">No results for: {this.props.query}</h2>}
                {!this.props.notfound && <h2 className="bookshelf-title">Search results for: {this.props.query}</h2>}
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onShelfChange={this.props.onShelfChange}/>
                            </li>
                        ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}
export default SearchResults

