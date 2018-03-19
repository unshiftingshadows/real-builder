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

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(VueFire)
  Vue.use(VueFirestore)
  Vue.prototype.firebase = {
    auth: fbapp.auth()
  }
}
