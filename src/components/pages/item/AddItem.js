import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
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
    const history = useHistory();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [error, setError] = useState();

    
    const submit = async (e) => {
        e.preventDefault();
        try {
          const data = {  name, category, image, price, description, quantity };
          // await Axios.post('http://localhost:5000/items/add', data)
          // .then(res => console.log(res.data))
          // .catch((err) => console.log(err.response));
          // console.log(data)
          // await apiItem.newItem(data);
          await apiItem.newItem(data)
          .then(res => console.log(res.data))
          history.push("/");
        } catch (err) {
          err.response.data.msg && setError(err.response.data.msg);
        }
      };

  return (
      <div>
    <ErrorNotice message={error} clearError={() => setError(undefined)} />
    <form className={classes.root} onSubmit={submit} noValidate autoComplete="off">
      <TextField id="name" label="name" variant="filled" name="name"
      onChange={(e) => setName(e.target.value)}/>
      <TextField id="description" label="description" variant="filled" name="description"
      onChange={(e) => setDescription(e.target.value)}/>
      <TextField id="quantity" label="quantity" variant="filled" 
      onChange={(e) => setQuantity(e.target.value)}/>
      <TextField id="price" label="price" variant="filled" 
      onChange={(e) => setPrice(e.target.value)}/>
      <TextField id="image" label="image" variant="filled" 
      onChange={(e) => setImage(e.target.value)}/>
      <TextField id="category" label="category" variant="filled" 
      onChange={(e) => setCategory(e.target.value)}/>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}>Add Item</Button>
    </form>
    </div>
  );
}
