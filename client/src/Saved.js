import {Component} from 'react'
let axios = require('axios').default

class Saved extends Component {
    constructor(props) {
        super()
        this.state = {}


    }

    componentDidMount() {
        console.log("SDAAAAA")
        axios.get('/booksall').then(r => {
            this.setState({books: r.data})
        })
    }

    render() {
        return (
            <div>
            {(() => {
                if (this.state.books) {
                    let rend = []
                    this.state.books.map((item, i) => {
                        rend.push(
                            <div key={`result-item-${i}`}>
                                <h3>{item.title} - {item.author}</h3>
                                <p>{item.synopsis || 'No description found.'}</p>
                                <a href={item.url}>Google books page</a><br></br>
                                <button onClick={() => {
                                    
                                }}>Delete</button>
                            </div>
                        )
                    })
                    return rend
                } else {
                    return (<p>No saved books</p>)
                }
            })()}
            </div>
        )
    }
}

export default Saved