const usersStatic = require('./driver.json');

// Generate a random car
function generateCar() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const fuel = ["Gasoil", "Euro", "Premium", "Super"];
    let result1 = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return {
        color: color,
        license_plate: result1,
        fuel: fuel[Math.random() * fuel.length],
        year: Math.floor(Math.random() * (2022 - 1990 + 1)) + 1990,
    }
}

// Generate a random user
function generate(isRol = true) {
    var firstname = ["Adrián", "Agustín", "Alberto", "Alejandro", "Alexander", "Alexis", "Alonso", "Andrés Felipe", "Ángel", "Anthony", "Antonio", "Bautista", "Benicio", "Benjamín", "Carlos", "Carlos Alberto", "Carlos Eduardo", "Carlos Roberto", "César", "Cristóbal", "Daniel", "David", "Diego", "Dylan", "Eduardo", "Emiliano", "Emmanuel", "Enrique", "Erik", "Ernesto", "Ethan", "Fabián", "Facundo", "Felipe", "Félix", "Félix María", "Fernando", "Francisco", "Francisco Javier", "Gabriel", "Gaspar", "Gustavo Adolfo", "Hugo", "Ian", "Iker", "Isaac", "Jacob", "Javier", "Jayden", "Jeremy", "Jerónimo", "Jesús", "Jesús Antonio", "Jesús Víctor", "Joaquín", "Jorge", "Jorge  Alberto", "Jorge Luis", "José", "José Antonio", "José Daniel", "José David", "José Francisco", "José Gregorio", "José Luis", "José Manuel", "José Pablo", "Josué", "Juan", "Juan Ángel", "Juan Carlos", "Juan David", "Juan Esteban", "Juan Ignacio", "Juan José", "Juan Manuel", "Juan Pablo", "Juan Sebastián", "Julio", "Julio Cesar", "Justin", "Kevin", "Lautaro", "Liam", "Lian", "Lorenzo", "Lucas", "Luis", "Luis Alberto", "Luis Emilio", "Luis Fernando", "Manuel", "Manuel Antonio", "Marco Antonio", "Mario", "Martín", "Mateo", "Matías", "Maximiliano", "Maykel", "Miguel", "Miguel  ngel", "Nelson", "Noah", "Oscar", "Pablo", "Pedro", "Rafael", "Ramón", "Raúl", "Ricardo", "Rigoberto", "Roberto", "Rolando", "Samuel", "Samuel David", "Santiago", "Santino", "Santos", "Sebastián", "Thiago", "Thiago Benjamín", "Tomás", "Valentino", "Vicente", "Víctor", "Víctor Hugo"];
    var lastname = ["Garcia", "Gonzalez", "Rodriguez", "Fernandez", "Lopez", "Martinez", "Sanchez", "Perez", "Gomez", "Martin", "Jimenez", "Ruiz", "Hernandez", "Diaz", "Moreno", "Alvarez", "Muñoz", "Romero", "Alonso", "Gutierrez", "Navarro", "Torres", "Dominguez",
        "Vazquez", "Ramos", "Gil", "Ramirez", "Serrano", "Blanco", "Suarez", "Molina", "Morales", "Ortega", "Delgado", "Castro", "Ortiz", "Rubio", "Marin", "Sanz", "Nuñez", "Iglesias", "Medina", "Garrido", "Santos", "Castillo", "Cortes", "Lozano", "Guerrero", "Cano", "Prieto", "Mendez", "Calvo", "Cruz", "Gallego", "Vidal", "Leon", "Herrera", "Marquez", "Peña", "Cabrera", "Flores", "Campos", "Vega", "Diez", "Fuentes", "Carrasco", "Caballero", "Nieto", "Reyes", "Aguilar", "Pascual", "Herrero", "Santana", "Lorenzo", "Hidalgo", "Montero", "Ibañez", "Gimenez", "Ferrer", "Duran", "Vicente", "Benitez", "Mora", "Santiago", "Arias", "Vargas", "Carmona", "Crespo", "Roman", "Pastor", "Soto", "Saez", "Velasco", "Soler", "Moya", "Esteban", "Parra", "Bravo", "Gallardo", "Rojas", "Pardo", "Merino", "Franco", "Espinosa", "Izquierdo", "Lara", "Rivas", "Silva", "Rivera", "Casado", "Arroyo", "Redondo", "Camacho", "Rey", "Vera", "Otero", "Luque", "Galan", "Montes", "Rios", "Sierra", "Segura", "Carrillo", "Marcos", "Marti", "Soriano", "Mendoza"];
    var rand_first = Math.floor(Math.random() * firstname.length);
    var rand_last = Math.floor(Math.random() * lastname.length);
    return {
        name: firstname[rand_first],
        lastname: lastname[rand_last],
        age: Math.floor(Math.random() * (50 - 18 + 1) + 18),
        license: Math.floor(Math.random() * 100000),
        email: firstname[rand_first].toLowerCase().split(' ').join('_') + '.' + lastname[rand_last].toLowerCase() + "@gmail.com",
        phone: Math.floor(Math.random() * 10000000000),
        password: Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
        role: isRol ? Math.floor(Math.random() * 100) < 50 ? 'driver' : 'passenger' : null,
        car: [
            generateCar(),
        ]
    }
}

