# PRACTICA 1
**Por** *Eduardo Muñoz*

Esta practica esta documentada en esta seccion.

## 1. Configuracion del entorno
Para esta practica se elige la distribucion Ubuntu, que seguido a esto se prodece a realizar la correspondiente instalacion y configuración de la maquina virtual mediante la herramienta virtualbox.

La maquina posee los siguientes recursos:
- Sistema Ubuntu (Linux)
- 3 Gb de RAM
- 20 Gb de alamcenamiento
- 2 procesasores

## 2. Instalacion de docker

Despues de iniciar la maquina virtual creada anteriormente se procede a la actualización de los programas y a la inslación de docker, siguiendo los pasos de la documentacion dada en clase que es la siguiente:

- [Instalación de Docker en Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

Para probar que quedo correctamenet se hacen dos procedimientos sencillos; el primero es mirar la versión y la segunda es correr un servidor de hello word
```
docker --version
```
![version docker](https://user-images.githubusercontent.com/118281449/204339245-ac670df3-d07f-457e-97b0-a29c64c54e2d.png)

```
sudo docker run hello-world
```
![docker hello-word](https://user-images.githubusercontent.com/118281449/204339417-33e7dfed-5328-4b91-8efb-a3f20c884510.png)



## Desarrollo Practica

Para esta practica se necesita instalar la herramienta de red, las herramientas Isof, y para mayor facilidad al modificar los documentos, el gestor de archivos gedit, que se hace con el siguiente comando:

```
sudo apt install net-tools
```
![instalacion net-tools](https://user-images.githubusercontent.com/118281449/204339497-9c0b2d08-13d8-4921-9530-99d077936632.png)


```
sudo apt-get install lsof
```
![instalación Isof](https://user-images.githubusercontent.com/118281449/204339595-085e0732-4f5d-4872-9416-05b0b0b6f0c1.png)


```
sudo apt-get install gedit
```
![instalación gedit](https://user-images.githubusercontent.com/118281449/204339666-05e81ff5-4580-4555-8914-b7e4616c8d15.png)


Ademas la configuración de red de la maquina debe estar en adaptador puente.

Seguido a esto se **identifica la configuración de la red** con el siguiente comando:

```
ifconfig
```

![ifconfig](https://user-images.githubusercontent.com/118281449/204339739-56d75b27-8ae2-4cfd-895e-155eba3a9cc7.png)


Continuando con la practica, se necesita identificar que puertos y servicios estan ocupados, que se consigue con los siguientes codigos:

```
ss | grep containerd
netstat | grep containerd
lsof | grep containerd
```
![Puertos y servicios ocupados](https://user-images.githubusercontent.com/118281449/204339855-ec6db086-d4f6-4dc9-a668-cde57637211b.png)


Se realiza una **conexion TCP** en la cual el cliente y el servidor estan en la misma maquina. 
El primer paso es crear un archivo **server.py** que se guarda en el directorio **/Documentos/ServiciosTCP**, que se realizan con los siguientes codigos:
```
cd Documentos/
mkdir serviciosTCP
cd serviciosTCP/ls
touch server.py
```
En lo que el archico creado debe llevar el siguiente codigo:
```
import socket
import sys
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = ('0.0.0.0', 10000)
print("Iniciando servidor...")
sock.bind(server_address)
sock.listen(1)
while True:
    print("Esperando por una conexion")
    connection, client_address = sock.accept()
    try:
        print("Conectando desde: ", client_address)
        while True:
            data = connection.recv(16)
            print('Recibido {!r}'.format(data))
            if data:
                print("Enviando datos de regreso")
                connection.sendall(data)
            else:
                print("No hay datos desde el cliente", client_address)
                break
    finally:
        connection.close()
```
Seguido a esto, en el mismo directorio se crea un nuevo archivo denominado **Cliente.py** con el siguiente codigo:
```
import socket
import sys
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = ('0.0.0.0', 10000)
print("Iniciando cliente...")
sock.connect(server_address)
try:
    message = b'Este es un mensaje'
    print("Enviando {!r}".format(message))
    sock.sendall(message)
    
    amount_rcv = 0
    amount_exp = len(message)
    
    while amount_rcv < amount_exp:
        data = sock.recv(16)
        amount_rcv += len(data)
        print("Recibiendo {!r}".format(data))
finally:
   print("Cerrando socket")
   sock.close()
```
Y se ejecutan los archivos con los siguientes comandos:
```
python3 server.py
python3 client.py
```
![conexionTCP](https://user-images.githubusercontent.com/118281449/204340525-3f016012-80b6-4944-a6ce-c62fceaa022f.png)


Que para ver que puerto se utilizo se hace uso del comando ```lsof -i -P -n```, que se observa que se ha utilizado el puerto **10000** para la conexion servidor-cliente.

![puerto 1000](https://user-images.githubusercontent.com/118281449/203447510-aedfab3f-fe5d-4045-91c8-70ef6d39e273.png)

De la misma manera se hace para la **Conexion UDP** cliente y servidor en la misma maquina, que nuevamente se crea un directorio en /Documentos con el nombre de **ServicioUDP**, en el cual tendra dos archivos un **Server.py** y **cliente.py**

**Server.py**
```
import socket
import sys
# Create a UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# Bind the socket to the port
server_address = ('localhost', 10000)
print('starting up on {} port {}'.format(*server_address))
sock.bind(server_address)
while True:
    print('\nwaiting to receive message')
    data, address = sock.recvfrom(4096)
    print('received {} bytes from {}'.format(
        len(data), address))
    print(data)
    if data:
        sent = sock.sendto(data, address)
        print('sent {} bytes back to {}'.format(
            sent, address))
```

**cliente.py**

```
import socket
import sys
# Create a UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_address = ('localhost', 10000)
message = b'This is the message.  It will be repeated.'
try:
    # Send data
    print('sending {!r}'.format(message))
    sent = sock.sendto(message, server_address)
    # Receive response
    print('waiting to receive')
    data, server = sock.recvfrom(4096)
    print('received {!r}'.format(data))
finally:
    print('closing socket')
    sock.close()
```

Y se ejecutan los archivos con los siguientes comandos:
```
python3 server.py
python3 client.py
```
![conexionUDP](https://user-images.githubusercontent.com/118281449/204340886-5529bb52-eafa-4cc2-bf76-355ac96b0a0e.png)


Que para ver que puerto se utilizo se hace uso del comando ```lsof -i -P -n```, que se observa que se ha utilizado el puerto **10000** para la conexion servidor-cliente.

![datosUDP](https://user-images.githubusercontent.com/118281449/204341121-e1e2ccfb-e68e-419e-a17f-5866c29deb3f.png)









## PRACTICA 2
El codigo de esta practica esta la rama master y documentada en esta seccion.

Para esta practica se tiene los requisitos bases del anterior proceso, ademas se necesitan instalar nuevas herramientas como NodeJS y NestJS.
Estas se reliazan con los siguientes comandos:

## PARA NodeJS**
```
sudo apt update && sudo apt install nodejs -y
```
**Actualizar Nodejs**
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```
**Versiones**
```
node -v
npm -v
```
![versiones](https://user-images.githubusercontent.com/118281449/203452075-24c1e684-f3bd-481f-ab02-a21cf51671f1.png)

Seguido a esto, se cre un espacio para los recursos globales de nodejs con el siguiente comando:
```
cd
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo "export PATH=~/.npm-global/bin:$PATH" >> ~/.profile
source ~/.profile
```
## PARA NestJS
```
 npm i -g @nestjs/cli
  source ~/.profile
```
## Ejemplo Hello World
se crea un carpeta en el directorio documentos con los sieguientes comandos:
```
 cd ~/Documents
  mkdir Servidores
  cd Servidores
```
y se crea un proyceto con el siguiente comando:
```
nest new server
```
![Proyecto](https://user-images.githubusercontent.com/118281449/203453370-0d9a9cf9-30b4-498b-ab61-8573bedbe36b.png)

Seguido a esto, se necesita identificar la direccion Ip por lo que se utiliza el comando ```  hostname -I```

![IP](https://user-images.githubusercontent.com/118281449/203453827-710e691a-e7cd-4f77-9fdb-94541ca0e003.png)
 
Para ejecutar el ejemplo Hello Word se ejecutan los siguientes comandos:
```
  cd server
  npm run start:dev
```
![ejemplo](https://user-images.githubusercontent.com/118281449/203454220-66b5bd74-82ba-45ef-9886-8fb3c35937e8.png)

Para verificar los scripts disponibles, se puede ejecutar el comando:
```
 cat package.json
```
![cat packet](https://user-images.githubusercontent.com/118281449/203454386-f04e081e-46a4-47c7-8fb6-d599b4e4b3c7.png)

Con lo anterior el servidor nos indica que está listo para recibir peticiones con el metodo GET en la ruta raíz. y se ejecuta el comando ``` netstat -tulpn | grep node ``` para verificar que puerto esta utilizando.
![puerto](https://user-images.githubusercontent.com/118281449/203455103-a856c93c-90d7-4660-b219-117fc7c12808.png)
Luego ya se puede probar el servidor con el comando en otra terminal:
```
curl http://localhost:3000
```
![hello](https://user-images.githubusercontent.com/118281449/203455524-731af5ea-f845-4114-9811-6bcdcaf2d60c.png)

y asi mismo con la direccion ip:
```
http://192.168.1.61:3000
```
![hello ip](https://user-images.githubusercontent.com/118281449/203455863-2fccbb0b-37b9-4344-b157-658bb433dca9.png)

## 3. Publicar el codigo en Github
Primero que todo se debe tener una cuenta en GitHub y crear un repositorio publico, que se configura en llave SSH o http, pero para este caso se hizo con SSH, con el fin de poder ir guardando todo. Para esto se ingresa en la carpeta que se esta trabajando con el comando:
```
cd Documents/Servidores/server
```

Se inicia el repositorio en GitHub mediante el siguiente comando, donde se conecta medienate la url de SSH de nuestro repositorio.
```
git remote add origin  git@github.com:eduardoj12/Practica-IoT.git
```
Se inicializa la carpeta de nuestro proyecto con el siguiente comando:

```
git init
```
y se obtiene una captura del proyecto con el comando:
```
git commit -m "Primer commit"
```
Ee carga el contennido de nuestro proyecto al repositorio Github con el comando:
```
git push --set-upstream origin master
```

## 4. Verbos HTTP
Para continuar con la practica  se debe acceder a VSCode, para una mayor facilidad de esta,  y se debe tener en cuenta los siguientes pasos.
Primero se accede a la carpeta de nuestro proyecto mediante el boton **Open Folder**.
![carpeta VC](https://user-images.githubusercontent.com/118281449/204397437-549693c7-2380-469a-9a13-5884a4ca89ca.png)

Dentro de la carpeta de nuestro proyecto se encuentra un archivo llamado app.controller.ts, el cual ejecuta una peticion GET al servidor y tiene el siguiente contenido.

![app controler](https://user-images.githubusercontent.com/118281449/204397503-7e344ffd-6c1f-46b4-bbce-b974709f9a94.png)

Donde se modifica el metodo con el siguiente codigo para asi poder observar los cambios en el servidor:

```
@Get()
getHello(): string {
  return "Hola Eduardo";
}
```
Se guardan los cambios y se ejecuta el servidor mediante el siguiente comando:
```
npm run start:dev
```
Para verificar los cambios realisados ejecutar en el terminal 
```
curl http://localhost:3000
```
![holaEduardo](https://user-images.githubusercontent.com/118281449/204401570-33a7105b-88d7-475d-954c-d72da5b21b5a.png)

Seguido a esto para agregar un metodo POST se crea una variable para asi guardar un mensaje adicional y ser retomada por el metodo GET. Luego se agrega un metodo POST el cual tiene el parametro nombre como entrada, Por lo tanto app.controller.ts queda de la siguiente manera.
```
import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   private persona = "Eduardo...";

   @Get()
   getHello(): string {
      return `Hola: ${this.persona}`
   }

   @Post(':nombre')
   modificar(@Param('nombre') nombre: string): string {
      this.persona = nombre;
      return `Mensaje modificado: ${this.persona}`
   }
}
```
Para ejecutar el metodo POST en la terminal de la maquina virtual se usa.

```
curl -X POST http://localhost:3000/Pikachu
```
![holaPicachu](https://user-images.githubusercontent.com/118281449/204401962-9d755550-92e2-4d70-af37-328bfc9f89ae.png)

Se sube los cambios realizados, para lo cual se ejecutan los siguientes comandos:
```
cd ~Documents/Servidores/practica_02
git add .
git commit -m "Se agrego un metodo POST"
git push origin master
```
## 5. Seleccionar un tema para moldear como una entidad.
El tema que se selecciono fueron ciudades, con los parametros nombre, pais y CodPostal.Ademas se implementaron los metodos GET,POST, y DELETE.
Por lo tanto el codigo de **app.controller.ts** sera el siguiente:
```
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

interface Ciudad {
  nombre: string,
  pais: string,
  CodPostal: number
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private ciudades: Ciudad[] = [{
    nombre: "Popayan",
    pais: "Colombia",
    CodPostal: 1004
  }]

  @Get()
  getHello(): Ciudad[] {
    return this.ciudades;
  }

  @Post()
  crear(@Body() datos: Ciudad): Ciudad {
    this.ciudades.push(datos);
    return datos;
  }

  @Put(":id")
  modificar(@Body() datos: Ciudad, @Param('id') id: number): Ciudad | string {
    try{
    this.ciudades[id] = datos
    return this.ciudades[id];
    }
    catch{
      return `No fue posible modificar al usuario en la posición ${id}`
    }
  }

  @Delete(":id")
  eliminar(@Param('id') id: number){
    try{
      this.ciudades = this.ciudades.filter((val, index) => index != id);
      return true;
    }
    catch{
      return false;
    }
  }

  @Patch(":id/CodPostal/:CodPostal")
  cambiarEdad(@Param('id') id: number, @Param('CodPostal') Cod: number): Ciudad | string{
    try{
      this.ciudades[id].CodPostal = Cod;
      return this.ciudades[id];
    }
    catch{
      return `No fue posible modificar al usuario en la posición ${id}`
    }
  }
}
```
Que con ayuda de la herramienta **Postman** se prueba el funcionamiento de los metodos:
**Metodo GET**

![Get](https://user-images.githubusercontent.com/118281449/204405303-8056689e-30e6-426f-a4a2-b91bdd27e39f.png)


**Metodo POST**
![Post](https://user-images.githubusercontent.com/118281449/204405299-5d20c07c-438a-4d21-aa76-81e0d02799b0.png)


**Metodo DELETE**
![Delete](https://user-images.githubusercontent.com/118281449/204405306-b05f407b-9d24-46a0-8a1b-1c6c76a03a94.png)

Finalmete se sube lo realizado en GitHub con un nuevo commit:
```
cd ~Documents/Servidores/practica_02
git add .
git commit -m "Se completó la tarea"
git push origin master
```

## Práctica 3: Seguridad y calidad

El codigo de esta practica esta la rama hexagonal y documentada en esta seccion.

Primero que todo se crea un nueva arquitectura que es una rama hexagonal, en la que se va trabajar esta practica con el siguiente codigo:
```
git checkout -b hexagonal master
```
Para tener la estructura hexagonal se deben hacer los siguientes cambios en la estructura del codigo, donde nombre_entidad es **Ciudades**.

- src
  - <nombre_entidad>
    - adapters
      - controllers
        - <nombre_entidad>.controller.ts
      - repositories
        - <nombre_entidad>.repository.ts (nuevo archivo)
    - domain
      - models
        - <nombre_entidad>.model.ts (nuevo archivo)
      - services
        - <nombre_entidad>.service.ts

Seguido a esto se mueve los archivos app.controllers a la carpeta controllers y el archivo app.service.ts a la carpeta service y se cambian los nombre a la entidad y a las clases.

![CarpetaSrc](https://user-images.githubusercontent.com/118281449/204413175-8c956b2b-cf0c-400c-bfb5-aa21239078e2.png)

Para modelar los datos se crea un archivo de modelo. De esta manera se podrán agregar nuevos roles con sus especificaciones.
Se crean dos archivos, el primero es el que modela futuros roles y es el siguiente:
**Ciudades.model.ts**
```
export abstract class Ciudade {
  name: string;
  Pais: string;
  CodPostal: number;
}
```
Y el segundo archivo ciudade2.model.ts que extiende la funcionalidad del modelo tiene el siguiente contenido:
**Ciudades2.model.ts**
```
import { ciudades } from "./Ciudades.model";


export class Ciudade2 extends ciudades{
    returndate: Date;
}
```
Seguido a esto se crea un nuevo archivo denominado ciudades.service.ts dentro de la carpeta service con el objetivo de migrar las funcionalidades que antes el controlasdor tenia. El contenido de este archivo queda.

```

import { Injectable } from '@nestjs/common';
// Importamos el modelo de jugador
import { ciudades } from '../models/Ciudades.model';

@Injectable()
export class CiudadesService {

   // Como no hay base de datos aun empleamos una variable en memoria:
   private ciudad: ciudades[] = [{
      name: 'Cali',
      Pais: 'Colombia',
      CodPostal: 35,
   }]

   /**
    * Método para obtener todos los jugadores
    */
   public listar() : ciudades[] {
      return this.ciudad
   }

   /**
    * Método para crear un jugador
    */
   public crear(lugar: ciudades): ciudades {
      this.ciudad.push(lugar);
      return lugar;
   }

   /**
    * Método para modificar un jugador
    */
   public modificar(id: number, lugar: ciudades): ciudades {
         this.ciudad[id] = lugar
         return this.ciudad[id];
   }

   /**
    * Método para eliminar un jugador
    * Debido a que usamos un filtro, para validar si se elimina el jugador, 
    * primero se determina cuantos elementos hay en el arreglo y luego se hace una comparación.
    */
   public eliminar(id: number): boolean {
      const totalJugadoresAntes = this.ciudad.length;
      this.ciudad = this.ciudad.filter((val, index) => index != id);
      if(totalJugadoresAntes == this.ciudad.length){
         return false;
      }
      else{
         return true;
      }
   }

   /**
    * Método para modificar la edad de un jugador
    */
   public cambiarCodPostal(id: number, Cod: number): ciudades {
      this.ciudad[id].CodPostal = Cod;
      return this.ciudad[id];
   }

}
```
Dentro de la carpeta controlador en el archivo Ciudades.controller.ts se hace la implementacion sel servicio. Dentro de este es importante corregir errores para lo cual se agregan bloques try/catch. El controlador queda asi.
```
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CiudadesService } from '../../domain/services/Ciudades.service';

import {Ciudade2} from '../../domain/models/Ciudades2.model';

const errReturn = (e: Error, message: string) => {
   return {
      message: message,
      error: e
   }
}

@Controller()
export class CiudadesController {
constructor(private readonly ciudadService: CiudadesService) { }

   @Get()
   getHello() {
      try{
         return this.ciudadService.listar();
      }
      catch(e){
         return errReturn(e, "Error al listar ciudades");
      }
   }

   @Post()
   crear(@Body() datos: Ciudade2) {
      try{
         return this.ciudadService.crear(datos);
      }
      catch(e){
         return errReturn(e, "Error al crear ciudad");
      }
   }

   @Put(":id")
   modificar(@Body() datos: Ciudade2, @Param('id') id: number) {
      try{
         return this.ciudadService.modificar(id, datos);
      }
      catch(e){
         return errReturn(e, "Error al modificar ciudad");
      }
   }

   @Delete(":id")
   eliminar(@Param('id') id: number) {
      try{
         return this.ciudadService.eliminar(id);
      }
      catch(e){
         return errReturn(e, "Error al eliminar ciudad");
      }
   }

   @Patch(":id/CodPostal/:CodPostal")
   cambiarCodPostal(@Param('id') id: number, @Param('CodPostal') CodPos: number) {
      try{
         return this.ciudadService.cambiarCodPostal(id, CodPos);
      }
      catch(e){
         return errReturn(e, "Error al modificar edad del jugador");
      }
   }
}
```
Es recomendable aplicar los principios SOLID para asegurar la mantebilidad y la economía de código a futuro.

Los principios SOLID son:

- Single Responsability Principle (Principio de Responsabilidad Única): Una clase debe tener una única responsabilidad y debe estar abierta a extensión pero cerrada a modificación.

- Open-Closed Principle (Principio de Abierto-Cerrado): Las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas a la extensión pero cerradas a la modificación.

- Liskov Substitution Principle (Principio de Sustitución de Liskov): Las entidades de software (clases, módulos, funciones, etc.) deben ser sustituibles por instancias de sus subtipos sin alterar la correctitud del programa.

- Interface Segregation Principle (Principio de Segregación de Interfaces): Las interfaces de software (clases, módulos, funciones, etc.) deben ser lo más pequeñas posibles.

- Dependency Inversion Principle (Principio de Inversión de Dependencias): Las entidades de software (clases, módulos, funciones, etc.) deben depender de abstracciones y no de implementaciones.



## Implementado seguridad

Para implementar un sistema de autentificacion y autorizacion se realizan los siguientes pasos:
Primero se instalan los paquetes necesarios que permiten aplicar la seguridad a un sistema y se hace con los siguientes comandos:
```
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
```
![instalacion3](https://user-images.githubusercontent.com/118281449/204422793-743cd735-3eb6-42a8-a6c1-5ae91adabc5a.png)

Segundo NestJS permite la autenticación, por lo cual dentro de la carpeta del proyecto se crea un modulo de autenticacion usando los siguientes comandos.
```
nest g module auth
nest g service auth
```
![autentificacion](https://user-images.githubusercontent.com/118281449/204423073-cd511aaa-e80a-49f2-a9c1-d0884a1e7dc5.png)

Se observara una nueva carpeta llamada auth dentro de src y contendra los archivos auth.module.ts, auth.service.ts y auth.service.spec.ts. Este ultimo contiene las pruebas unitarias del servicio, el cual no se utilizara.

![auth](https://user-images.githubusercontent.com/118281449/204424328-33f6773d-9f4a-4392-9f0a-5eadc5b2ae76.png)

Asi mismo se creará un módulo para gestionar usuarios, con los comandos:
```
nest g module users
nest g service users
```
![modges](https://user-images.githubusercontent.com/118281449/204425089-1dbb6f0e-2224-4ea8-9ebd-aa0776e421e5.png)

Seguido a esto se implementa el servicio de usuarios.
```

import { Injectable } from '@nestjs/common';

export type User = {
   userId: number,
   username: string,
   password: string
};

@Injectable()
export class UsersService {
   private readonly users: User[] = [
      {
         userId: 1,
         username: 'eduardo',
         password: 'muce',
      },
      {
         userId: 2,
         username: 'jose',
         password: 'muce',
      },
   ];

   /**
      * Recupera los datos del usuario
      * @param username Nombre de usuario
      * @returns 
      */
   async findOne(username: string): Promise<User | undefined> {
      return this.users.find(user => user.username === username);
   }
}
```

Para que el servicio de usuarios este disponible en otros servicios es necesario configuran los modulos, en este caso se modifica el archivo users.module.ts de la siguiente manera:
```
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```
En la carpera usrs se encuentra ptro archivo denominado users.service.spec.ts, el cual contiene las pruebas unitarias del servicio, el cual no se utilizara.

Para implementar un servicio de autenticacion es decir que valide que el usuario y contraseña sean correctos, se modifica el archivo ```auth.service.ts``` de la siguiente manera:
```
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
constructor(private usersService: UsersService) {}

   async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      if (user && user.password === pass) {
         const { password, ...result } = user;
         return result;
      }
      return null;
   }
}
```

Para la gestion de usuarios se modifica el archivo ```auth.module.ts``` de la siguiente manera:
```
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
   imports: [UsersModule], // Importa el módulo de usuarios
   providers: [AuthService]
})
export class AuthModule {}

```
Para validar a los usuarios se necesita crear un nuevo archivo denominado ```local.strategy.ts``` que se encuentra en la carpeta **auth** con en siguiente contenido.

```
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: AuthService) {
      super();
   }

   async validate(username: string, password: string): Promise<any> {
      const user = await this.authService.validateUser(username, password);
      if (!user) {
         throw new UnauthorizedException();
      }
      return user;
   }
}
```

Ahora se debe configurar el módulo de autenticación para que utilice la estrategia de autenticación, para eso se modifica el archivo auth.module.ts
```
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
   imports: [UsersModule, PassportModule],
   providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
```
Finalmente realizado los anteriores pasos se necesita aplicar estos cambios al controlador, por lo tanto el controlador queda de la siguiente forma.
```
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CiudadesService } from '../../domain/services/Ciudades.service';

import { Ciudade2 } from '../../domain/models/Ciudades2.model';
import { CiudadesController } from './Ciudades.controller';

import { AuthGuard } from '@nestjs/passport';

const errReturn = (e: Error, message: string) => {
  return {
    message: message,
    error: e
  }
}

@Controller()
export class CiudadesControllerImpl implements CiudadesController {
 
  constructor(@Inject('TicketFullService') private readonly ciuService: CiudadesService) { }

  @UseGuards(AuthGuard)
  @Get()
  listCiudades() {
    try{
      return this.ciuService.listar();
    }
    catch(e){
      return errReturn(e, "Error al listar ciudades");
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() datos: Ciudade2) {
    try{
      return this.ciuService.crear(datos);
    }
    catch(e){
      return errReturn(e, "Error al crear ciudad");
    }
  }
  @UseGuards(AuthGuard)
  @Put(":id")
  update(@Body() datos: Ciudade2, @Param('id') id: number) {
    try{
      return this.ciuService.modificar(id, datos);
    }
    catch(e){
      return errReturn(e, "Error al modificar ciudad");
    }
  }
  @UseGuards(AuthGuard)
  @Delete(":id")
  delete(@Param('id') id: number) {
    try{
      return this.ciuService.eliminar(id);
    }
    catch(e){
      return errReturn(e, "Error al eliminar la ciudad");
    }
  }
  @UseGuards(AuthGuard)
  @Patch(":id/CodPostal/:CodPostal")
  cambiarCod(@Param('id') id: number, @Param('CodPostal') Cod: number) {
    try{
      return this.ciuService.cambiarCodPostal(id, Cod);
    }
    catch(e){
      return errReturn(e, "Error al modificar el codigo postal");
    }
  }
}
```
Y se reliaza su respectiva prueba:

![Get Prac3](https://user-images.githubusercontent.com/118281449/205732404-c8dbb2ff-b2eb-473e-b05b-c49b884b8c85.png)

la solicitud GET como se puede observar tiene un error 401. Esto pasa por que se prohibe el servicio por falta de autenticacion de usuario.


## Autenticación con JWT

Para esto primero se instala el paquete @nestjs/jwt con los siguientes comandos:
```
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

![Instalacion @nets](https://user-images.githubusercontent.com/118281449/204701705-ee3a87b5-4430-4369-a773-98af9ca44a65.png)


Se agrega el metodo login y algunas dependencias al archivo **auth.service.ts** por lo cual queda:
```
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
      private usersService: UsersService,
      private jwtService: JwtService
   ) {}

   async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      if (user && user.password === pass) {
         const { password, ...result } = user;
         return result;
      }
      return null;
   }
 ```
 
Se implementa un endpoint para convertir las credenciales del usuario en un token JWT y de esta manera permirir el inicio de secion por parte de los usuarios. Para esto se crea un nuevo archivo denominado **auth.controller.ts** con el siguiente contenido.
```
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

   @UseGuards(AuthGuard('local'))
   @Post('login')
   async login(@Request() req) {
      return this.authService.login(req.user);
   }
}
```

Para guardar la contraseña JWT se crea un archivo denominado **constants.ts** que tendar la siguiente constante.

```
export const jwtSecret = 'secretKey';
```
Posteriormente se adiciona una estrategia para permitirle Passport identificar donde se encontrará el token en una petición y cual es el secreto que permite validarlo. Se crea el archivo **jwt-auth.strategy.ts**:
```
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: jwtSecret,
      });
   }

   async validate(payload: any) {
      return { userId: payload.sub, username: payload.username };
   }
}
```
Ahora se modifica auth.module.ts para configurar correctamente el servicio de JWT:
```
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
   controllers: [AuthController],
   imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
         secret: "este es el secreto para generar JWT",
         signOptions: { expiresIn: '60m' },
      }),
   ],
   providers: [AuthService, LocalStrategy],
   exports: [AuthService],
   })
export class AuthModule {}
```
Ahora es necesario implementar un guardia para que intercepte un token JWT y lo valide para proteger a los enpoints que sean de nuestro interés. Creamos en la carpeta auth un archivo llamado jwt-auth.guard.ts.
```
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

Se registran los nuevos componentes en el módulo auth.module.ts:
```
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { jwtSecret } from './constants';

@Module({
   controllers: [AuthController],
   imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
         secret: jwtSecret,
         signOptions: { expiresIn: '60m' },
      }),
   ],
   providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
   exports: [AuthService],
   })
export class AuthModule {}
```
Si todo es correcto, será posible llamar al endpoint que genera un token JWT, esto se podrá validar con CURL con el siguiente comando:

```
curl -X POST http://localhost:3000/auth/login -d '{"username": "eduardo", "password": "muce" }' -H "Content-Type: application/json"
```
![token](https://user-images.githubusercontent.com/118281449/205735079-61030af8-f630-4a11-99f4-f989d1e8cae3.png)

La terminal responderá con un token. Guarde este token para usarlo en los siguientes pasos.

Se protegen los endpoints que sea necesario, para lo cual el controlador queda de la siguiente manera.
```
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CiudadesServiceImpl  } from '../../domain/services/Ciudades2.service';

import { Ciudade2 } from '../../domain/models/Ciudades2.model';
import { CiudadesController } from './Ciudades.controller';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

const errReturn = (e: Error, message: string) => {
  return {
    message: message,
    error: e
  }
}

@Controller()
export class CiudadesControllerImpl implements CiudadesController {
  constructor(@Inject('CiudadesServiceImpl') private readonly CiudadService: CiudadesServiceImpl ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  listCiudades() {
    try{
      return this.CiudadService.list();
    }
    catch(e){
      return errReturn(e, "Error al listar ciudades");
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() datos: Ciudade2) {
    try{
      return this.CiudadService.create(datos);
    }
    catch(e){
      return errReturn(e, "Error al crear ciudad");
    }
  }
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(@Body() datos: Ciudade2, @Param('id') id: number) {
    try{
      return this.CiudadService.update(id, datos);
    }
    catch(e){
      return errReturn(e, "Error al modificar la ciudad");
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete(@Param('id') id: number) {
    try{
      return this.CiudadService.delete(id);
    }
    catch(e){
      return errReturn(e, "Error al eliminar la Ciudad");
    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch(":id/regreso/:regreso")
  updateReturn(@Param('id') id: number, @Param('regreso') regreso: number) {
    try{
      return this.CiudadService.updateReturn(id, regreso);
    }
    catch(e){
      return errReturn(e, "Error al modificar Codigo Postal");
    }
  }
}
```
Se realizan pruebas en la herramienta Postman
En los endpoint protegidos con JWT es necesario usar un el token que anteriormente se solicito.

Para configurar el token en Postman, se elige la opcion de Authorization, en esta se escoge la opcion Bearer Token y se copea el token en la casilla ubicada a la derecha.
- **Metodo GET**
![get prac3 final](https://user-images.githubusercontent.com/118281449/205736196-305e5910-56db-4e3d-9dce-02ca22a18a73.png)

- **Metodo POST**
![Post prac3](https://user-images.githubusercontent.com/118281449/205736230-7a0af492-ff7d-4711-bb7b-df32f2e4e8a0.png)

## PRACTICA 4
El codigo de esta practica esta la rama pract4 y documentada en esta seccion.

Para el desarrollo de esta practica se utiliza el servicio de hosting gratuido Deta, que la prioridad seria descarga Deta con el siguiente comando:
```
curl -fsSL https://get.deta.dev/cli.sh | sh
```
![deta](https://user-images.githubusercontent.com/118281449/205738668-c3ac73df-589a-4d32-9d09-07b9a6e3d000.png)

Agregando la variable de entorno:
```
  echo "export PATH=~/.deta/bin:$PATH" >> ~/.bashrc

  source ~/.bashrc
```
Se inicia sesion en Deta ejecutando
```
 deta login
```
Se ejecutará su navegador por defecto y se le pedirá que inicie sesión en su cuenta de Deta. Si no tiene una cuenta, puede crear una en el siguiente link.
```
https://web.deta.sh/signup
```
Luego se crea un punto de entrada de la aplicación, para lo cual se crea un archivo **index.ts** dentro de la carpeta src de nuestro proyecto. El archivo debe contener el siguiente contenido.
```
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const createNestServer = async (expressInstance) => {
const app = await NestFactory.create(
   AppModule,
   new ExpressAdapter(expressInstance),
);

return app.init();
};

export default createNestServer;
```
Igualmente en la raiz de nuestro proyecto crear un archivo **index.js** con el siguiente contenido.
```
const express = require('express');
const createServer = require('./dist/index').default;

const app = express();
let nest;

app.use(async (req, res) => {
if (!nest) {
   nest = express();
   await createServer(nest);
}
return nest(req, res);
});

module.exports = app;
```
Se compila el proyecto mediante el siguiente comando. Este comando se debe ejecuitar en la carpeta raiz de nuestro proyecto.
```
nest build
```
Se publica la aplicacion para lo cual se ejecuta.
```
 deta new --node ./server/
```
![deta server](https://user-images.githubusercontent.com/118281449/205746818-35fd5c8d-baad-4cca-a26d-515862d4b18b.png)

Para actualizar la aplicación ejecutamos en la terminal:
```
  deta update
```
Se desplega la aplicacion mediante el comando.
```
deta deploy server
```
Se activan los logs de la aplicación, para lo cual en la raiz de nuestro proyecto se ejecuta el comando.
```
deta visor enable
```
Nos dirigimos a la pagina de Deta donde anteriormente se habia iniciado sesion, ahi nos ubicamos en la seccion de micros donde se observara una opcion con el nombre de nuestro proyecto en la cual se encontrara la url del servicio desplegado.

![detaWeb](https://user-images.githubusercontent.com/118281449/205748959-f09221b7-b3e3-4257-b357-eb467c2ee2d9.png)

Al abrir la url aparecera lo siguiente. lo cual corresponde a lo que se obtiene al implementar un metodo GET.
![detaweb2](https://user-images.githubusercontent.com/118281449/205749748-6dd69f59-a868-4be5-852f-5b605342d7a1.png)

## 2. Conectado a una base de datos.
En este caso se empleara una base de datos no relacional orientada a documentos llamada MongoDB.

Para crear nuestra base de datos seguir los siguientes pasos:

- Crea una cuenta gratuita en MongoDB Atlas, para lo cual se ingresa en el siguiente link: 
```
https://www.mongodb.com/atlas/database
```
- Presione el botón Build a Cluster y seleccione la opción Free Tier, se recomienda elegir AWS como proveedor de infraestructura y presione el botón Create Cluster.

- Una vez creado el cluster, es necesario crear un usuario, En los campos correspondientes ingrese un nombre de usuario y una contraseña y Presione el botón Add User.
- Seguido a esto para facilitar la conexión la base de datos se recomienda ingresar una IP Address y en el campo asigne el valor 0.0.0.0, finalmente presione el botón Add Entry.
- Finalmente se guarda y despliegua haciendo click en el botón Finish and close. En este punto ya tendrá una base de datos MongoDB lista para ser utilizada.

Seguido a esto se instalan las dependencias de TypeORM y MongoDB con el siguiente comando:
```
npm install --save @nestjs/typeorm typeorm mongodb
```
En el panel de mongo atlas, en la sección Connect seleccione la opción Connect your application. Se Copia la url de conexión y reemplaza el valor de la variable MONGO_URL en el archivo ~/Documents/Servidores/server/src/app.module.ts por la url de conexión.

Se modifica el archivo src/app.module.ts para que quede de la siguiente manera:
```
import { Module } from '@nestjs/common';
import { CiudadesControllerImpl  } from './Ciudades/adapters/controllers/Ciudades2.controller';
import { CiudadesServiceImpl } from './Ciudades/domain/services/Ciudades2.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadesEntity } from './Ciudades/domain/entities/ciudades.entity'


@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://eduardoj:4muce2001@cluster0.kkrzcn8.mongodb.net/?retryWrites=true&w=majority',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true, // Solo para desarrollo
      logging: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([CiudadesEntity])
  ],
  controllers: [CiudadesControllerImpl],
  providers: [
    {
      provide: 'CiudadesService',
      useClass: CiudadesServiceImpl,
    }
  ],
})
export class AppModule {}

```

Se crea un nuevo archivo Ciudades.entity.ts en el directorio src/ciudades/domain/entities, donde ciudades es el nombre de nuestra entidad. El archivo queda.
```
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('Ciudad')
export class CiudadesEntity {
   @ObjectIdColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   pais: string;

   @Column()
   Cod: number;
}
```
Se agrega el constructor del servicio en el archivo CiudadesImpl.service.ts que se encuentra en la carpeta src/ciudades/domain/services

```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, MongoRepository, UpdateResult } from 'typeorm';
import { CiudadesEntity } from '../entities/ciudades.entity';
//import { Ciudade2 } from '../models/Ciudades2.model';
import { CiudadesService } from './Ciudades.service';

@Injectable()
export class CiudadesServiceImpl implements CiudadesService {
  constructor(
    @InjectRepository(CiudadesEntity)
    private repository: MongoRepository<CiudadesEntity>,
  ) {}

  public async list(): Promise<CiudadesEntity[]> {
    return await this.repository.find();
  }
 
  public async create(ciudadesData: CiudadesEntity): Promise<InsertResult> {
    const newCiudad = await this.repository.insert(ciudadesData);
    return newCiudad;
  }
 
  public async update(
    id: string,
    ciudadesData: CiudadesEntity,
  ): Promise<UpdateResult> {
    const updatedCiudades = await this.repository.update(id, ciudadesData);
    return updatedCiudades;
  }
 
  public async delete(id: string): Promise<boolean> {
    const deleteResult = await this.repository.delete(id);
    return deleteResult.affected > 0;
  }
 
  public async updateReturn(id: string, retorno: number): Promise<UpdateResult> {
    const updatedCiudades = await this.repository.update(id, { Cod: retorno });
    return updatedCiudades;
  }
}

```
Finalmente se ejecuta el proyecto con el siguiente comando.
```
npm run start:dev
```
![final](https://user-images.githubusercontent.com/118281449/205787233-07e18517-ae75-4a2f-957e-bed8fd9b94dd.png)

y se realizan las pruebas




