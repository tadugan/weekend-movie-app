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
import { Button, Grid } from "@material-ui/core";

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
        inputGrid: {
            maxWidth: 244,
            margin: "auto",
          },
        cancel: {
            margin: "0 0 0 12px"
        },
        buttons: {
            margin: "16px 0 0 0"
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
        <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.inputGrid}
        >
            <form className={classes.root} noValidate autoComplete="off">
                <Grid item>
                    <TextField
                        id="filled-basic"
                        label="Movie Title"
                        variant="filled"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="filled-basic"
                        label="Poster URL"
                        variant="outlined"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Grid>
                <Grid item>
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
                </Grid>
            </form>
            <Grid 
                item 
                container
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className={classes.buttons}
            >
                <Grid item>
                    <Button type="button" onClick={backToList} variant="contained" color="secondary" className={classes.cancel}>Cancel</Button>
                </Grid>
                <Grid item>
                    <Button type="button" onClick={handleSave} variant="contained" color="primary">Save</Button>
                </Grid>
            </Grid>
            {areInputsInvalid ? <p>*Please fill all input fields</p> : ''}
        </Grid>
    );
}

export default AddMovie;
