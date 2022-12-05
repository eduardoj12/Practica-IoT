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

