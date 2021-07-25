import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// place holder data so Details.jsx load without erroring out
// I'm still trying to figure out how to make the GET request for Details.jsx
// before the return statement runs in the component
const placeholderMovie = [
    {
        title: 'movie',
        poster: 'https://m.media-amazon.com/images/I/51IGQmBS1VL._AC_.jpg',
        name: 'Animated',
        description: 'description'
    }
]


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    // yield takeEvery('FETCH_SPECIFIC_MOVIE', fetchSpecificMovie);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('EDIT_MOVIE', editMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchGenres() {
    try {
        const genres = yield axios.get('/api/genre');
        yield put({ type: 'SET_GENRES', payload: genres.data });
    } catch (error) {
        console.log('Error getting all genres', error);
    }
}

function* addMovie(action) {
    try {
        yield axios.post('/api/movie', action.payload);
    } catch (error) {
        console.log('Error adding a movie', error);
    }
}

function* editMovie(action) {
    try {
        yield axios.put('api/movie', action.payload);
    } catch (error) {
        console.log('Error editing a movie', error);
    }
}

// function* fetchSpecificMovie(action) {
//     // get the movie that was clicked on, by movie ID
//     try {
//         const movie = yield axios.get(`/api/movie/${action.payload}`);
//         yield put({ type: 'SET_SPECIFIC_MOVIE', payload: movie.data});
//     } catch (error) {
//         console.log('Error getting specific movie. Error:', error);
//     }
// }

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie that is being looked at
const specificMovie = (state = placeholderMovie, action) => {
    switch (action.type) {
        case 'SET_SPECIFIC_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        specificMovie,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
