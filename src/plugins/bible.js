const BCVParser = require('bible-passage-reference-parser/js/en_bcv_parser').bcv_parser
// const BCV = new BCVParser()

function readable (ref) {
  const bcv = new BCVParser().parse(ref)
  // var text = bcv.osis().replace(/(\d+).(\d+)/g, '$1:$2')
  // console.log(text)
  // console.log('bcv', bcv)
  console.log('run readable')
  if (bcv.entities[0].passages[0].start.b === bcv.entities[0].passages[0].end.b) {
    if (bcv.entities[0].passages[0].start.c === bcv.entities[0].passages[0].end.c) {
      if (bcv.entities[0].passages[0].start.v === bcv.entities[0].passages[0].end.v) {
        return bcv.entities[0].passages[0].start.b + ' ' + bcv.entities[0].passages[0].start.c + ':' + bcv.entities[0].passages[0].start.v
      } else {
        return bcv.entities[0].passages[0].start.b + ' ' + bcv.entities[0].passages[0].start.c + ':' + bcv.entities[0].passages[0].start.v + '-' + bcv.entities[0].passages[0].end.v
      }
    } else {
      return bcv.entities[0].passages[0].start.b + ' ' + bcv.entities[0].passages[0].start.c + ':' + bcv.entities[0].passages[0].start.v + '-' + bcv.entities[0].passages[0].end.c + ':' + bcv.entities[0].passages[0].end.v
    }
  } else {
    console.error('Books dont match...')
  }
}

function osis (ref) {
  console.log('run parse osis')
  return new BCVParser().parse(ref).osis()
}

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$bible = {
    bcv: new BCVParser(),
    readable: readable,
    parse: osis
  }
}
