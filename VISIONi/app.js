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
const bloginfo = "Welcome to VISIONi, dedicated to helping farmers succeed. We understand the challenges and hard work that goes into running a farm, and we're here to support you every step of the way. Our services range from providing expert advice on sustainable farming practices, to connecting farmers with local markets to sell their produce. We also offer a variety of resources such as crop planning guides, weather forecasts, and access to the latest agricultural technology. Our goal is to empower farmers with the tools and knowledge they need to thrive in their operations. Join our community of farmers today and start reaping the benefits of our resources and support.";
app.get("/blogs",  function(req, res){
    post.find({},(err,posts) => {
    //    console.log(posts.title);
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