import { Ciudade2 } from "../models/Ciudades2.model";

export interface CiudadesService {

   /**
    * Retorna la lista de ciudades
    */
   list(): Ciudade2[];

   /**
    * Crea una nueva ciudad
    * @param ciudades datos
    * @return Nueva Ciudad
    */
   create(ciudades: Ciudade2): Ciudade2;

   /**
    * Actualiza datos de la ciudad
    * @param id Identificador único 
    * @param ciudades2 datos de la ciudad
    * @return ciudad modificado
    */
   update(id: number, ciudades2: Ciudade2): Ciudade2

   /**
    * Eliminar ciudad
    * @param id Identificador único
    * @return True si eliminó la ciudad
    */
   delete(id: number): boolean

   /**
    * Cambia el codigo postal de una ciudad
    * @param id Identificador único 
    * @param Codigo nuevo codigo postal 
    */
   updateReturn(id: number, Codigo: number): Ciudade2
}