import EventEmitter from "node:events";
const myEmmiter = new EventEmitter();
myEmmiter.on("greet",(teacher)=>{
    console.log(`class started by ${teacher}`);
});
myEmmiter.on("exit",(teacher)=>{
    console.log(`class finished by ${teacher}`);
});
myEmmiter.on("games",(teacher)=>{
    console.log(`games started by ${teacher}`);
});
myEmmiter.emit("greet","chandrahas");
myEmmiter.emit("exit","chandrahas");
myEmmiter.emit("games","aditya srivastava")
