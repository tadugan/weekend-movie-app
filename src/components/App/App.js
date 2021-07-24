import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import Navigation from '../Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>    
        {/* Navigation bar on all views */}
        <Navigation />

        {/* User is directed to this view on page load. MovieList page */}
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route exact path="/details">
          <Details />
        </Route>
        {/* Add Movie page */}
        <Route exact path="/addmovie">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
