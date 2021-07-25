import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from "@material-ui/core";

function AddMovie() {

    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);

    const [ title, setTitle ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ movieGenre, setMovieGenre ] = useState('1');
    const [ areInputsInvalid, setAreInputsInvalid ] = useState(false);

    // Component styling
    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
          formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
          },
          selectEmpty: {
            marginTop: theme.spacing(2),
          },
        },
      }));

    const classes = useStyles();

    // return the user to MovieList
    const backToList = () => {
        history.push('/');
    }

    const handleSave = () => {
        // Validate inputs
        console.log(movieGenre);
        if (title === '' || url === '' || description === '' || movieGenre === '') {
            setAreInputsInvalid(true);
            return;
        }
        dispatch({ type: 'ADD_MOVIE', payload: {
            title,
            poster: url,
            description,
            genre_id: movieGenre
        }});
        // return to the MovieList
        backToList();
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES'});
    }, []);

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    id="filled-basic" 
                    label="Movie Title" 
                    variant="filled"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} 
                />
                <br />
                <TextField 
                    id="filled-basic" 
                    label="Poster URL" 
                    variant="outlined"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)} 
                />
                <br />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="select-genre-label-label">
                        Genre
                    </InputLabel>
                    <Select
                    labelId="select-genre-label-label"
                    id="select-genre-label"
                    value={movieGenre}
                    onChange={(event) => setMovieGenre(event.target.value)}
                    displayEmpty
                    className={classes.selectEmpty}
                    >
                        {genres.map((genre, index) => {
                            return (
                                <MenuItem 
                                    key={index} 
                                    value={genre.id}
                                >
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </form>
            <section>
                <br />
                <Button type="button" onClick={backToList} variant="contained" color="secondary">Cancel</Button>
                <Button type="button" onClick={handleSave} variant="contained" color="primary">Save</Button>
            </section>
            {areInputsInvalid ? <p>*Please fill all input fields</p> : ''}
        </div>
    );
}

export default AddMovie;
