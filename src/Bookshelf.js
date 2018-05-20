import React, { Component } from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types'

class Bookshelf extends Component {
    render() {
        console.log('props', this.props)
        return (
            //seznam bookov
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
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
export default Bookshelf

