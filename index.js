import express from "express";

import * as fs from "fs";
import bodyParser from "body-parser";

import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 6969;

app.use(bodyParser.urlencoded({extended: true}));



let allPosts = [];
function addPost(data){
    allPosts.push(data);
}


app.use(express.static("public"));
app.get("/", (req, res)=>{
    res.render("index.ejs", {
        post: allPosts
    });

})
app.post("/operation", (req, res)=>{
    
    if(req.body["create"]){
        
        res.render("create_post.ejs");
    }else{
        res.render("delete_post.ejs", {
            post:allPosts,
        });
    }
});



let cnt1= 0;
app.post("/create-post", (req, res) => {
    addPost(req.body);
    res.render("index.ejs", {
        post: allPosts,
    });

    allPosts[cnt1]["blogNo"] = cnt1;
    blogNumbers.push(cnt1);

    let fileContent = `
    <%-include("partials/header.ejs")%>
    <div class="big-wrap">
        <div class="post-container">
            <a href="/" class="back-btn">Back to Homepage</a> 
            <h1>${allPosts[cnt1]["postTitle"]}</h1>
            ${allPosts[cnt1]["postDesc"]}
            <span class="post-author">By ${allPosts[cnt1]["author"]}</span>
            <hr>
            <p class="main-content">${allPosts[cnt1]["postContent"]}</p>
        </div>
    </div>
    `;
    
    cnt1++; 
    fs.writeFile(__dirname+"/views/blog_"+cnt1+".ejs", fileContent, function(err, file){
        if(err) throw err;
    })
    
    
})

app.post("/blog-view", (req, res)=>{
    console.log(req.body);
    res.render("blog_"+req.body["blogNo"]+".ejs");
})



app.post("/post-delete", (req, res)=>{
    let toDelete = req.body["toDelete"];

    allPosts = allPosts.filter((_, index) => !toDelete.includes(index));

    res.render("index.ejs", {
        post: allPosts,
    })
})







app.listen(port, ()=>{
    console.log(`Server Running on port: ${port}`);
})


            