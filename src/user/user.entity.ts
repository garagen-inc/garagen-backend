import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'phone', type: 'varchar', nullable: false })
  phone: string;

  @Column({ name: 'cpf', type: 'varchar', nullable: false })
  cpf: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

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
