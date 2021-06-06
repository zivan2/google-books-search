import React from 'react'
import Saved from './Saved'
let axios = require('axios').default

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.search = async () => {
            let query = document.getElementById('searchInput').value
            let items
            try {
                items = (await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query.replace(' ', '%20')}`)).data.items
            } catch (err) {
                console.error(err)
            }

            let r
            for (let i in items) {
                try {
                    r = await axios.get(`/books?id=${items[i].id}`)
                    if (r.status == 200) {
                        items[i].saved = true
                    } else {
                        items[i].saved = false
                    }
                } catch (err) {
                    items[i].saved = false
                }
            }
            
            this.setState(state => { return { results: items } })
        }
        this.saveBook = async (book, i) => {
            console.log(book)
            let r
            try {
                r = await axios({
                    method: 'post',
                    url: '/books',
                    data: {
                        id: book.id,
                        title: book.volumeInfo.title,
                        author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : book.volumeInfo.publisher,
                        synopsis: book.volumeInfo.description,
                        url: book.volumeInfo.infoLink
                    }
                })
                this.setState(state => {
                    let newState = state
                    newState.results[i].saved = true
                    return newState
                })
            } catch (err) {
                console.error(err)
            }
        }
    }

    render() {
        return (
            <div>
                <input id='searchInput' type='text'></input>
                <button onClick={() => this.search()}>Search</button>
                <div>
                    {
                        (() => {
                            if (!this.state.results) {
                                return (<p>Begin by searching for a book</p>)
                            } else {
                                let rend = []
                                console.log(this.state.results)
                                this.state.results.map((item, i) => {
                                    rend.push (
                                        <div key={`result-item-${i}`}>
                                            <h3>{item.volumeInfo.title}</h3>
                                            <p>{item.volumeInfo.description || 'No description found.'}</p>
                                            <a href={item.volumeInfo.infoLink}>Google books page</a>
                                            <div id='saveButton'>
                                                {(() => {
                                                    if (!item.saved) { 
                                                        return (
                                                            <button onClick={() => {
                                                                let thisItem = item
                                                                let thisIndex = i
                                                                this.saveBook(thisItem, thisIndex)
                                                            }}>Save</button>
                                                        )
                                                    } else {
                                                        return (
                                                            <button className='disabled'>Saved ✓</button>
                                                        )
                                                    }
                                                })()}
                                            </div>
                                        </div>
                                    )
                                })
                                return rend
                            }
                        })()
                    }
                </div>
            </div>
        )
    }
}

export default Search