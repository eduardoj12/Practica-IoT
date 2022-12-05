import { Ciudade2 } from '../../domain/models/Ciudades2.model';

export interface CiudadesController {
  /**
   *  Retorna la lista de Ciudades
   */
  listCiudades();

  /**
   * Crea una Ciudad
   * @param datos Objeto con datos de la Ciudad
   */
  create(datos: Ciudade2);

  /**
   * Modifica datos de una Ciudad
   * @param datos Objeto con datos de una Ciudad
   * @param id Identificador único de una Ciudad
   */
  update(datos: Ciudade2, id: number);

  /**
   * Elimina una Ciudad
   * @param id Identificador único de una Ciudad
   */
  delete(id: number);

  /**
   * Cambia fecha de una Ciudad
   * @param id 
   * @param CodPostal
   */
  updateReturn(id: number, CodPostal: number);
}