// Generate a random user for drivers
const objTrip = (driver) => {
    const dia = Math.floor(Math.random() * (30 - 5 + 1) + 4);
    const mes = Math.floor(Math.random() * 10) + 1;
    const marca = ["Ford", "Nissan", "Chevrolet", "VW", "Toyota", "Renault", "Fiat"]
    const ciudades = ['Buenos Aires', 'Córdoba', 'La Plata', 'Mar del Plata', 'Mendoza', 'Rosario', 'Salta', 'San Juan', 'San Luis', 'Santa Fe', 'Santiago del Estero', 'Tandil', 'Tucumán', 'Ushuaia'];
    return {
        id: generateUUID(),
        start_date: new Date(2022, mes, dia - 2),
        finish_date: new Date(2022, mes, dia),
        capacity: Math.floor(Math.random() * 6 + 1),
        rating: Math.floor(Math.random() * 6),
        price: Math.floor(Math.random() * 1000),
        origin: ciudades[Math.floor(Math.random() * ciudades.length)],
        destination: ciudades[Math.floor(Math.random() * ciudades.length)],
        marca: marca[Math.floor(Math.random() * marca.length)],
        driver,
    }
}

function Ascensora(trps, all, min, max) {//ASCENSORA POR FECHAS
    for (let i = 1; i < trps.length; i++) {
        for (let o = i; o >= 1; o--) {
            if (new Date(trps[o].start_date) < new Date(trps[o - 1].start_date)) {
                var box = trps[o]
                trps[o] = trps[o - 1]
                trps[o - 1] = box
            }
        }
    }
    if (all) {
        return trps
    }
}

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

// Generate a random user json for drivers
const getTripsUsersFake = (req, res) => {
    let { idParams } = req.params;
    const tripsDrivers = [];
    for (let j = 0; j < 100; j++) {
        tripsDrivers.push(objTrip(generate(false)));
    }
    if(idParams){
        idParams = idParams.toLowerCase()
        var filterCurrent = tripsDrivers.filter(curr => {
            let current = curr.destination.toLowerCase()
            let noAccents = removeAccents(current)
            return current.includes(idParams) || noAccents.includes(idParams)
        })
        res.json(filterCurrent);
    }
    else res.json(tripsDrivers);
}

// Generate a list of random users
const usersJson = (req, res) => {
    var users = [];
    for (var i = 0; i < 100; i++) {
        users.push(generate());
    }
    res.json(users);
}

const getStaticUsers = (req, res) => {
    res.json(usersStatic);
}

const getTripById = (req,res) => {
    const {id} = req.params;
    try {
        //valid id
        if(typeof id !== "string") throw new Error(`Invalid ID(must be a string)`)
        if(id.length !== 32) throw new Error(`Invalid ID(${id})`);
        //search trip
        const trip = usersStatic.filter((trip) => trip.id === id);
        if(trip.length === 0) throw new Error(`Trip ID(${id}) not found`);
        //response ok
        res.status(200);
        res.json({message:"Trip was found",value:{trip:trip[0]}})
    } catch (e) {
        //response error
        res.status(400);
        res.json({message:`something has wrong: ${e.message}`, value: null})
    }
}


function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

module.exports = { usersJson, getTripsUsersFake, getStaticUsers, getTripById,objTrip,generate,Ascensora};

