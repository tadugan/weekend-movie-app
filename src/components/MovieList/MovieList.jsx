import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    const handleClick = (movieId) => {
        console.log('Clicked poster number:', movieId); // test

        dispatch({ type: 'FETCH_SPECIFIC_MOVIE', payload: movieId });
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