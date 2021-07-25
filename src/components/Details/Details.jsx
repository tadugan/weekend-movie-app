import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function Details() {

    const movieDetails = useSelector(store => store.specificMovie);
    const history = useHistory();
    const dispatch = useDispatch();
    const { movie } = useParams();

    const getMovieDetails = (movieId) => {
        axios.get(`/api/movie/${movieId}`)
            .then(response => {
                console.log(response);
                dispatch({ type: 'SET_SPECIFIC_MOVIE', payload: response.data });
            })
            .catch(err => {
                console.log('Error getting specific movie. Error:', err);
            })
    }

    // return the user to MovieList
    const backToList = () => {
        history.push('/');
    }

    

    useEffect(() => {
        getMovieDetails(movie);
        console.log('Use Effect');
    }, []);

    return (
        <div>
            <p>movie is: {movie}</p>
            <h2>Title: {movieDetails[0].title}</h2>
            <img 
                src={movieDetails[0].poster} 
                alt={movieDetails[0].title}
                width="185"
                height="274"
            />
            <h3>Genres:</h3>
            <ul>
                {movieDetails.map((genre, index) => {
                    return (
                        <li key={index}>{genre.name}</li>
                    );
                })}
            </ul>
            <p>Description: {movieDetails[0].description}</p>
            <button type="button" onClick={backToList}>Back to List</button>
        </div>
    );
}

export default Details;