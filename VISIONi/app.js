const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/equipments', function(req, res){
    res.render('equipments');
});

app.get('/tractors', function(req, res){

    const filePath = path.join(__dirname, 'data', 'tractors.json');
    const tractordata = fs.readFileSync(filePath);
    const storeddata = JSON.parse(tractordata);


    res.render('tractors', {mytrac: storeddata});
})

app.get('/addtractor', function(req, res){
    res.render('addtractor');
})

app.post('/addtractor', function(req, res){
    const tractors = req.body;
    
    const filePath = path.join(__dirname, 'data', 'tractors.json');
    const tractordata = fs.readFileSync(filePath);
    const storeddata = JSON.parse(tractordata);

    storeddata.push(tractors);

    fs.writeFileSync(filePath, JSON.stringify(storeddata));

    res.redirect('/tractors');

});




// MONGOOSE SECTION (Linking the data to database)

try {
    mongouri="mongodb+srv://sabir:sabirlovespython@cluster0.vqbftwc.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect( mongouri, ()=>{
        console.log("mongoose server up and running")
    })
    
} catch (error) {
    console.log(error);
    
}

// SCHEMA
const composeSchema ={
    title:String,
    content:String
}

// CREATING THE COLLECTION 
const post = mongoose.model("blogs",composeSchema);

// compose
app.get("/compose", function(req, res){
    res.render("compose");
  });

app.post("/compose", function(req, res){
    const Post = new post({
        title: req.body.title,
        content: req.body.content
    });

    Post.save();
    res.redirect("/blogs");
})
// Blog page intialization
const bloginfo = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
app.get("/blogs",  function(req, res){
    post.find({},(err,posts) => {
       console.log(posts.title);
        res.render("blogs",{
        initial:bloginfo,
        blogpost:posts
       });

    });
    
  });

// custom post pages

app.get("/blogpost/:Postid" , (req, res) => {
    const reqid = req.params.Postid;
    post.findOne({_id:reqid}, (err,post)=>{
        if(err){
            console.log(err);
        }else{
            res.render("post", {
                title: post.title,
                body: post.content
            });
        }
    });
});





// 

app.listen(3000 , ()=>{
    console.log("server started on port 3000");
});