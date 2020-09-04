import React, {useState} from 'react';
import ErrorNotice from "../ErrorNotice";
import apiItem from './../../../action/ItemAction';


import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddItem() {
  const classes = useStyles()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState();
  const [review, setReview] = useState();

    
  const onImageChange = async(e) => {
    e.preventDefault();
      // const data = new FormData();
      // data.append("file", e.target.files[0]);
    setImage(e.target.files[0])
      setReview(URL.createObjectURL(e.target.files[0]));
  }
  const submit = async (e) => {
      e.preventDefault();
      console.log(image)
      try {
        const data = new FormData();
        data.append("file", image);
        data.append("category", category);
        data.append("name", name);
        data.append("price", price);
        data.append("description", description);
        data.append("quantity", quantity);

        await apiItem.newItem(data)
        .then(res => console.log(res.data))
        .catch((err) => console.log(err.response));
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    };

  return (
      <div>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
    <form className={classes.root} onSubmit={submit} noValidate autoComplete="off">
    
        <input
          accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={onImageChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="raised" component="span" className={classes.button}>
            Upload
          </Button>
        </label> 
      <TextField id="name" label="name" variant="filled"
      onChange={(e) => setName(e.target.value)}/>
      <TextField id="description" label="description" variant="filled"
      onChange={(e) => setDescription(e.target.value)}/>
      <TextField id="quantity" label="quantity" variant="filled" 
      onChange={(e) => setQuantity(e.target.value)}/>
      <TextField id="price" label="price" variant="filled" type="number"
      onChange={(e) => setPrice(e.target.value)}/>
      <TextField id="category" label="category" variant="filled" 
      onChange={(e) => setCategory(e.target.value)}/>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}>Add Item</Button>
    </form>
    {review ? (
              <div className="ratio-box">
                <img
                alt="review post"
                  src={review}
                  id="review-post-photo"
                  className="content-ratio-box"
                />
              </div>
            ) : (
              ""
            )}
    </div>
  );
}
