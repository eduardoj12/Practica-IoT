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