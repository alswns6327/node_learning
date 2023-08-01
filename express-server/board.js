const express = require("express");
const app = express();
let posts = [];

app.use(express.json()); // req.body 사용을 위한 JSON 미들웨어 활성화

// POST 요청시 컨텐트 타입이 application/x-www-form-urlencoded인 경우 파싱
app.use(express.urlencoded({extended:true})); // JSON 미들웨어와 함꼐 사용

app.get("/", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res) => {
    const {title, name, text} = req.body;
    const a = "bbb";
    console.log(title);
    console.log(name);
    console.log(text);

    // 게시글 추가
    posts.push({a, id : posts.length + 1 , title, name, text, createDt : Date()});
    res.json({title, name, text});
});

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const filteredPosts = posts.filter((post) => post.id !== +id);
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;

    if(isLengthChanged){
        res.json("OK");
        return;
    }

    res.json("NOT CHANGED");
});

app.listen(3000, () => {
    console.log("dd");
});

