import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function AddMovie() {

    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);

    const [ title, setTitle ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ movieGenre, setMovieGenre ] = useState('');

    // return the user to MovieList
    const backToList = () => {
        history.push('/');
    }

    const handleSave = () => {
        console.log('CLICKED save');
        console.log('title:', title);
        console.log('url:', url);
        console.log('description:', description);
        console.log('movieGenre:', movieGenre);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'});
    }, []);

    return (
        <div>
            <input 
                type="text"
                placeholder="Movie Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <br />
            <input 
                type="text"
                placeholder="Movie Poster URL"
                value={url}
                onChange={(event) => setUrl(event.target.value)} 
            />
            <br />
            <textarea 
                placeholder="Movie Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            >
            </textarea>
            <br />
            <select 
                name="cars" 
                id="cars"
                value={movieGenre}
                onChange={(event) => setMovieGenre(event.target.value)}
            >
                {genres.map((genre, index) => {
                    return (
                        <option 
                            key={index} 
                            value={genre.name}
                        >
                        {genre.name}
                        </option>
                    );
                })}
            </select>
            <select></select>
            <section>
                <br />
                <button type="button" onClick={backToList}>Cancel</button>
                <button type="button" onClick={handleSave}>Save</button>
            </section>
        </div>
    );
}

export default AddMovie;
