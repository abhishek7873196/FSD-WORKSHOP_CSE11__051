import http from 'http';

const userdata = [{ id: 1, name: "Abhishek", age: 19 },{ id: 2, name: "Aditya", age: 19 }];

const server = http.createServer((req, res) =>{
  const url = req.url;
  const method = req.method;

  if (url == "/user" && method == "POST") {
    let body = "";
    
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const newUser = JSON.parse(body);
      userdata.push(newUser);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User added", userdata }));
    });
  } else if (url == "/user" && method == "GET") {
    res.end(JSON.stringify(userdata));
  }
  else if (url.startsWith("/user/") && method == "GET") {
    const id = url.split("/")[2];
    console.log(id);
    const user = userdata.find((u) => u.id === Number(id));

    res.writeHead(user ? 200 : 404, { "Content-Type": "application/json" });
    if (!user) {
      return res.end(JSON.stringify({ message: "User not found" }));
    }
    res.end(JSON.stringify(user));
  }
  else if(url=="/create" && method=="POST"){
    let body = " ";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      const newUser = {
        id: data.id, 
        name: data.name, 
        email: data.email
      };
      userdata.push(newUser);
    });
   res.statusCode=201;
   res.end("user created successfully");
  }
  else if(url.startsWith("/delete") && method=="DELETE"){
    const id = url.split("/")[2];
    const index = userdata.findIndex((u) => u.id == id);
    if(index==-1){
      return res.end("user not found");
  }
  userdata.splice(index,1);
  res.end("user deleted successfully");
}
  else {
    res.end("Hello World");
  }
});
server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});