import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
// import Axios from "axios";
import ErrorNotice from "../ErrorNotice";
import apiItem from './../../../action/ItemAction';

import AddIcon from "@material-ui/icons/Add";
import Dropzone from "react-dropzone";
// import Compress from "compress.js";

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
  const [price, setPrice] = useState(0);
  const [error, setError] = useState();

    
  // const onDrop = async(e) => {
  //   e.preventDefault();
  //   const compress = new Compress();
  //   const files = [...e];
  //   compress
  //     .compress(files, {
  //       size: 4,
  //       quality: 0.75,
  //       maxWidth: 1920,
  //       maxHeight: 1000,
  //       resize: true,
  //     })
  // }
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
        .catch((err) => console.log(err.response));
        // history.push("/");
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
    {/* <Dropzone
          onDrop={onDrop}
          multiple={true}
          accept="image/*"
          maxFiles={5}
          maxSize={80000000}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                width: "70px",
                height: "80px",
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <AddIcon />
              Image
            </div>
          )}
        </Dropzone> */}
      <TextField id="name" label="name" variant="filled"
      onChange={(e) => setName(e.target.value)}/>
      <TextField id="description" label="description" variant="filled"
      onChange={(e) => setDescription(e.target.value)}/>
      <TextField id="quantity" label="quantity" variant="filled" 
      onChange={(e) => setQuantity(e.target.value)}/>
      <TextField id="price" label="price" variant="filled" type="number"
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
