import * as firebase from "firebase";
// console.log(firebase)
var firebaseConfig = {
  apiKey: "AIzaSyAahBGDRoXgCyQtUK3QT3O-eZyTQ2GbovY",
  authDomain: "todoapp-e4deb.firebaseapp.com",
  databaseURL: "https://todoapp-e4deb.firebaseio.com",
  projectId: "todoapp-e4deb",
  storageBucket: "todoapp-e4deb.appspot.com",
  messagingSenderId: "17122493929",
  appId: "1:17122493929:web:31350109eac22d97e47778",
  measurementId: "G-FS2LBQDXX0"
};
firebase.initializeApp(firebaseConfig);

//update firestore settings
// firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase
