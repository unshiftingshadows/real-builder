import firebase from 'firebase'
require('firebase/firestore')
import VueFire from 'vuefire'
import VueFirestore from 'vue-firestore'

const fbapp = firebase.initializeApp({
  apiKey: 'AIzaSyDq2zYerR8CLzwMZxUTa-3VG2o0RDLDHjo',
  authDomain: 'real-curriculum-builder.firebaseapp.com',
  databaseURL: 'https://real-curriculum-builder.firebaseio.com',
  projectId: 'real-curriculum-builder',
  storageBucket: 'real-curriculum-builder.appspot.com',
  messagingSenderId: '644396278678'
})

function dbref (type, selection, id) {
  var cur = type.charAt(0)
  var media = type.slice(1)
  return fbapp.database().ref(cur + '/' + media + 's/' + id + '/' + selection)
}

function user (uid) {
  if (uid) {
    console.log('valid uid', uid)
    return fbapp.database().ref('/users/' + uid)
  } else {
    return fbapp.database().ref('/users/' + fbapp.auth().currentUser.uid)
  }
}

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(VueFire)
  Vue.use(VueFirestore)
  Vue.prototype.$firebase = {
    auth: fbapp.auth(),
    db: fbapp.database(),
    ref: dbref,
    user: user,
    imagesRef: fbapp.storage().ref('images')
  }
}
