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
