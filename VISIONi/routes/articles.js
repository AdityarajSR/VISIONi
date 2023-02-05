const express = require('express');
const Article = require('./../data/article');
const router = express.Router();

router.get("/", function (req, res) {
    res.render("blog");
});

router.get("/newarticle", (req, res)=>{
  res.render("newarticle")
})

router.get('/:id', (req, res)=>{

})

router.post('/articles', async(req, res)=>{
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown 
  })
  
})


module.exports = router