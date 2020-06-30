import {store} from './js/store.js';
import {checkOut} from './js/checkout.js';
import {checkAvailability, checkIn} from './js/checkin.js';
import{findCheckInActive,findListActive, tableList, findCheckOutActive,findPrintBillActive,formValidationCheckIn,formCheckOut,findForm,table,formBill,inputNights,inputName,inputSurname,inputAge,inputId,inputPets,inputPaid, errors,inputCheckOut,checkData,inputBill,errorsCheckOut,errorsPrintBill,buttonRefresh,tableBodyListRooms,tableBodyListClients,actualiceStore, preventErrors} from './js/selection-constants.js';

  
        findCheckInActive.addEventListener('click',event=>{
            findForm.classList.remove('d-none');
            formValidationCheckIn.classList.remove('d-none');
            tableList.classList.add('d-none');
            formCheckOut.classList.add('d-none');
            formBill.classList.add('d-none');
        });
        
        findListActive.addEventListener('click',event=>{
            findForm.classList.add('d-none');
            formValidationCheckIn.classList.add('d-none');
            tableList.classList.remove('d-none');
            formCheckOut.classList.add('d-none');
            formBill.classList.add('d-none');
        });


        findCheckOutActive.addEventListener('click',event=>{
            findForm.classList.add('d-none');
            formValidationCheckIn.classList.add('d-none');
            tableList.classList.add('d-none');
            formCheckOut.classList.remove('d-none');
            formBill.classList.add('d-none');
        });
    
   
        findPrintBillActive.addEventListener('click', event=>{
            findForm.classList.add('d-none');
            formValidationCheckIn.classList.add('d-none');
            tableList.classList.add('d-none');
            formCheckOut.classList.add('d-none');
            formBill.classList.remove('d-none');
        });


    findForm.addEventListener('submit',event=>{
        event.preventDefault();
        table.innerHTML='';        
        checkAvailability.forEach(item =>{
            table.insertAdjacentHTML('beforeend', ` <tr class="" id=${item.id}><td>${item.id}</td> <td>${item.capacity}</td><td>${item.pvp}</td><td class="btn btn-info">Añadir habitación</td></tr></td>`);
             });
      });    
       
      table.addEventListener('click',event=>{
        event.preventDefault();   
        const roomId = event.target.parentNode.id
        event.target.parentNode.classList.add('d-none')
        
        table.insertAdjacentHTML("afterend",`<input class="form-control" id="roomID" type="text" readonly="readonly" value="${roomId}"/>`);
         }); 

    const inputPetsAnswer=()=>{
        if (inputPets.value==="1"){
            return true
        } return false
       
    }
    const roomWithPets=inputPetsAnswer();

    const inputPaidAnswer=()=>{
        if (inputPaid.value==="1"){
            return true
        } return false
       
    }
    const roomPaid=inputPaidAnswer();

  
    
    formValidationCheckIn.addEventListener('submit',event=>{
        event.preventDefault();
        errors.innerHTML='';
        const inputNightsConvertNumber=parseInt(inputNights.value);
        if (inputAge.value < 18){
            return errors.insertAdjacentHTML('beforeend', `<div class="alert alert-danger" role="alert">Las personas menores de 18 años no se pueden registrar</p></div>`)
        }
        if (inputAge.value >125){
            return  errors.insertAdjacentHTML('beforeend', `<div class="alert alert-danger" role="alert">Edad incorrecto</div></div>`)
        }
      
        if (inputNightsConvertNumber.length >= 3){
            return  errors.insertAdjacentHTML('beforeend', `<div class="alert alert-danger" role="alert">demasiados dias</div></div>`)
         }

         const roomSelection= document.querySelector('#roomID');
         const roomSelectionConvertNumber=parseInt(roomSelection.value);
         const findRoomNumber=store.rooms.find((value)=>value.id===roomSelectionConvertNumber);
            if (roomSelectionConvertNumber===findRoomNumber.id){
                findRoomNumber.avy=false
                roomSelection.classList.add('d-none')

            }
         
        checkIn(inputName.value, inputSurname.value, inputAge.value,inputId.value,roomSelectionConvertNumber, roomWithPets, inputNightsConvertNumber,  roomPaid/* roomOne.value ,roomTwo.value,roomThree.value,roomFour.value */);
    });
    
    buttonRefresh.addEventListener('click',event=>{
        inputName.value='';
        inputSurname.value='';
        inputAge.value='';
        inputId.value='';
        
    })
   
    actualiceStore.addEventListener('click',event=>{
        event.preventDefault();
        tableBodyListRooms.innerHTML='';
        tableBodyListClients.innerHTML='';
        store.rooms.forEach(value=>{
        tableBodyListRooms.insertAdjacentHTML('beforeend',`<tr><td>${value.id}</td> <td>${value.capacity}</td><td>${value.pvp}</td><td>${value.avy}</td></tr>`);
         }); 
        store.clients.forEach(value=>{
            tableBodyListClients.insertAdjacentHTML('beforeend',`<tr><td>${value.holder.roomNumberHolder}</td> <td>${value.holder.name} ${value.holder.surname}</td><td>${value.nights}</td><td>${value.paid}</td></tr>`)
        })
    });
    checkData.addEventListener('click', event=>{
        event.preventDefault();
        errorsCheckOut.innerHTML='';
             const inputCheckOut2=parseInt(inputCheckOut.value);
             console.log(inputCheckOut2)
             const result=store.clients.find((value)=>value.holder.roomNumberHolder===inputCheckOut2);
             const result2=result.holder.roomNumberHolder
             console.log(result2)
            
        
        if (result2) {
           errorsCheckOut.insertAdjacentHTML('beforeend', `<ul><li>${result.holder.name} ${result.holder.surname}</li><li>${result.nights} noches</li></ul>`);
        }
        if (result.paid===true){
           return errorsCheckOut.insertAdjacentHTML('beforeend', `<p>PAGADO</p>`)
        } return errorsCheckOut.insertAdjacentHTML('beforeend',`<p>NO PAGADO</p>`)

    });
 console.log(store);
    formCheckOut.addEventListener('submit',event=>{
        event.preventDefault();
        checkOut(inputCheckOut);
        formCheckOut.insertAdjacentHTML('beforeend', `<div class="alert alert-success" role="alert">Check Out finalizado con éxito</></div>`)
    });


    

    formBill.addEventListener('submit',event=>{
        event.preventDefault();
        errorsPrintBill.innerHTML='';
        const inputBill2=parseInt(inputBill.value);
        const findObject=store.clients.find(value=>value.holder.roomNumberHolder===inputBill2);
        console.log(findObject)
        const findPrice=store.rooms.find((value)=>value.id===inputBill2);
        const totalPrice=findObject.nights*findPrice.pvp;
         const totalPriceIVA=totalPrice*0.10+totalPrice;
        
         errorsPrintBill.insertAdjacentHTML('beforeend', `
         <table class="table">
            <thead>
             <tr>
                <th scope="col">Nombre y apellidos</th>
                <th scope="col">Habitación</th>
                <th scope="col">Total noches</th>
                <th scope="col">Precio por noche</th>
                <th scope="col">Precio total sin IVA</th>
                <th scope="col">Precio total con IVA</th>
                </tr>
            </thead>
            <tbody>
            <tr>
            <th scope="row">${findObject.holder.name} ${findObject.holder.surname}</th>
            <td>${findObject.holder.roomNumberHolder}</td>
            <td>${findObject.nights}</td>
            <td class="text-center">${findPrice.pvp} €</td>
            <td class="text-center">${totalPrice} €</td>
            <td class="table-success text-center">${totalPriceIVA} €</td>
          </tr>
            </tbody>
            </table>
            <p class="text-center font-weight-bolder">MUCHAS GRACIAS POR SU VISITA, ESPERAMOS VERLE DE NUEVO PRONTO</p>`)
    });




