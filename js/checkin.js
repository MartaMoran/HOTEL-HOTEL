import {store} from './store.js';
  const result= store.rooms.filter((value)=>value.avy===true); 
   const checkAvailability=  result.sort((a,b)=>a.capacity-b.capacity);
   

   function checkIn(name, surname, age, idNumber,roomNumber,pets, nights,  paid ){
     store.clients.push({holder:{name:name, surname:surname, age:age, idNumber:idNumber ,roomNumberHolder: roomNumber ,pets:pets}, nights:nights,  paid:paid})
    
    }
 

  export {checkAvailability, checkIn};