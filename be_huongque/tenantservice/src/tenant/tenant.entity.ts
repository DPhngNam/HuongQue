import { Owner } from 'src/owner/owner.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  ShopDescription: string;

  @ManyToOne(()=>Owner)
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
