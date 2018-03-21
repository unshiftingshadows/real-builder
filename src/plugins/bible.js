import axios from 'axios'

function get (term, callback) {
  axios.get('https://api.esv.org/v3/passage/text/?q=' + term)
    .then((res) => {
      callback(res.data.passages)
    })
    .catch((err) => {
      console.log(err)
    })
}

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$bible = {
    get: get
  }
}
