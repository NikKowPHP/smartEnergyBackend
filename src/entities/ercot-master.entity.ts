import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ErcotMaster')
export class ErcotMaster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

}