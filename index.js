const http = require("http");
const httpServer = http.createServer();
const fs = require("fs");

httpServer.on("listening", ()=>{
    console.log(`"Listening" `);;
});

httpServer.on("request", (req, res) => {
    if(req.url === "/"){
        res.end(fs.readFileSync("index.html"));
        return;
    };


    if(req.url === "/upload"){

        const fileName = req.headers["file-name"];

        req.on("data", (chunk) => {

            fs.appendFileSync(fileName, chunk);

            console.log('Received chunk: ', chunk.length);
        })

        res.end("Uploaded!");
        
        return;
    };
});


console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx index.js:16');

httpServer.listen(8080);

