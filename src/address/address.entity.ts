import { WorkshopEntity } from 'src/workshop/workshop.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'street', type: 'varchar', nullable: false })
  street: string;

  @Column({ name: 'city', type: 'varchar', nullable: false })
  city: string;

  @Column({ name: 'zip_code', type: 'varchar', nullable: false })
  zip_code: string;

  @Column({ name: 'state', type: 'varchar', nullable: false })
  state: string;

  @OneToOne(() => WorkshopEntity, (workshop) => workshop.address)
  workshop: WorkshopEntity;

  @DeleteDateColumn({ type: 'text', name: 'deleted_at' })
  deletedAt: Date | null;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'text',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'text',
    name: 'updated_at',
    update: true,
  })
  updatedAt: Date;
}
