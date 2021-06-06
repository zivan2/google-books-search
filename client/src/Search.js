import React from 'react'
import Saved from './Saved'
let axios = require('axios').default

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.search = () => {
            let query = document.getElementById('searchInput').value
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query.replace(' ', '%20')}`).then(r => {
                let items = r.data.items
                let finish = (id=null) => {
                    console.log(id)
                    let ALLDONE = true
                    for (let item of items) {
                        let s = item.saved  
                        if (!s && (typeof s == 'undefined' || typeof s == 'object')) ALLDONE = false
                        console.log('forever')
                    }
                    if (ALLDONE) {
                        this.setState({results: items})
                    }
                }

                for (let i in items) {
                    axios.get(`/books?id=${items[i].id}`).then(response => {
                        let currentIndex = i
                        if (response.status == 200) {
                            items[currentIndex].saved = true
                        } else {
                            items[currentIndex].saved = false
                        }
                        console.log(i, items[currentIndex].saved)
                        finish(i)
                    }).catch(e => {
                        let currentIndex = i
                        items[currentIndex].saved = false
                        console.log(i, items[currentIndex].saved)
                        finish(i)
                    })
                    console.log('forev ssser')
                }
            })
        }
        this.saveBook = (book, i) => {
            console.log(book)
            axios({
                method: 'post',
                url: '/books',
                data: {
                    id: book.id,
                    title: book.volumeInfo.title,
                    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : book.volumeInfo.publisher,
                    synopsis: book.volumeInfo.description,
                    url: book.volumeInfo.infoLink
                }
            }).catch(e => console.error(e))
            this.setState(state => {
                let newState = state
                newState.results[i].saved = false
                return newState
            })
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
                                                            <button onClick={() => this.saveBook(item, i)}>Save</button>
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