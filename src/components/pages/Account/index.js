import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../context/userContext";
import apiUser from '../../../action/UserAction';
import { Grid } from "@material-ui/core";
import Navigation from "./../../Layout/Navigation";
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
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

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

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.gender,
});

export default function Account(props) {
  const classes = useStyles()

    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [openpic, setOpenPic] = useState(false);
    const [image, setImage] = useState(null);
    const [Gender, setGender] = useState("");
    const [Phone, setPhone] = useState(0);
    const [Address, setAddress] = useState("");
    const [Bio, setBio] = useState("");  
    const [error, setError] = useState();
    const [review, setReview] = useState();

    const { userData } = useContext(UserContext);

    const loadUser = async () => {
      const UserData = await apiUser.detailUser(props.match.params.user);
      
      console.log(UserData.data.data)
      setUser(UserData.data.data)
    };
  
    useEffect(() => {
      console.log(props.match.params.user)
      loadUser()
      
    },[])

    const openDialog = () => {
      setOpen(true);
    }

    const closeDialog = () => {
      setOpen(false);
    }

    const openDialogPic = () => {
      setOpenPic(true);
    }

    const closeDialogPic = () => {
      setOpenPic(false);
    }

    const onImageChange = async(e) => {
      e.preventDefault();
      setImage(e.target.files[0])
        setReview(URL.createObjectURL(e.target.files[0]));
    }

    const saveData = async (e) => {
      e.preventDefault();
      try {
        console.log(Phone)
        const usedata = new FormData();
        usedata.append("address", Address);
        usedata.append("gender", Gender);
        usedata.append("phone", Phone);
        usedata.append("bio", Bio);
        console.log(usedata)
        console.log(props.match.params.user)
        await apiUser.editUser(props.match.params.user,usedata)
        // const data = { Address, Bio, Gender, Phone };
        // await apiUser.editUser(props.match.params.user,data)
        .then(res => console.log(res.data))
        .catch((err) => console.log(err.response));
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    };

    const savePic = async (e) => {
      e.preventDefault();
      console.log(image)
      try {
        const data = new FormData();
        data.append("file", image);
        console.log(data)
        await apiUser.editUserPic(props.match.params.user,data)
        .then(res => console.log(res.data))
        .catch((err) => console.log(err.response));
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    };


    const genderUser = [
      { gender: 'Male'},
      { gender: 'Female'},
      { gender: 'Custom'},
      { gender: 'Prefer Not To say'}
    ];
  return (
    <div className="page center">
      <Navigation />
      <Grid container  spacing={1} justify="center">
            <Grid item md={12} sm={12} xs={12} className="center">
              <h1>{user.name}</h1>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <h3>Username        :  {user.username}</h3>
              <h3>E-mail     :  {user.email}</h3>
              <h3>Phone Number  :  {user.phone}</h3>
              <h3>Gender  :  {user.gender}</h3>
              <h3>Address  :  {user.address}</h3>
              <h3>Bio  :  {user.bio}</h3>
            </Grid>

            <Grid item md={5} sm={12} xs={12}>
            <img
            alt="cover"
            src={user.image}
            style={{
              width: "100%",
              height: 360,
              objectFit: "cover",
              objectPosition: "0 0",
            }}
            onClick={openDialogPic}
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
              {error && (
                  <ErrorNotice message={error} clearError={() => setError(undefined)} />
              )}
              <form className={classes.root} onSubmit={saveData} noValidate autoComplete="off">
                <TextField id="Phone" label="Phone" variant="filled" type="number" value={Phone}
                onChange={(e) => setPhone(e.target.value)}/>
                <Autocomplete
                  id="gender"
                  options={genderUser}
                  getOptionLabel={(option) => option.gender}
                  filterOptions={filterOptions}
                  onInputChange={(event, newInputValue) => {
                    setGender(newInputValue); console.log(newInputValue)
                  }}
                  style={{ width: 200 }}
                  renderInput={(params) => <TextField {...params} label="gender" variant="filled"/>} 
                />
                <TextField id="Address" label="Address" variant="filled" rows={5} value={Address}
                onChange={(e) => setAddress(e.target.value)}/>
                <TextField id="Bio" label="Bio" variant="filled"  value={Bio}
                onChange={(e) => setBio(e.target.value)}/>
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


            <Dialog
            open={openpic}
            close={openpic}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Edit Picture </DialogTitle>
            <DialogContent>
              {review ? (
                <div className="ratio-box">
                  <img
                  width="400"
                  height="350"
                  alt="review post"
                    src={review}
                    id="review-post-photo"
                    className="content-ratio-box"
                  />
                </div>
              ) : (
                <img
                width="400"
                height="350"
                alt="review post"
                  src={user.image}
                  id="review-post-photo"
                  className="content-ratio-box"
                />
              )}
              {error && (
                  <ErrorNotice message={error} clearError={() => setError(undefined)} />
              )}
              <form className={classes.root} onSubmit={savePic} noValidate autoComplete="off">
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
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialogPic} color="primary">
                Cancel
              </Button>
              <Button onClick={savePic} color="primary">
                Save Data
              </Button>
            </DialogActions>
            </Dialog>
    </div>
  );
}
