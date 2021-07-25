import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'
import { makeStyles } from '@material-ui/core/styles';

function MovieList() {

    const useStyles = makeStyles({
        root: {
          width: 184,
        },
        media: {
          height: 274,
        },
        addmovie: {
            margin: "0 0 24px 0"
        },
      });

    const classes = useStyles();  

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
        history.push(`/details/${movieId}`);
    }

    const goToAddMovie = () => {
        history.push(`/addmovie`);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.addmovie}
                    onClick={goToAddMovie}
                >
                    Add a Movie
                </Button>
                <Grid 
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    className="movies"
                >
                    {movies.map(movie => {
                        return (
                            <Grid item key={movie.id}>
                                <Card
                                    className={classes.root}
                                    onClick={() => {handleClick(movie.id)}}
                                    variant="outlined"
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={movie.poster}
                                            title={movie.title}
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                component="h2"
                                            >
                                                {movie.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
        </main>

    );
}

export default MovieList;