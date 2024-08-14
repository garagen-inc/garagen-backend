import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('workshop')
export class WorkshopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string;

  @Column({ name: 'address_id' })
  address_id: string;

  @Column({ name: 'description' })
  user_id: string;

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: Date | null;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp with time zone',
    name: 'updated_at',
    update: true,
  })
  updatedAt: Date;
}
