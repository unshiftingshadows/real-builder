import axios from 'axios'
import firebase from 'firebase'

axios.defaults.baseURL = 'https://database.unshiftingshadows.com/builder'
axios.defaults.headers.post['Content-Type'] = 'application/json'

function add (type, data, callback) {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    axios.post('/add', {
      type: type,
      data: data,
      token: idToken
    })
      .then((res) => {
        console.log(res.data)
        callback(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

function list (type, callback) {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    axios.post('/list', {
      type: type,
      token: idToken
    })
      .then((res) => {
        console.log(res.data)
        callback(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

function view (type, id, callback) {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    axios.post('/view', {
      type: type,
      id: id,
      token: idToken
    })
      .then((res) => {
        console.log(res.data)
        callback(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

function search (type, terms, options, callback) {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    axios.post('/search', {
      type: type,
      terms: terms,
      options: options,
      token: idToken
    })
      .then((res) => {
        console.log(res.data)
        callback(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

function bible (ref, callback) {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    axios.post('/bible', {
      ref: ref,
      token: idToken
    })
      .then((res) => {
        console.log(res.data)
        callback(res.data)
      })
      .catch((err) => {
        console.log(err)
        callback()
      })
  })
}

function resources (type, id, callback) {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    axios.post('/resources', {
      type: type,
      id: id,
      token: idToken
    })
      .then((res) => {
        console.log(res.data)
        callback(res.data)
      })
      .catch((err) => {
        console.log(err)
        callback()
      })
  })
}

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$database = {
    add: add,
    list: list,
    view: view,
    search: search,
    bible: bible,
    resources: resources
  }
}
