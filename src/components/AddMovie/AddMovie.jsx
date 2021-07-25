import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function AddMovie() {

    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);

    console.log('This is genres:', genres);

    // const [  ] = useState();
    // const [  ] = useState();
    // const [  ] = useState();
    // const [  ] = useState();

    // return the user to MovieList
    const backToList = () => {
        history.push('/');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'});
    }, []);

    return (
        <div>
            <input 
                type="text"
                placeholder="Movie Title"
            />
            <br />
            <input 
                type="text"
                placeholder="Movie Poster URL" 
            />
            <br />
            <textarea placeholder="Movie Description">
            </textarea>
            <br />
            <select name="cars" id="cars">
                {/* <option value="Adventure">Adventure</option>
                <option value="Animated">Animated</option>
                <option value="Biographical">Biographical</option>
                <option value="Comedy">Comedy</option>
                <option value="Disaster">Disaster</option>
                <option value="Drama">Drama</option>
                <option value="Epic">Epic</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Musical">Musical</option>
                <option value="Romantic">Romantic</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Space-Opera">Space-Opera</option>
                <option value="Superhero">Superhero</option> */}
                {genres.map((genre, index) => {
                    return (
                        <option key={index} value={genre.name}>{genre.name}</option>
                    );
                })}
            </select>
            <select></select>
            <section>
                <br />
                <button type="button" onClick={backToList}>Cancel</button>
                <button type="button">Save</button>
            </section>
        </div>
    );
}

export default AddMovie;
