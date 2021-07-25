import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Details() {

    const movieDetails = useSelector(store => store.specificMovie);
    const history = useHistory();

    const backToList = () => {
        // return the user to MovieList
        history.push('/');
    }

    return (
        <div>
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