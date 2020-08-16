import MyApp from '../components/MyApp';
import Router from 'next/router';
import firebaseApp from '../components/Firebase/firebase';
import * as ROUTES from '../../src/constants/routes';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
export default function Mypage() {
  const db = firebaseApp.firestore();
  const user = firebaseApp.auth().currentUser;

  if (user != null) {
    console.log(user);
    user.providerData.forEach(function (profile) {
      console.log('Sign-in provider: ' + profile.providerId);
      console.log('  Provider-specific UID: ' + profile.uid);
      console.log('  Name: ' + profile.displayName);
      console.log('  Email: ' + profile.email);
      console.log('  Photo URL: ' + profile.photoURL);
    });

    console.log('login');
  } else {
    console.log('no');
  }

  const signOut = () => {
    const auth = firebaseApp.auth();

    auth
      .signOut()
      .then((signOutUser) => {
        console.log(signOutUser);
        Router.push(ROUTES.LANDING);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MyApp>
      <CssBaseline />
      <Container maxWidth="xs">
        <Typography component="h1" variant="h5" />
        Mypage
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </Container>
    </MyApp>
  );
}
