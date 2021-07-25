import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Details() {

    const useStyles = makeStyles({
        root: {
          maxWidth: 368,
          margin: "auto",
        },
        media: {
          height: 552,
        },
    });

    const classes = useStyles();
    
    const movieDetails = useSelector(store => store.specificMovie);
    const history = useHistory();
    const dispatch = useDispatch();

    // Stores Url Params
    const { movie } = useParams();

    // Get details for movie based on Url Params
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

    // checks if this is the last genre to display
    const isLastGenre = (itemIndex, array) => {
        if (itemIndex === array.length -1) {
            return true;
        }
        else {
            return false;
        }
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
            {/* <h2>Title: {movieDetails[0].title}</h2>
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
            <button type="button" onClick={backToList}>Back to List</button> */}
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={movieDetails[0].poster}
                        title={movieDetails[0].title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            {movieDetails[0].title}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            "{movieDetails[0].description}""
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h4">
                            Genre:
                        {movieDetails.map((genre, index) => {
                            return (
                                <>
                                <span key={index}> {genre.name}</span>
                                {isLastGenre(index, movieDetails) ? <span></span> : <span>, </span>}
                                </>
                            );
                        })}
                        </Typography>
                        <Button variant="contained" onClick={backToList}>
                            Return to Movie List
                        </Button>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default Details;