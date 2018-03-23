const bibleBooks = {
  'Genesis': 'Genesis',
  'Gen': 'Genesis',
  'Ge': 'Genesis',
  'Gn': 'Genesis',
  'Exodus': 'Exodus',
  'Exo': 'Exodus',
  'Ex': 'Exodus',
  'Exod': 'Exodus',
  'Leviticus': 'Leviticus',
  'Lev': 'Leviticus',
  'Le': 'Leviticus',
  'Lv': 'Leviticus',
  'Numbers': 'Numbers',
  'Num': 'Numbers',
  'Nu': 'Numbers',
  'Nm': 'Numbers',
  'Nb': 'Numbers',
  'Deuteronomy': 'Deuteronomy',
  'Deut': 'Deuteronomy',
  'Dt': 'Deuteronomy',
  'Joshua': 'Joshua',
  'Josh': 'Joshua',
  'Jos': 'Joshua',
  'Jsh': 'Joshua',
  'Judges': 'Judges',
  'Judg': 'Judges',
  'Jdg': 'Judges',
  'Jg': 'Judges',
  'Jdgs': 'Judges',
  'Ruth': 'Ruth',
  'Rth': 'Ruth',
  'Ru': 'Ruth',
  '1 Samuel': '1 Samuel',
  '1 Sam': '1 Samuel',
  '1 Sa': '1 Samuel',
  '1Samuel': '1 Samuel',
  '1S': '1 Samuel',
  'I Sa': '1 Samuel',
  '1 Sm': '1 Samuel',
  '1Sa': '1 Samuel',
  'I Sam': '1 Samuel',
  '1Sam': '1 Samuel',
  'I Samuel': '1 Samuel',
  '1st Samuel': '1 Samuel',
  'First Samuel': '1 Samuel',
  '2 Samuel': '2 Samuel',
  '2 Sam': '2 Samuel',
  '2 Sa': '2 Samuel',
  '2S': '2 Samuel',
  'II Sa': '2 Samuel',
  '2 Sm': '2 Samuel',
  '2Sa': '2 Samuel',
  'II Sam': '2 Samuel',
  '2Sam': '2 Samuel',
  'II Samuel': '2 Samuel',
  '2Samuel': '2 Samuel',
  '2nd Samuel': '2 Samuel',
  'Second Samuel': '2 Samuel',
  '1 Kings': '1 Kings',
  '1 Kgs': '1 Kings',
  '1 Ki': '1 Kings',
  '1K': '1 Kings',
  'I Kgs': '1 Kings',
  '1Kgs': '1 Kings',
  'I Ki': '1 Kings',
  '1Ki': '1 Kings',
  'I Kings': '1 Kings',
  '1Kings': '1 Kings',
  '1st Kgs': '1 Kings',
  '1st Kings': '1 Kings',
  'First Kings': '1 Kings',
  'First Kgs': '1 Kings',
  '1Kin': '1 Kings',
  '2 Kings': '2 Kings',
  '2 Kgs': '2 Kings',
  '2 Ki': '2 Kings',
  '2K': '2 Kings',
  'II Kgs': '2 Kings',
  '2Kgs': '2 Kings',
  'II Ki': '2 Kings',
  '2Ki': '2 Kings',
  'II Kings': '2 Kings',
  '2Kings': '2 Kings',
  '2nd Kgs': '2 Kings',
  '2nd Kings': '2 Kings',
  'Second Kings': '2 Kings',
  'Second Kgs': '2 Kings',
  '2Kin': '2 Kings',
  '1 Chronicles': '1 Chronicles',
  '1 Chron': '1 Chronicles',
  '1 Ch': '1 Chronicles',
  'I Ch': '1 Chronicles',
  '1Ch': '1 Chronicles',
  '1 Chr': '1 Chronicles',
  'I Chr': '1 Chronicles',
  '1Chr': '1 Chronicles',
  'I Chron': '1 Chronicles',
  '1Chron': '1 Chronicles',
  'I Chronicles': '1 Chronicles',
  '1Chronicles': '1 Chronicles',
  '1st Chronicles': '1 Chronicles',
  'First Chronicles': '1 Chronicles',
  '2 Chronicles': '2 Chronicles',
  '2 Chron': '2 Chronicles',
  '2 Ch': '2 Chronicles',
  'II Ch': '2 Chronicles',
  '2Ch': '2 Chronicles',
  'II Chr': '2 Chronicles',
  '2Chr': '2 Chronicles',
  'II Chron': '2 Chronicles',
  '2Chron': '2 Chronicles',
  'II Chronicles': '2 Chronicles',
  '2Chronicles': '2 Chronicles',
  '2nd Chronicles': '2 Chronicles',
  'Second Chronicles': '2 Chronicles',
  'Ezra': 'Ezra',
  'Ezr': 'Ezra',
  'Nehemiah': 'Nehemiah',
  'Neh': 'Nehemiah',
  'Ne': 'Nehemiah',
  'Esther': 'Esther',
  'Esth': 'Esther',
  'Es': 'Esther',
  'Job': 'Job',
  'Jb': 'Job',
  'Psalm': 'Psalm',
  'Pslm': 'Psalm',
  'Ps': 'Psalm',
  'Psalms': 'Psalm',
  'Psa': 'Psalm',
  'Psm': 'Psalm',
  'Pss': 'Psalm',
  'Proverbs': 'Proverbs',
  'Prov': 'Proverbs',
  'Pr': 'Proverbs',
  'Prv': 'Proverbs',
  'Ecclesiastes': 'Ecclesiastes',
  'Eccles': 'Ecclesiastes',
  'Ec': 'Ecclesiastes',
  'Ecc': 'Ecclesiastes',
  'Qoh': 'Ecclesiastes',
  'Qoheleth': 'Ecclesiastes',
  'Song of Solomon': 'Song of Solomon',
  'Song': 'Song of Solomon',
  'So': 'Song of Solomon',
  'Canticle of Canticles': 'Song of Solomon',
  'Canticles': 'Song of Solomon',
  'Song of Songs': 'Song of Solomon',
  'SOS': 'Song of Solomon',
  'Isaiah': 'Isaiah',
  'Isa': 'Isaiah',
  'Is': 'Isaiah',
  'Jeremiah': 'Jeremiah',
  'Jer': 'Jeremiah',
  'Je': 'Jeremiah',
  'Jr': 'Jeremiah',
  'Lamentations': 'Lamentations',
  'Lam': 'Lamentations',
  'La': 'Lamentations',
  'Ezekiel': 'Ezekiel',
  'Ezek': 'Ezekiel',
  'Eze': 'Ezekiel',
  'Ezk': 'Ezekiel',
  'Daniel': 'Daniel',
  'Dan': 'Daniel',
  'Da': 'Daniel',
  'Dn': 'Daniel',
  'Hosea': 'Hosea',
  'Hos': 'Hosea',
  'Ho': 'Hosea',
  'Joel': 'Joel',
  'Joe': 'Joel',
  'Jl': 'Joel',
  'Amos': 'Amos',
  'Am': 'Amos',
  'Obadiah': 'Obadiah',
  'Obad': 'Obadiah',
  'Ob': 'Obadiah',
  'Jonah': 'Jonah',
  'Jnh': 'Jonah',
  'Jon': 'Jonah',
  'Micah': 'Micah',
  'Mic': 'Micah',
  'Nahum': 'Nahum',
  'Nah': 'Nahum',
  'Na': 'Nahum',
  'Habakkuk': 'Habakkuk',
  'Hab': 'Habakkuk',
  'Zephaniah': 'Zephaniah',
  'Zeph': 'Zephaniah',
  'Zep': 'Zephaniah',
  'Zp': 'Zephaniah',
  'Haggai': 'Haggai',
  'Hag': 'Haggai',
  'Hg': 'Haggai',
  'Zechariah': 'Zechariah',
  'Zech': 'Zechariah',
  'Zec': 'Zechariah',
  'Zc': 'Zechariah',
  'Malachi': 'Malachi',
  'Mal': 'Malachi',
  'Ml': 'Malachi',
  'Tobit': 'Tobit',
  'Tob': 'Tobit',
  'Tb': 'Tobit',
  'Judith': 'Judith',
  'Jdth': 'Judith',
  'Jdt': 'Judith',
  'Jth': 'Judith',
  'Additions to Esther': 'Additions to Esther',
  'Add Esth': 'Additions to Esther',
  'Add Es': 'Additions to Esther',
  'Rest of Esther': 'Additions to Esther',
  'The Rest of Esther': 'Additions to Esther',
  'AEs': 'Additions to Esther',
  'AddEsth': 'Additions to Esther',
  'Wisdom of Solomon': 'Wisdom of Solomon',
  'Wisd of Sol': 'Wisdom of Solomon',
  'Wis': 'Wisdom of Solomon',
  'Ws': 'Wisdom of Solomon',
  'Wisdom': 'Wisdom of Solomon',
  'Sirach': 'Sirach',
  'Sir': 'Sirach',
  'Ecclesiasticus': 'Sirach',
  'Ecclus': 'Sirach',
  'Baruch': 'Baruch',
  'Bar': 'Baruch',
  'Letter of Jeremiah': 'Letter of Jeremiah',
  'Let Jer': 'Letter of Jeremiah',
  'LJe': 'Letter of Jeremiah',
  'Ltr Jer': 'Letter of Jeremiah',
  'Song of Three Youths': 'Song of Three Youths',
  'Song of Three': 'Song of Three Youths',
  'Song Thr': 'Song of Three Youths',
  'The Song of Three Youths': 'Song of Three Youths',
  'Pr Az': 'Song of Three Youths',
  'Prayer of Azariah': 'Song of Three Youths',
  'Azariah': 'Song of Three Youths',
  'The Song of the Three Holy Children': 'Song of Three Youths',
  'The Song of Three Jews': 'Song of Three Youths',
  'Song of the Three Holy Children': 'Song of Three Youths',
  'Song of Thr': 'Song of Three Youths',
  'Song of Three Children': 'Song of Three Youths',
  'Song of Three Jews': 'Song of Three Youths',
  'Susanna': 'Susanna',
  'Sus': 'Susanna',
  'Bel and the Dragon': 'Bel and the Dragon',
  'Bel': 'Bel and the Dragon',
  '1 Maccabees': '1 Maccabees',
  '1 Macc': '1 Maccabees',
  '1 Mac': '1 Maccabees',
  '1M': '1 Maccabees',
  'I Ma': '1 Maccabees',
  '1Ma': '1 Maccabees',
  'I Mac': '1 Maccabees',
  '1Mac': '1 Maccabees',
  'I Macc': '1 Maccabees',
  '1Macc': '1 Maccabees',
  'I Maccabees': '1 Maccabees',
  '1Maccabees': '1 Maccabees',
  '1st Maccabees': '1 Maccabees',
  'First Maccabees': '1 Maccabees',
  '2 Maccabees': '2 Maccabees',
  '2 Macc': '2 Maccabees',
  '2 Mac': '2 Maccabees',
  '2M': '2 Maccabees',
  'II Ma': '2 Maccabees',
  '2Ma': '2 Maccabees',
  'II Mac': '2 Maccabees',
  '2Mac': '2 Maccabees',
  'II Macc': '2 Maccabees',
  '2Macc': '2 Maccabees',
  'II Maccabees': '2 Maccabees',
  '2Maccabees': '2 Maccabees',
  '2nd Maccabees': '2 Maccabees',
  'Second Maccabees': '2 Maccabees',
  '1 Esdras': '1 Esdras',
  '1 Esdr': '1 Esdras',
  '1 Esd': '1 Esdras',
  'I Es': '1 Esdras',
  '1Es': '1 Esdras',
  'I Esd': '1 Esdras',
  '1Esd': '1 Esdras',
  'I Esdr': '1 Esdras',
  '1Esdr': '1 Esdras',
  'I Esdras': '1 Esdras',
  '1Esdras': '1 Esdras',
  '1st Esdras': '1 Esdras',
  'First Esdras': '1 Esdras',
  'Prayer of Manasseh': 'Prayer of Manasseh',
  'Pr of Man': 'Prayer of Manasseh',
  'Pr Man': 'Prayer of Manasseh',
  'PMa': 'Prayer of Manasseh',
  'Prayer of Manasses': 'Prayer of Manasseh',
  'Additional Psalm': 'Additional Psalm',
  'Add Psalm': 'Additional Psalm',
  'Add Ps': 'Additional Psalm',
  '3 Maccabees': '3 Maccabees',
  '3 Macc': '3 Maccabees',
  '3 Mac': '3 Maccabees',
  'III Ma': '3 Maccabees',
  '3Ma': '3 Maccabees',
  'III Mac': '3 Maccabees',
  '3Mac': '3 Maccabees',
  'III Macc': '3 Maccabees',
  '3Macc': '3 Maccabees',
  'III Maccabees': '3 Maccabees',
  '3rd Maccabees': '3 Maccabees',
  'Third Maccabees': '3 Maccabees',
  '2 Esdras': '2 Esdras',
  '2 Esdr': '2 Esdras',
  '2 Esd': '2 Esdras',
  'II Es': '2 Esdras',
  '2Es': '2 Esdras',
  'II Esd': '2 Esdras',
  '2Esd': '2 Esdras',
  'II Esdr': '2 Esdras',
  '2Esdr': '2 Esdras',
  'II Esdras': '2 Esdras',
  '2Esdras': '2 Esdras',
  '2nd Esdras': '2 Esdras',
  'Second Esdras': '2 Esdras',
  '4 Maccabees': '4 Maccabees',
  '4 Macc': '4 Maccabees',
  '4 Mac': '4 Maccabees',
  'IV Ma': '4 Maccabees',
  '4Ma': '4 Maccabees',
  'IV Mac': '4 Maccabees',
  '4Mac': '4 Maccabees',
  'IV Macc': '4 Maccabees',
  '4Macc': '4 Maccabees',
  'IV Maccabees': '4 Maccabees',
  'IIII Maccabees': '4 Maccabees',
  '4Maccabees': '4 Maccabees',
  '4th Maccabees': '4 Maccabees',
  'Fourth Maccabees': '4 Maccabees',
  'Ode': 'Ode',
  'Psalms of Solomon': 'Psalms of Solomon',
  'Ps Solomon': 'Psalms of Solomon',
  'Ps Sol': 'Psalms of Solomon',
  'Psalms Solomon': 'Psalms of Solomon',
  'PsSol': 'Psalms of Solomon',
  'Epistle to the Laodiceans': 'Epistle to the Laodiceans',
  'Laodiceans': 'Epistle to the Laodiceans',
  'Laod': 'Epistle to the Laodiceans',
  'Ep Laod': 'Epistle to the Laodiceans',
  'Epist Laodiceans': 'Epistle to the Laodiceans',
  'Epistle Laodiceans': 'Epistle to the Laodiceans',
  'Epistle to Laodiceans': 'Epistle to the Laodiceans',
  'Matthew': 'Matthew',
  'Matt': 'Matthew',
  'Mt': 'Matthew',
  'Mark': 'Mark',
  'Mrk': 'Mark',
  'Mk': 'Mark',
  'Mr': 'Mark',
  'Luke': 'Luke',
  'Luk': 'Luke',
  'Lk': 'Luke',
  'John': 'John',
  'Jn': 'John',
  'Jhn': 'John',
  'Acts': 'Acts',
  'Ac': 'Acts',
  'Romans': 'Romans',
  'Rom': 'Romans',
  'Ro': 'Romans',
  'Rm': 'Romans',
  '1 Corinthians': '1 Corinthians',
  '1 Cor': '1 Corinthians',
  '1 Co': '1 Corinthians',
  'I Co': '1 Corinthians',
  '1Co': '1 Corinthians',
  'I Cor': '1 Corinthians',
  '1Cor': '1 Corinthians',
  'I Corinthians': '1 Corinthians',
  '1Corinthians': '1 Corinthians',
  '1st Corinthians': '1 Corinthians',
  'First Corinthians': '1 Corinthians',
  '2 Corinthians': '2 Corinthians',
  '2 Cor': '2 Corinthians',
  '2 Co': '2 Corinthians',
  'II Co': '2 Corinthians',
  '2Co': '2 Corinthians',
  'II Cor': '2 Corinthians',
  '2Cor': '2 Corinthians',
  'II Corinthians': '2 Corinthians',
  '2Corinthians': '2 Corinthians',
  '2nd Corinthians': '2 Corinthians',
  'Second Corinthians': '2 Corinthians',
  'Galatians': 'Galatians',
  'Gal': 'Galatians',
  'Ga': 'Galatians',
  'Ephesians': 'Ephesians',
  'Ephes': 'Ephesians',
  'Eph': 'Ephesians',
  'Philippians': 'Philippians',
  'Phil': 'Philippians',
  'Php': 'Philippians',
  'Colossians': 'Colossians',
  'Col': 'Colossians',
  '1 Thessalonians': '1 Thessalonians',
  '1 Thess': '1 Thessalonians',
  '1 Th': '1 Thessalonians',
  'I Th': '1 Thessalonians',
  '1Th': '1 Thessalonians',
  'I Thes': '1 Thessalonians',
  '1Thes': '1 Thessalonians',
  'I Thess': '1 Thessalonians',
  '1Thess': '1 Thessalonians',
  'I Thessalonians': '1 Thessalonians',
  '1Thessalonians': '1 Thessalonians',
  '1st Thessalonians': '1 Thessalonians',
  'First Thessalonians': '1 Thessalonians',
  '2 Thessalonians': '2 Thessalonians',
  '2 Thess': '2 Thessalonians',
  '2 Th': '2 Thessalonians',
  'II Th': '2 Thessalonians',
  '2Th': '2 Thessalonians',
  'II Thes': '2 Thessalonians',
  '2Thes': '2 Thessalonians',
  'II Thess': '2 Thessalonians',
  '2Thess': '2 Thessalonians',
  'II Thessalonians': '2 Thessalonians',
  '2Thessalonians': '2 Thessalonians',
  '2nd Thessalonians': '2 Thessalonians',
  'Second Thessalonians': '2 Thessalonians',
  '1 Timothy': '1 Timothy',
  '1 Tim': '1 Timothy',
  '1 Ti': '1 Timothy',
  'I Ti': '1 Timothy',
  '1Ti': '1 Timothy',
  'I Tim': '1 Timothy',
  '1Tim': '1 Timothy',
  'I Timothy': '1 Timothy',
  '1Timothy': '1 Timothy',
  '1st Timothy': '1 Timothy',
  'First Timothy': '1 Timothy',
  '2 Timothy': '2 Timothy',
  '2 Tim': '2 Timothy',
  '2 Ti': '2 Timothy',
  'II Ti': '2 Timothy',
  '2Ti': '2 Timothy',
  'II Tim': '2 Timothy',
  '2Tim': '2 Timothy',
  'II Timothy': '2 Timothy',
  '2Timothy': '2 Timothy',
  '2nd Timothy': '2 Timothy',
  'Second Timothy': '2 Timothy',
  'Titus': 'Titus',
  'Tit': 'Titus',
  'Philemon': 'Philemon',
  'Philem': 'Philemon',
  'Phm': 'Philemon',
  'Hebrews': 'Hebrews',
  'Heb': 'Hebrews',
  'James': 'James',
  'Jas': 'James',
  'Jm': 'James',
  '1 Peter': '1 Peter',
  '1 Pet': '1 Peter',
  '1 Pe': '1 Peter',
  '1Pe': '1 Peter',
  'I Pet': '1 Peter',
  '1Pet': '1 Peter',
  'I Pt': '1 Peter',
  '1 Pt': '1 Peter',
  '1Pt': '1 Peter',
  'I Peter': '1 Peter',
  '1Peter': '1 Peter',
  '1st Peter': '1 Peter',
  'First Peter': '1 Peter',
  '2 Peter': '2 Peter',
  '2 Pet': '2 Peter',
  '2 Pe': '2 Peter',
  'II Pe': '2 Peter',
  '2Pe': '2 Peter',
  'II Pet': '2 Peter',
  '2Pet': '2 Peter',
  'II Pt': '2 Peter',
  '2 Pt': '2 Peter',
  '2Pt': '2 Peter',
  'II Peter': '2 Peter',
  '2Peter': '2 Peter',
  '2nd Peter': '2 Peter',
  'Second Peter': '2 Peter',
  '1 John': '1 John',
  '1 Jn': '1 John',
  'I Jn': '1 John',
  '1Jn': '1 John',
  'I Jo': '1 John',
  '1Jo': '1 John',
  'I Joh': '1 John',
  '1Joh': '1 John',
  'I Jhn': '1 John',
  '1 Jhn': '1 John',
  '1Jhn': '1 John',
  'I John': '1 John',
  '1John': '1 John',
  '1st John': '1 John',
  'First John': '1 John',
  '2 John': '2 John',
  '2 Jn': '2 John',
  'II Jn': '2 John',
  '2Jn': '2 John',
  'II Jo': '2 John',
  '2Jo': '2 John',
  'II Joh': '2 John',
  '2Joh': '2 John',
  'II Jhn': '2 John',
  '2 Jhn': '2 John',
  '2Jhn': '2 John',
  'II John': '2 John',
  '2John': '2 John',
  '2nd John': '2 John',
  'Second John': '2 John',
  '3 John': '3 John',
  '3 Jn': '3 John',
  'III Jn': '3 John',
  '3Jn': '3 John',
  'III Jo': '3 John',
  '3Jo': '3 John',
  'III Joh': '3 John',
  '3Joh': '3 John',
  'III Jhn': '3 John',
  '3 Jhn': '3 John',
  '3Jhn': '3 John',
  'III John': '3 John',
  '3John': '3 John',
  '3rd John': '3 John',
  'Third John': '3 John',
  'Jude': 'Jude',
  'Jud': 'Jude',
  'Revelation': 'Revelation',
  'Rev': 'Revelation',
  'Re': 'Revelation',
  'The Revelation': 'Revelation'
}

