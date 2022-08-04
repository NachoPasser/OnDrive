![Logo](https://res.cloudinary.com/vombatidae/image/upload/v1659482487/OnDrive/banner-github-ondrive_bmx46o.png)

# OnDrive 🚘
Este proyecto nace con la intención facilitar los viajes de larga distancia en Argentina, reduciendo costos, compartiendo vehículos y evitando el crecimiento excesivo de CO₂ en el medio ambiente.

### **Índice**
1. [Funcionalidad Principal](#id1)
2. [Roles](#id2)
3. [Estado del proyecto](#id3)
4. [Despliegue](#id4)
5. [Tecnologías](#id5)
6. [Aporta al proyecto](#id6)
7. [Vistas](#id7)
    - [Informativas](#id71) 
    - [Usuario Visitante](#id72)
    - [Usuario Pasajero](#id73)
    - [Usuario Conductor](#id74)
    - [Usuario Administrador](#id75)
8. [Equipo](#id8)
9. [Contacto 📨](#id10)


<div id='id1'/>  

## Resumen de nuestra funcionalidad 📜
Nuestro proyecto se basa principalmente en la interacción de dos tipos de usuarios, Pasajeros y Conductores. Para convertirnos en cualquiera de estos tipos de usuario primero que nada debemos registrarnos en la página web. Una vez registrados nuestros usuarios seran capaces de comprar o publicar viajes dependiendo de su rol.

<div id='id2'/>  

## Roles
  - **Pasajero** 🧑‍🦰: Un pasajero es aquel usuario registrado capaz de adquirir los diferentes viajes publicados por conductores OnDrive, además tendrá acceso a su perfil en el cual verá información relacionada a sus viajes comprados / foto de perfil.
  
  - **Conductor** 🧑‍✈️: Un conductor es aquel usuario que además de registrarse completo el formulario necesario para convertirse en conductor.
  Los usuarios conductores son capaces de agregar información sobre sus vehículos, publicar viajes indicando origen, destino, precio, fechas de salida y llegada, tambien los conductores deberan autenticarse con [Mercado Pago](https://www.mercadopago.com.ar/home) para recibir los importes de sus viajes publicados.
Además, al igual que un usuario pasajero, tendrá acceso a su perfil con la diferencia que en este se vera incluida la información y reseñas sobre sus viajes.

- **Administrador** 🧑‍⚖️: Un usuario Root o Administrador es aquel capaz de restringir a los diferentes usuarios tres tipos de permisos.
Podrá bloquear el acceso permanente a una cuenta, podrá restringir a un Conductor publicar viajes o a un Pasajero comprarlos.

<div id='id3'/>  

## Estado del proyecto
Actualmente, el proyecto con lo que a funcionalidad respecta está estable, simplemente está recibiendo mejoras referidas al diseño para que la experiencia de usuario sea de mejor calidad.

<div id='id4'/>  

## Despliegue
  - `Cliente`:  Desplegado en [Vercel](https://vercel.com), puedes visitarlo haciendo click [aqui](https://on-drive.vercel.app/)
  - `Servidor`:  Desplegado en [Heroku](https://heroku.com), puedes visitarlo haciendo click [aqui](https://on-drive.herokuapp.com/trip)
  - `Base de datos`:  Desplegada en [ElephantSQL](https://www.elephantsql.com/)(acceso privado)
  
<div id='id5'/>  

## Tecnologías 🛠  

**Cliente:** React, Redux, React-Router, React Bootstrap, CSS Modules.

**Servidor:** NodeJS, ExpressJS, JWT, Bcrypt, Sequelize.

**Base de datos:** PostgreSQL.  

<div id='id6'/>  

## Colabora con nosotros 🤝
Primero que nada necesitara preparar su entorno local para poder colaborar en el proyecto, siga los pasos a continuacion:
  1. [Instalar PostgreSQL](https://www.postgresql.org/download/) en su computadora.
  2. [Instalar NodeJS](https://nodejs.org/es/download/)(Recomendamos la version LTS) y NPM(incluido con NodeJS). 
  3. [Forkear](https://desarrolloweb.com/articulos/fork-git) el proyecto o [contactenos](#id10) para formar parte del equipo si esta realmente interesado
  4. [Instalar GIT](https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Instalaci%C3%B3n-de-Git)
  5. Abre la terminal(asegurese de tener Git Bash para seguir los pasos tal cual) y coloquese en la carpeta raiz del proyecto, ingrese a la carpeta `/api` e instale las dependencias haga lo mismo con la carpeta `/client`.
  ```
    > cd .../OnDrive/api
    > npm install
    
    -- Luego --
    
    > cd .../OnDrive/client
    > npm install
  ```  
   6. debera crear un archivo `.env` en el directorio `/api` con las siguiente variables de entorno:
   ```javascript
    ACCESS_TOKEN = //Contactenos
    
    //administrador
    //Con estos datos sera capaz de ingresar al panel de administrador--
    ADMIN = //cualquier valor, ejemplo: admin
    ADMIN_PASS = //cualquier valor, ejemplo: admin1234
    
    //imagenes para los viajes
    API_IMG = //Contactenos
    
    CLIENT_ID = //Contactenos
    CLIENT_SECRET = //Contactenos
    
    //cloudinary
    //Puede registrar en https://cloudinary.com/ y obtener los datos requeridos a continuacion
    CLOUDINARY_API_KEY = 
    CLOUDINARY_NAME = 
    CLOUDINARY_SECRET = 
    
    //base de datos
    //Puede crearse una cuenta en Elephanth SQL y completar estos campos
    DB_HOST = //Host de la base de datos ejemplo: kesavan.db.elephantsql.com
    DB_PASSWORD = //ejemplo: hdwFNGJ_6HD8RIndHvmW9l1CfynVgnBC
    DB_USER = //Nombre del usuario y base de datos(en elephant es el mismo), ejemplo zskgxdwa
    
    //ganancia para OnDrive cuando se vende un viaje
    FEE = //cualquier valor numero, ejemplo 0.04
    
    MARKET_PLACE = //Contactenos
    
    //Secreto JWT
    SECRET_KEY = //cualquier valor
  ``` 
  7. debera crear un archivo `.env.local` en el directorio `/client` con las siguiente variables de entorno:
   ```
   REACT_APP_API_URL=localhost
   REACT_APP_API_PORT=3001
  ``` 
  8. Una vez configurado lo anterior deberia ser capaz de ejecutar el comando `npm start` en la carpeta `/client` y `/api`
   ```
   > cd .../OnDrive/api
   >npm start
   ``` 
   Deberia ver algo como esto:  
   
   ![imagen](https://user-images.githubusercontent.com/71911407/182502069-49297635-9a34-43e6-8f8a-f5ead9d30898.png)
   
   ```
   > cd .../OnDrive/client
   >npm start
   ``` 
   Deberia ver algo como esto:  
   
   ![imagen](https://user-images.githubusercontent.com/71911407/182502254-487c3341-98fe-4d00-8afd-498fd575d8b5.png)
   
  9. Si todo salio bien ya puede comenzar a trabajar en nuestro proyecto, le recordamos que en `localhost:3000` se encuentra el cliente y en `localhost:3001` nuestro servidor. Cualquier duda o consulta no dude en [contactarnos](#id10).
  



<div id='id7'/>  

## Vistas
Les dejamos unas capturas de como se ve actualmente nuestro sitio web.  

<div id='id71'/>  

### Informativas:

**`Lading Page`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182505810-5754b397-ba03-4956-b386-268e4a98123b.png)  

**`Problemas internos`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182506046-e35cea5d-33d3-4ea8-8874-d9dc39a96e68.png)  

**`Loader`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182506222-baba67e5-e782-4f50-8805-d6e1302c717c.png)  

**`Sobre nosotros`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182508258-457eb3bf-a090-4c83-ae73-1db701feee0c.png)

**`Ayuda`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182508331-c12c550c-0ac4-40be-8a2e-2fe0421cfe6a.png)



<div id='id72'/>  

### Usuario Visitante:

**`/home`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182506404-7f801dd8-5a4f-42b7-9eb5-092d614f3ada.png)  

**`/login`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182506949-8169395f-c440-47fc-a2aa-741e88f40043.png)  

**`/register`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182507121-d955fa8e-ba98-4f18-b6dd-3e9da3d3042e.png)  

**`/loginAdmin`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182508115-3e6bce6e-6514-482d-9f75-f5e075933a7d.png)  

**`/recovery-password`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182508454-245946bc-918e-4f8f-bbe6-d6db8a0e8c5f.png)  


<div id='id73'/>  

### Usuario Pasajero:  

**`/home`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182509136-ad734dfe-170d-4a06-8fa6-3f71008f85b7.png)  

**`/profile`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182509294-7d95ff6f-e6aa-4d1c-8eb8-98d10c06b728.png)  

**`/driver`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182509535-6ee39224-9e47-40cc-b898-a88cdf365784.png)  

<div id='id74'/>   

### Usuario Conductor: 

**`/home`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182510705-e638a630-5cb1-43c7-845e-0653696dce32.png)  

**`/addCar`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182510497-ae74adaf-139e-487b-9595-b4088b426926.png)  

**`/profile`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182511230-b631c75d-fe9e-49ee-8e9d-0231499dfe4d.png)  

**`/auth-mp`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182511352-4a4c5fb0-e9bb-4880-8169-af13453f58a7.png)  

**`/public`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182512058-1fa0e4e5-0e76-40aa-99a7-3c462ccd5377.png)  

<div id='id75'/>   

### Usuario Administrador: 

**`/adminPanel`**:  
![imagen](https://user-images.githubusercontent.com/71911407/182512782-f321f5cc-612e-4187-b40e-4479edf7e57e.png)  

<div id='id8'/>  

## Equipo  
- [@NachoPasser](https://github.com/NachoPasser)
- [@MarcoPoggi](https://github.com/MarcoPoggi)
- [@santi-misael21](https://github.com/santi-misael21)
- [@MatiasPereson](https://github.com/MatiasPereson)
- [@MariRionda](https://github.com/MariRionda)
- [@Ismanaos](https://github.com/Ismanaos)
- [@maxsolfar](https://github.com/maxsolfar)



<div id='id10'/>  

## Contacto
Email: ondrive.staff@gmail.com



