var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// ---->>> SET UP MULTER AND LOCAL STORAGE <<<-----
var multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/images',
  filename(req, file, cb){
    cb(null, `${file.originalname}`);
  }
});
const upload = multer({ storage });
// ---->>> END SET UP MULTER <<<-----

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/bookshop');
mongoose.connect('mongodb://testUser:test@ds135926.mlab.com:35926/bookshop', {useMongeClient:true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// ---->>> SET UP SESSIONS <<<-----
app.use(session({
    secret: 'mySecretKeyAhihi',
    saveUninitialized: false,
    resave: false,
    cookie:{maxAge: 1000 * 60 * 60 * 24 * 2},
    //time to live: 2 days
    store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

// SAVE SESSION CART API
app.post('/cart', (req, res) => {
    var cart = req.body;
    req.session.cart = cart;
    req.session.save((err) => {
        if(err) throw err;
        res.json(req.session.cart);
    })
});
//GET SESSION CART API
app.get('/cart', function(req, res){
    if(typeof req.session.cart !== 'undefined'){
        res.json(req.session.cart);
    }
});

// ---->>> END SESSION SET UP <<<------

var Books = require('./models/books');

//---->>> POST BOOKS <<<-----
app.post('/books', function(req, res){
  var book = req.body;
  Books.create(book, function(err, books){
    if(err) throw err;
    res.json(books);
  })
});

//---->>> GET BOOKS <<<-----
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err) throw err;
    res.json(books);
  })
});

//---->>> DELETE BOOKS <<<-----
app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};
  Books.remove(query, function(err, books){
    if(err) throw err;
    res.json(books);
  })
});

//---->>> UPDATE BOOKS <<<-----
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = {_id: req.params._id};
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set' : {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  var options = {upsert: true};
  Books.findOneAndUpdate(query, update, options, function(err, books){
    if(err) throw err;
    res.json(books);
  })
});

// ---->>> GET BOOKS IMAGES API <<<-----
app.get('/images', function(req,res){
    const imgFolder = __dirname + '/public/images/';
    const fs = require('fs');
    fs.readdir(imgFolder, function(err, files){
        if(err) return console.log(err);
        const filesArr = [];
        files.forEach(function(file){
            filesArr.push({name: file});
        });
        res.json(filesArr);
    })
})

// ---->>> UPLOAD IMAGE API <<<-----
app.post('/uploadimage', upload.single('file'), function(req, res){
  res.send('UPLOAD_SUCCESSFULLY');
})

// ---->>> DOWNLOAD IMAGE API <<<-----
app.get('/downloadimage', function(req,res){
  let file = __dirname + '/public/images/img1.jpg';
  res.download(file, function(err){
    if(err) console.log(err);
    else console.log("Success");
  });
})


// END APIs
const port = process.env.PORT || 3001;

app.listen(port, function(err){
    if(err) {
        return console.log(err);
    }
    //console.log('API Server is listenning on http://localhost:3001');
});