export const getBibleBook = (book) => {
  return bibleBooks[book]
}

export const parseBibleRef = (ref) => {
  // Mark reference type:
  //    - single (one verse)
  //    - simpleRange (range from a single chapter)
  //    - complexRange (range from multiple chapters)
  // Parse chapter from verse
  var full = ref.split(' ')
  var cv

  var reference = {}

  if (full.length > 2) {
    cv = full.pop().split(':')
    reference.book = getBibleBook(full.join(' '))
  } else if (full.length === 2) {
    reference.book = getBibleBook(full[0])
    cv = full[1].split(':')
  } else {
    console.error('parseBibleRef - too few pieces')
    return false
  }

  if (cv.length === 3) {
    // Handle range over multiple chapters
    var ch1 = parseInt(cv[0])
    var mid = cv[1].split('-')
    var ch2 = parseInt(mid[1])
    var v1 = parseInt(mid[0])
    var v2 = parseInt(cv[2])
    reference.type = 'complexRange'
    reference.chapter = ch1
    reference.verse = v1
    reference.chapterr = ch2
    reference.verser = v2
  } else if (cv.length === 2) {
    var verse = cv[1].split('-')
    if (verse.length === 2) {
      // Handle range of verses
      reference.type = 'simpleRange'
      reference.chapter = parseInt(cv[0])
      reference.verse = parseInt(verse[0])
      reference.verser = parseInt(verse[1])
    } else if (verse.length === 1) {
      reference.type = 'single'
      reference.chapter = parseInt(cv[0])
      reference.verse = parseInt(verse[0])
    } else {
      // NOTE: Error...
      console.error('parseBibleRef - split more than 2')
    }
  } else {
    // NOTE: Error...
    console.error('parseBibleRef - split more than 3')
  }

  return reference
}

