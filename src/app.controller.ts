import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

interface Persona {
  nombre: string,
  apellido: string,
  edad: number
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private personas : Persona[] = [{
    nombre: "Leo",
    apellido: "Messi",
    edad: 35
  }]

  @Get()
  getHello(): Persona[] {
    return this.personas;
  }

  @Post()
  crear(@Body() datos: Persona): Persona {
    this.personas.push(datos);
    return datos;
  }

  @Put(":id")
  modificar(@Body() datos: Persona, @Param('id') id: number): Persona | string {
    try{
    this.personas[id] = datos
    return this.personas[id];
    }
    catch{
      return `No fue posible modificar al usuario en la posición ${id}`
    }
  }

  @Delete(":id")
  eliminar(@Param('id') id: number){
    try{
      this.personas = this.personas.filter((val, index) => index != id);
      return true;
    }
    catch{
      return false;
    }
  }

  @Patch(":id/edad/:edad")
  cambiarEdad(@Param('id') id: number, @Param('edad') edad: number): Persona | string{
    try{
      this.personas[id].edad = edad;
      return this.personas[id];
    }
    catch{
      return `No fue posible modificar al usuario en la posición ${id}`
    }
  }
}