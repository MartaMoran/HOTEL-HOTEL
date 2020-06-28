const store = {
    rooms: [
      { id: 101, capacity: 2, avy: true, pvp: 50 },
      { id: 102, capacity: 2, avy: false, pvp: 70 },
      { id: 103, capacity: 1, avy: true, pvp: 45 },
      { id: 104, capacity: 1, avy: false, pvp: 45 },
      { id: 105, capacity: 2, avy: true, pvp: 60 },
      { id: 106, capacity: 2, avy: true, pvp: 60 },
      { id: 107, capacity: 3, avy: false, pvp: 125 },
      { id: 108, capacity: 3, avy: true, pvp: 125 },
      { id: 109, capacity: 4, avy: true, pvp: 200 },
      { id: 110, capacity: 4, avy: true, pvp: 200 },
    ],
    clients: [
      {
        holder: { name: "Maria", surname: "Mercedes", age: 19, idnumber: '2222333j', roomNumberHolder:102, pets: true, },
        nights: 3,
        paid: true
      },
      {
        holder: { name: "Pedro", surname: "Pérez", age: 19, idnumber: '2222333j',roomNumberHolder:104,pets: true},
        nights: 3,
        paid: false
      },
      {
        holder: { name: "Pedro", surname: "Pérez", age: 19,holder:true, idnumber: '2222333j', roomNumberHolder:107,pets: true,},
        nights: 3,
        paid: true
      },
    ],
    oldClients: [],
  };

export {store}