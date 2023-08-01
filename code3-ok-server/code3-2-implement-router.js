const http = require("http");
const url = require("url");
http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // 패스명 할당
    // res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if(path in urlMap){
        urlMap[path](req, res);
    }else{
        notFound(req, res);
    }
}).listen("3000", () => console.log("라우터"));

const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;

    res.end(`[user] name : ${userInfo.name}, age : ${userInfo.age} 한글`); // /user 결괏값 설정
}

const feed = (req, res) => {
    res.end(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
            <li>picture4</li>
            </ul>
        `);
}

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");
}

const urlMap = {
    "/" : (req, res) => {res.end("Home");},
    "/user" : user,
    "/feed" : feed,
}