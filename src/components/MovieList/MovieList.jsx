import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    // // TODO: figure out how to make this work
    // const handleClick = (movieId) => {
    //     console.log('Clicked poster number:', movieId); // test

    //     // dispatch movie ID to Saga to request movie details
    //     dispatch({ type: 'FETCH_SPECIFIC_MOVIE', payload: movieId });

    //     // // send user to the details view
    //     // history.push('/details');
    // }

    const handleClick = (movieId) => {
        axios.get(`/api/movie/${movieId}`)
            .then(response => {
                console.log(response);
                dispatch({ type: 'SET_SPECIFIC_MOVIE', payload: response.data });
                history.push('/details');
            })
            .catch(err => {
                console.log('Error getting specific movie. Error:', error);
            })
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <h3>{movie.title}</h3>
                            <img 
                                src={movie.poster} 
                                alt={movie.title}
                                value={movie.id}
                                onClick={() => {handleClick(movie.id)}}
                            />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;