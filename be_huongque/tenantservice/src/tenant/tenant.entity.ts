import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, IsNull } from 'typeorm';

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

  @Column({ name: 'ownerId', type: 'uuid', nullable: true })
  owner: string;

  @Column({ nullable: true })
  organization_info: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
