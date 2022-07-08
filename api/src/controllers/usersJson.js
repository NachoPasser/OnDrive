// Generate a random car
function generateCar(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const combutible = ["Gasoil", "Euro", "Premium", "Super"];
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return{
        color: color,
        license_plate: result1,
        combutible: combutible[Math.random() * combutible.length],
        year: Math.floor(Math.random() * (2022 - 1990 + 1)) + 1990,
    }
}

// Generate a random user
function generate(){
	var firstname = ["Adrián", "Agustín", "Alberto", "Alejandro", "Alexander", "Alexis", "Alonso", "Andrés Felipe", "Ángel", "Anthony", "Antonio", "Bautista", "Benicio", "Benjamín", "Carlos", "Carlos Alberto", "Carlos Eduardo", "Carlos Roberto", "César", "Cristóbal", "Daniel", "David", "Diego", "Dylan", "Eduardo", "Emiliano", "Emmanuel", "Enrique", "Erik", "Ernesto", "Ethan", "Fabián", "Facundo", "Felipe", "Félix", "Félix María", "Fernando", "Francisco", "Francisco Javier", "Gabriel", "Gaspar", "Gustavo Adolfo", "Hugo", "Ian", "Iker", "Isaac", "Jacob", "Javier", "Jayden", "Jeremy", "Jerónimo", "Jesús", "Jesús Antonio", "Jesús Víctor", "Joaquín", "Jorge", "Jorge  Alberto", "Jorge Luis", "José", "José Antonio", "José Daniel", "José David", "José Francisco", "José Gregorio", "José Luis", "José Manuel", "José Pablo", "Josué", "Juan", "Juan Ángel", "Juan Carlos", "Juan David", "Juan Esteban", "Juan Ignacio", "Juan José", "Juan Manuel", "Juan Pablo", "Juan Sebastián", "Julio", "Julio Cesar", "Justin", "Kevin", "Lautaro", "Liam", "Lian", "Lorenzo", "Lucas", "Luis", "Luis Alberto", "Luis Emilio", "Luis Fernando", "Manuel", "Manuel Antonio", "Marco Antonio", "Mario", "Martín", "Mateo", "Matías", "Maximiliano", "Maykel", "Miguel", "Miguel  ngel", "Nelson", "Noah", "Oscar", "Pablo", "Pedro", "Rafael", "Ramón", "Raúl", "Ricardo", "Rigoberto", "Roberto", "Rolando", "Samuel", "Samuel David", "Santiago", "Santino", "Santos", "Sebastián", "Thiago", "Thiago Benjamín", "Tomás", "Valentino", "Vicente", "Víctor", "Víctor Hugo"];
	var lastname= ["Garcia", "Gonzalez", "Rodriguez", "Fernandez", "Lopez", "Martinez", "Sanchez", "Perez", "Gomez", "Martin", "Jimenez", "Ruiz", "Hernandez", "Diaz", "Moreno", "Alvarez", "Muñoz", "Romero", "Alonso", "Gutierrez", "Navarro", "Torres", "Dominguez",
	"Vazquez", "Ramos", "Gil", "Ramirez", "Serrano", "Blanco", "Suarez", "Molina", "Morales", "Ortega", "Delgado", "Castro", "Ortiz", "Rubio", "Marin", "Sanz", "Nuñez", "Iglesias", "Medina", "Garrido", "Santos", "Castillo", "Cortes", "Lozano", "Guerrero", "Cano", "Prieto", "Mendez", "Calvo", "Cruz", "Gallego", "Vidal", "Leon", "Herrera", "Marquez", "Peña", "Cabrera", "Flores", "Campos", "Vega", "Diez", "Fuentes", "Carrasco", "Caballero", "Nieto", "Reyes", "Aguilar", "Pascual", "Herrero", "Santana", "Lorenzo", "Hidalgo", "Montero", "Ibañez", "Gimenez", "Ferrer", "Duran", "Vicente", "Benitez", "Mora", "Santiago", "Arias", "Vargas", "Carmona", "Crespo", "Roman", "Pastor", "Soto", "Saez", "Velasco", "Soler", "Moya", "Esteban", "Parra", "Bravo", "Gallardo", "Rojas", "Pardo", "Merino", "Franco", "Espinosa", "Izquierdo", "Lara", "Rivas", "Silva", "Rivera", "Casado", "Arroyo", "Redondo", "Camacho", "Rey", "Vera", "Otero", "Luque", "Galan", "Montes", "Rios", "Sierra", "Segura", "Carrillo", "Marcos", "Marti", "Soriano", "Mendoza"];
	var rand_first = Math.floor(Math.random()*firstname.length); 
	var rand_last = Math.floor(Math.random()*lastname.length); 
	return{
        name: firstname[rand_first],
        lastname: lastname[rand_last],
        age: Math.floor(Math.random()*(50-18+1)+18),
        license: Math.floor(Math.random()*100000),
        email: firstname[rand_first].toLowerCase().split(' ').join('_') + '.' + lastname[rand_last].toLowerCase() + "@gmail.com",
        phone: Math.floor(Math.random()*10000000000),
        password: Math.floor(Math.random()*100),
        role: Math.floor(Math.random()*100) < 50 ? 'driver' : 'passenger',
        car: [
            generateCar(),
        ]
    } 
}
// return {
//     id: trip.id,
//     start_date: trip.start_date,
//     finish_date: trip.finish_date,
//     origin: trip.origin,
//     destination: trip.destination,
//     price: trip.price
function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}
const objTrip = (driver) => {
    const ciudades = ['Buenos Aires', 'Córdoba', 'La Plata', 'Mar del Plata', 'Mendoza', 'Rosario', 'Salta', 'San Juan', 'San Luis', 'Santa Fe', 'Santiago del Estero', 'Tandil', 'Tucumán', 'Ushuaia'];
    return {
        start_date: randomDate(0, 16, 0, 16),
        finish_date: randomDate(16, 23, 16, 23),
        capacity: Math.floor(Math.random()*(3-5+1)+3),
        rating: Math.floor(Math.random()*5),
        price: Math.floor(Math.random()*1000),
        origin: ciudades[Math.floor(Math.random()*ciudades.length)],
        destination: ciudades[Math.floor(Math.random()*ciudades.length)],
        driver,
    }
}
// }
const getTripsUsersFake = (req, res) => {
    const tripsDrivers = [];
    for (let j = 0; j < 100; j++) {
        tripsDrivers.push(objTrip(generate()));
    }
}

// Generate a list of random users
const usersJson = (req, res) => {
    var users = [];
    for(var i = 0; i < 100; i++){
        users.push(generate());
    }
    res.json(users);
}

module.exports = {usersJson, getTripsUsersFake};