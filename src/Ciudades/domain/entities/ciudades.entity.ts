import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('Ciudad')
export class CiudadesEntity {
   @ObjectIdColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   pais: string;

   @Column()
   Cod: number;
}