import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function EditPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const currentMovie = useSelector(store => store.specificMovie)
    const { movie } = useParams();
    const [ newTitle, setNewTitle ] = useState(currentMovie[0].title);
    const [ newDescription, setNewDescription] = useState(currentMovie[0].description);

    const handleSave = () => {
        dispatch({ type: 'EDIT_MOVIE', payload: {
            title: newTitle,
            description: newDescription,
            id: movie
        }});
        history.push(`/details/${movie}`);
    }

    const handleCancel = () => {
        history.push(`/details/${movie}`);
    }

    return (
        <div>
            <Grid 
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                    <Grid item>
                        <TextField
                            id="filled-basic"
                            label="Edit Movie Title"
                            variant="filled"
                            value={newTitle}
                            onChange={(event) => setNewTitle(event.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={newDescription}
                            onChange={(event) => setNewDescription(event.target.value)}
                        />
                    </Grid>
                <Grid 
                    item 
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Button onClick={handleCancel} variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSave} variant="contained" color="primary">
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default EditPage;