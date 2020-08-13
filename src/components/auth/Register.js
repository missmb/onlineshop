import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../pages/ErrorNotice";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Register() {
    const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [username, setUserName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, username };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    // <div className="page">
    //   <h2>Register</h2>
    //   {error && (
    //     <ErrorNotice message={error} clearError={() => setError(undefined)} />
    //   )}
    //   <form className="form" onSubmit={submit}>
    //     <label htmlFor="register-email">Email</label>
    //     <input
    //       id="register-email"
    //       type="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />

    //     <label htmlFor="register-password">Password</label>
    //     <input
    //       id="register-password"
    //       type="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Verify password"
    //       onChange={(e) => setPasswordCheck(e.target.value)}
    //     />

    //     <label htmlFor="register-display-name">Display name</label>
    //     <input
    //       id="register-display-name"
    //       type="text"
    //       onChange={(e) => setDisplayName(e.target.value)}
    //     />

    //     <input type="submit" value="Register" />
    //   </form>
    // </div>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
        <form className={classes.form} onSubmit={submit} noValidate>
              <TextField
                autoComplete="fname"
                margin="normal"
                name="register-display-name"
                variant="outlined"
                required
                fullWidth
                id="register-display-name"
                label="Username"
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="register-email"
                label="Email Address"
                name="register-email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="register-password"
                label="Password"
                type="password"
                id="register-password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
             <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Verify password"
                label="Verify password"
                type="password"
                id="Verify password"
                autoComplete="current-password"
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
