import { Injectable } from '@nestjs/common';
import { Ciudade2 } from '../models/Ciudades2.model';
import { CiudadesService } from './Ciudades.service';

@Injectable()
export class CiudadesServiceImpl implements CiudadesService {

  private Ciudad: Ciudade2[] = [{
    name: "Palmira",
    pais: "Colombia",
    Cod: 309,
    Departamento: 'Valle'
  }]

  public list() : Ciudade2[] {
    return this.Ciudad
  }

  public create(ciu: Ciudade2): Ciudade2 {
    this.Ciudad.push(ciu);
    return ciu;
  }

  public update(id: number, ciu: Ciudade2): Ciudade2 {
      this.Ciudad[id] = ciu
      return this.Ciudad[id];
  }

  public delete(id: number): boolean {
    const CiudadAntes = this.Ciudad.length;
    this.Ciudad = this.Ciudad.filter((val, index) => index != id);
    if(CiudadAntes == this.Ciudad.length){
      return false;
    }
    else{
      return true;
    }
  }

   public updateReturn(id: number, retorno: number): Ciudade2 {
      this.Ciudad[id].Cod = retorno;
      return this.Ciudad[id];
   }

}