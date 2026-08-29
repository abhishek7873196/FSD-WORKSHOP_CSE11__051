import EventEmitter from "node:events";
function createDomElements(){
    const emitter = new EventEmitter();
    return {
        addEventlistener(eventType,listener){
            emitter.on(eventType, listener)},
        removeEventlistener(eventType,listener){emitter.off(eventType,listener)},
        dispatchEvent(event){
           event.target=this;
           event.currentTarget=this;
           emitter.emit(event.eventType,event);
        }
    }
}
const button=createDomElements();
button.addEventlistener('save',()=>{
    console.log("saving.....");
})
button.dispatchEvent({
    eventType:"save"
});