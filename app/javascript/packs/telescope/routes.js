import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Root from './components/root';

const App = (props) => (
  <Router>
    <div>
      <Route path='/' component={Root} />
    </div>
  </Router>
)
export default App;
