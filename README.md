# PRACTICA 1
**Por** *Eduardo Muñoz*

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
