import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDjcs6U7KoMOPphJp6QuKlffm5DVHnPmfU',
//   authDomain: 'fir-3f6d7.firebaseapp.com',
//   projectId: 'fir-3f6d7',
//   storageBucket: 'fir-3f6d7.appspot.com',
//   messagingSenderId: '813216354966',
//   appId: '1:813216354966:web:3b86109b66760b3aa968b7',
//   measurementId: 'G-P7V7LR3NVY',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAtNBN4BY-n1ft4dX0fwj52SNZUqU-0D9A',
  authDomain: 'clone-nam.firebaseapp.com',
  projectId: 'youtube-clone-nam',
  storageBucket: 'youtube-clone-nam.appspot.com',
  messagingSenderId: '387121722567',
  appId: '1:387121722567:web:35f4f0a78520da16e83ae2',
  measurementId: 'G-RRL2S90EDD',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
