import React, {useState, useEffect} from 'react';
import apiItem from './../../../action/ItemAction';
import {Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField
} from "@material-ui/core";
import ErrorNotice from "../ErrorNotice";

const useStyles = makeStyles((theme) => ({
  root: {
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

export default function DetailItem(props) {
    const classes = useStyles()

    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");  
    const [error, setError] = useState();
    const [review, setReview] = useState();

    const loadItem = async () => {
      const ItemData = await apiItem.detailItem(props.match.params.name);
      console.log(ItemData.data.data)
      setItems(ItemData.data.data)
    };
  
    useEffect(() => {
      loadItem()
    },[])

    const openDialog = () => {
      setOpen(true);
    }

    const closeDialog = () => {
      setOpen(false);
    }

    const onImageChange = async(e) => {
      e.preventDefault();
      setImage(e.target.files[0])
        setReview(URL.createObjectURL(e.target.files[0]));
    }

    const saveData = async (e) => {
      e.preventDefault();
      console.log(image)
      try {
        const data = new FormData();
        data.append("file", image);
        data.append("category", category);
        data.append("price", price);
        data.append("description", description);
        data.append("quantity", quantity);
        console.log(data)
        await apiItem.editItem(props.match.params.name,data)
        .then(res => console.log(res.data))
        .catch((err) => console.log(err.response));
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    }

  return (
    <div>
      <Grid container  spacing={1} justify="center">
            <Grid item md={12} sm={12} xs={12} className="center">
              <h1>{items.name}</h1>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <h3>price        :  {items.price}</h3>
              <h3>Quantity     :  {items.quantity}</h3>
              <h3>category  :  {items.category}</h3>
              <h3>description  :  {items.description}</h3>
            </Grid>

            <Grid item md={5} sm={12} xs={12}>
            <img
            alt="cover"
            src={items.image}
            style={{
              width: "100%",
              height: 360,
              objectFit: "cover",
              objectPosition: "0 0",
            }}
          />
            </Grid>
            <Grid item md={12} sm={12} xs={12}></Grid>
            <Button size="small" color="primary" onClick={openDialog}>
            Edit Data
          </Button>
      </Grid>
        

      <Dialog
                open={open}
                close={open}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Edit Data </DialogTitle>
                <DialogContent>
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
                    <img
                    width="600"
                    height="450"
                    alt="review post"
                      src={items.image}
                      id="review-post-photo"
                      className="content-ratio-box"
                    />
                  )}
                  {error && (
                      <ErrorNotice message={error} clearError={() => setError(undefined)} />
                  )}
                  <form className={classes.root} onSubmit={saveData} noValidate autoComplete="off">
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
                    <TextField id="description" label="description" variant="filled" rows={5} value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                    <TextField id="quantity" label="quantity" variant="filled"  value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}/>
                    <TextField id="price" label="price" variant="filled" type="number" value={price}
                    onChange={(e) => setPrice(e.target.value)}/>
                    <TextField id="category" label="category" variant="filled" value={category}
                    onChange={(e) => setCategory(e.target.value)}/>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeDialog} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={saveData} color="primary">
                    Save Data
                  </Button>
                </DialogActions>
              </Dialog>
    </div>
  );
}
