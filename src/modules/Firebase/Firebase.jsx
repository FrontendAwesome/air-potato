import firebase from 'firebase';
import config from './config';

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const Firebase = () => (null);

export default Firebase;