export const stringBibleRef = (ref) => {
  if (ref.type === 'single') {
    return ref.book + ' ' + ref.chapter + ':' + ref.verse
  } else if (ref.type === 'simpleRange') {
    return ref.book + ' ' + ref.chapter + ':' + ref.verse + '-' + ref.verser
  } else if (ref.type === 'complexRange') {
    return ref.book + ' ' + ref.chapter + ':' + ref.verse + '-' + ref.chapterr + ':' + ref.verser
  } else {
    return false
  }
}

const bookValidate = (book) => {
  console.log('bookValidate')
  if (book in bibleBooks) {
    return true
  } else {
    return false
  }
}

export const refValidate = (ref) => {
  var full = ref.split(' ')

  var isValidRef = true
  var isValidBook = false

  var fullLen = full.length
  var rangeLen
  var passageLen

  if (fullLen === 2) {
    isValidBook = bookValidate(full[0])
    rangeLen = full[1].split(':').length
    passageLen = full[1].split(':')[1].split('-').length
  } else {
    var numRef = full.pop()
    isValidBook = bookValidate(full.join(' '))
    rangeLen = numRef.split(':').length
    passageLen = numRef.split(':')[1].split('-').length
  }

  if (rangeLen > 3 || (rangeLen <= 3 && passageLen > 2)) {
    isValidRef = false
  }

  if (isValidRef && isValidBook) {
    return true
  } else {
    return false
  }
}