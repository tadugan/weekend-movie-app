import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import Navigation from '../Navigation/Navigation';
import EditPage from '../EditPage/EditPage';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>    
        {/* Navigation bar on all views */}
        

        {/* User is directed to this view on page load. MovieList page */}
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route exact path="/details/:movie">
          <Details />
        </Route>
        {/* Add Movie page */}
        <Route exact path="/addmovie">
          <AddMovie />
        </Route>
        <Route exact path="/editpage/:movie">
          <EditPage />
        </Route>
      </Router>
    </div>
  );
}


export default App;
