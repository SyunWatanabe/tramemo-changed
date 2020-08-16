import MyApp from '../components/MyApp';
import Router from 'next/router';
import firebase from 'firebase/app';
import firebaseApp from '../components/Firebase/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as ROUTES from '../../src/constants/routes';

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
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
        tramemo
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const db = firebaseApp.firestore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  // backdrop open
  const handleOpen = () => {
    setOpen(true);
  };

  // FIXME: not using
  const handleClose = () => {
    setOpen(false);
  };

  const isInvalid = email === '' || password === '';

  const writeUserNameToDB = async (user) => {
    // firestoreにusernameを格納
    db.collection('users').doc(user.uid).set({
      username: user.displayName,
    });

    // 3秒待たないとDBに保存できない
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/mypage',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        const user = authResult.user;
        const isNewUser = authResult.additionalUserInfo.isNewUser;

        if (isNewUser) {
          writeUserNameToDB(user);
        }

        return true;
      },
    },
  };

  const onSubmit = (event) => {
    // backdrop open
    handleOpen();

    const auth = firebaseApp.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        Router.push(ROUTES.MYPAGE);
      })
      .catch((error) => {
        setError(error);
      });
    event.preventDefault();
  };

  return (
    <MyApp>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/* とりあえずエラー置いた、綺麗にする */}
          {error && <p>{error.message}</p>}
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={ROUTES.SIGN_UP} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebaseApp.auth()}
          />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </MyApp>
  );
}
