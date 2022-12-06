import { InsertResult, UpdateResult } from 'typeorm';
import { CiudadesEntity } from '../entities/ciudades.entity';

export interface CiudadesService {

   list(): Promise<CiudadesEntity[]>;
 
   create(ciudad: CiudadesEntity): Promise<InsertResult>;
 
   update(id: string, ciudadData: CiudadesEntity): Promise<UpdateResult>;
 
   delete(id: string): Promise<boolean>;
 
   updateReturn(id: string, retorno: number): Promise<UpdateResult>;
 }