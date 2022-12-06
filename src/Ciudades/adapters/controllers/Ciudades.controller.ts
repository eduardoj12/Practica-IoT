//import { Ciudade2 as CiudadesEntity  } from '../../domain/models/Ciudades2.model';
import { CiudadesEntity } from 'src/Ciudades/domain/entities/ciudades.entity';

export interface CiudadesController {
  /**
   *  Retorna la lista de Ciudades
   */
  listCiudades();

  /**
   * Crea una Ciudad
   * @param datos Objeto con datos de la Ciudad
   */
  create(datos: CiudadesEntity );

  /**
   * Modifica datos de una Ciudad
   * @param datos Objeto con datos de una Ciudad
   * @param id //Identificador único de una Ciudad
   */
  update(datos: CiudadesEntity , id: string);

  /**
   * Elimina una Ciudad
   * @param id Identificador único de una Ciudad
   */
  delete(id: string);

  /**
   * Cambia fecha de una Ciudad
   * @param id 
   * @param CodPostal
   */
  updateReturn(id: string, CodPostal: number);
}