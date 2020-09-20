import React, {useState} from 'react';
import ErrorNotice from "../ErrorNotice";
import apiItem from '../../../action/ItemAction';
import { Link } from "react-router-dom";

import {Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Navigation from "../../Layout/Navigation";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

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

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.category,
});


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
    setImage(e.target.files[0])
      setReview(URL.createObjectURL(e.target.files[0]));
  }
  
  const submit = async (e) => {
      e.preventDefault();
      try {
        const data = new FormData();
        data.append("file", image);
        data.append("category", category);
        data.append("name", name);
        data.append("price", price);
        data.append("description", description);
        data.append("quantity", quantity);

        console.log(data)
        await apiItem.newItem(data)
        .then(res => console.log(res.data))
        .catch((err) => console.log(err.response));
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    };
    const categoryItem = [
      { category: 'soap'},
      { category: 'food'},
      { category: 'snack'},
      { category: 'water'},
      { category: 'cofee'},
    ];
  return (
      <div>
         <Navigation />
        <Grid container  spacing={1} justify="center">
        <Grid item md={7} sm={12} xs={12}>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
    <form className={classes.root} onSubmit={submit} noValidate autoComplete="off">
    
        <input
          accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
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
       <Autocomplete
      id="category"
      options={categoryItem}
      getOptionLabel={(option) => option.category}
      filterOptions={filterOptions}
      onInputChange={(event, newInputValue) => {
        setCategory(newInputValue); console.log(newInputValue)
      }}
      style={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="category" variant="filled"/>}
    />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}>Add Item</Button>
    </form>
    </Grid>
    <Grid item md={5} sm={12} xs={12}>
    {review ? (
              <div className="ratio-box">
                <img
                width="600"
                height="450"
                alt="review post"
                  src={review}
                  id="review-post-photo"
                  className="content-ratio-box"
                />
              </div>
            ) : (
              ""
            )}
      </Grid>
    </Grid>
    <Button size="medium" color="primary" variant="contained">
        <Link to="/items/">List Item</Link>
        </Button>
    </div>
  );
}
