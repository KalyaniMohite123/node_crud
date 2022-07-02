const express = require('express');
const bodyaParser = require('body-parser')
const mysql = require('mysql')
const ejs = require('ejs');
const app = express();
var path = require('path');


const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_crud'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected');
});

//set views file
app.set('views', path.join(__dirname, 'views'));

//set view engin
app.set('view engine', 'ejs');
app.use(bodyaParser.json());
app.use(bodyaParser.urlencoded({ extended: false }));

app.get('/',(req, res) => {
    let sql = "SELECT * FROM users";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
    // res.send('CRUD Opration using Node.js/ ExpressJS /MYSQL');
    res.render('user_index',{
        title: 'Add Data',
        user : rows
    });
});
});

app.get('/add', (req,res)=> {
    res.render('user_add',{
        title: 'Add Data',
       
});
});

app.post('/save', (req, res) => {
    let data = {name: req.body.name, phone_no: req.body.phone_no, email: req.body.email};
    let sql = "INSERT INTO USERS SET ?";
    let query = connection.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `Select  * from users where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('user_edit', {
            title: 'Add Data',
            user : result[0]
        });
    });
});

app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from users where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
           res.redirect('/');
        });
    });

// app.post('/update', (req, res) => {
//     // let data = {name: req.body.name, email: req.body.email, phone_no: req.body.phone_no};
//     const userId = req.body.id;
//     let sql = "update users SET name='"+req.body.name+"', email='"+req.body.email+"', phone_no='"+req.body.phone_no+"' where id ='"+userId;
//     // let sql = "INSERT INTO USERS SET ?";
//     let query = connection.query(sql,(err, results) => {
//         if(err) throw err;
//         res.redirect('/');
//     });
// });

// app.post('/update', (req, res) => {
    
//     const userId = req.body.id
//     let sql = "update users SET name='"+req.body.name+"', email='"+req.body.email+"', phone_no='"+req.body.phone_no+"' where id="+userId;
//     let query = connection.query(sql,(err, results) => {
//         if(err) throw err;
//         res.redirect('/');
//     });
// });

app.listen(5000, () => {
    console.log(`server is running at port 5000`);
});
// const port = process.env.Port || 5000

// app.use(bodyaParser.urlencoded({ extended: false }))

// app.use(bodyaParser.json())

// //mysql

// //Listen an enviroment port or 5000

// app.listen(port, ()=> console.log(`Listen on port ${port}`))
