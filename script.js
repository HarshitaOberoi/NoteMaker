// installed nodemon  express  path http and ejs
// installed cookie parser fro session and cookies
// node script.js then npx nodemon
//map filter forEach find
// async and then..async and await...using .json
/////////////////////////////////////////////////////////////////////
var express = require("express");
var app = express();
app.set("view engine", "ejs");
/////////////////////////////////////////////////////////////////////////
//import path for static page render
var path = require("path");
//file system
var fs = require("fs");

//middleware
//when req is sent ..converted to stram and then at server end converted back to readble format
//for reading json data
app.use(express.json());
//for reading url data
app.use(express.urlencoded({ extended: true }));
//rendering static pages midlleware
app.use(express.static(path.join(__dirname, "public")));
//normal midleware
app.use(function (req, res, next) {
  console.log("Main bhoot hoon");
  next();
});

//routing
app.get("/", function (req, res, next) {
  //yeh readdir ek funtion hai node main inbuilt..fs.readdir(path[, options], callback)...callback <Function>
  // err <Error>
  // files <string[]> | <Buffer[]> |

  //  !!IMPORTANT
  fs.readdir("./files", function (err, files) {
    //yeh ek array data hai files ka uss folder mein
    
    res.render("index", { files: files });
  });
  //{files: files} ek object hai jahan files key ke through, file names ka array view ko pass kiya jata hai jo directory se padha gaya hai.
  
  
  // res.send('hi ji ji'); ...when direct lines to be printed
  // in case of rendering of html pages in form of ejs
  // res.render('index');
});
////////////////////////////////////////////////////////////////////////////
//dynamic routing using /:variable
// app.get('/user/:name',function(req,res,next){
//     // req.params means jo valuue route mein likhi hui hai
//     res.send(`hi ,${req.params.name}`);
//     // concatenate ki jagah backtick quotes ke beech main dynamic value pur krni toh ${}
// });

/////////////////////////////////////////////////////////////////////////////

// app.get('/user/:name/:age',function(req,res,next){
//     // req.params.variablename means jo valuue route mein likhi hui hai
//     res.send(`hi i am  ${req.params.name} of ${req.params.age}`);
//     // concatenate ki jagah backtick quotes ke beech main dynamic value pur krni toh ${}
// });

//////////////////////////////////////////////////////////////////////////////
//error handling..copied from express docs



//  !!IMPORTANT
app.post('/create',function(req,res){
    //This sets up a route to handle POST requests to the /create endpoint.
    //fs.writeFile(path, data, callback)
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
//This takes the title from the request body which is in array formt, splits it by spaces, and joins it back together without spaces to form a valid file name.
//req.body.details:

//This is the content that will be written to the new file, taken from the request body.



        res.redirect('/')
    })
})
// fs.readFile('example.txt', 'utf8', function(err, data) {
app.get('/files/:fileName',function(req,res){
    fs.readFile(`./files/${req.params.fileName}`,'utf-8',function(err,filedata){
        res.render('show',{fileName:req.params.fileName,filedetails:filedata})
    })
})


//editing

app.post('/edit',function(req,res){
    

fs.rename(`./files/${req.body.title}`,`./files/${req.body.newtitle}`,function(err){
    res.redirect('/')                 
})

        
    })

    app.get('/edit/:fileName',function(req,res){
        
            res.render('edit',{fileName:req.params.fileName})
        })
    
    
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5500);
