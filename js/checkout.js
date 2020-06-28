import {store} from './store.js';
    
function checkOut(num){
    const indexDelete=store.clients.findIndex((value)=>value.roomNumber===num);
    const deletedObject=store.clients.splice(indexDelete,1);
    store.oldClients.push(deletedObject);
}

export {checkOut};

