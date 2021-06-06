import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Search from './Search.js'
import Saved from './Saved.js'
import './bootstrap.css'
let axios = require('axios').default


function App() {
  return (
    <div>
      <header>
        <h1>Google books search</h1>
        <ul>
          <li>
            <a href='/search'>Search</a>
          </li>
          <li>
            <a href='/saved'>Saved</a>
          </li>
        </ul>
      </header>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Search />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
          <Route path='/saved'>
            <Saved />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
