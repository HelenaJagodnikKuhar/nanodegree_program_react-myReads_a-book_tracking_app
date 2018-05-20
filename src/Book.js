import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'
import PropTypes from 'prop-types'

class Book extends Component {

    handleChange = (event) => {
        console.log("event", event)
        console.log('props', this.props)//.onShelfChange(book)
        console.log('event.target', event.target.value)
        this.props.onShelfChange(this.props.book, event.target.value)
        //this.setState({ value: event.target.value });
    }
    render() {
        const { options, value } = this.props;
        const smallThumbnail = this.props.book.imageLinks ? this.props.book.imageLinks.smallThumbnail : ""
        return (
            <div>
                {/* <pre>{JSON.stringify(this.props, null, 2)} </pre> */}
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                            style={{
                                width: 128, height: 193,
                                backgroundImage: `url(${smallThumbnail})`
                            }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select value={this.props.book.shelf || "none"} onChange={this.handleChange}>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">
                        {this.props.book.title}
                    </div>
                    <div className="book-authors">
                        {this.props.book.authors}
                    </div>
                </div>
            </div>
        )
    }
}
export default Book