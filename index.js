
const express = require('express');
const path = require('path');
const toastr = require('toastr');
const app = express();
const routes = require('./routes/routes');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const middle = require('./auth/middleware.js');

const { use } = require('./routes/routes');
dotenv.config();
app.use(session({ secret: 'aslwezoweasdfasdlkfalksdfhweelaerfcv', resave: false, saveUninitialized: true}));
app.use(require("cookie-parser")());

// ========== middlewares ===========
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// ============= middlewares =========

app.use('/', routes);

app.set('view engine', 'ejs');


app.listen(4000, (err) => {
    if (err) throw err;
    else
    console.log("Server listening on port 4000");
});






