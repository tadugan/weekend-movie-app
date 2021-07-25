import { Button, FormControl, TextField } from "@material-ui/core";
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

    return (
        <div>
            <p>Edit Page Content</p>
            <p>Movie ID: {movie}</p>
            <FormControl>
                <TextField
                    id="filled-basic"
                    label="Edit Movie Title"
                    variant="filled"
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={newDescription}
                    onChange={(event) => setNewDescription(event.target.value)}
                />
            </FormControl>
            <br />
            <Button onClick={handleSave}>
                Save
            </Button>
        </div>
    );
}

export default EditPage;