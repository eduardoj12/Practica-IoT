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