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
7. [Contacto 📨](#id10)


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
   
  9. Si todo salio bien ya puedo comenzar a trabajar en nuestro proyecto, le recordamos que en `localhost:3000` se encuentra el cliente y en `localhost:3001` nuestro servidor. Cualquier duda o consulta no dude en [contactarnos](#id10).
  
  
 

<div id='id10'/>  

## Contacto
Email: ondrive.staff@gmail.com



