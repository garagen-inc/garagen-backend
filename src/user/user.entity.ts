import { AppointmentEntity } from 'src/appointment/appointment.entity';
import { WorkshopEntity } from 'src/workshop/workshop.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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

  @Column({ name: 'workshop_id', nullable: true })
  workshop_id?: number;

  @ManyToOne(() => WorkshopEntity, (workshop) => workshop.users)
  @JoinColumn([{ name: 'workshop_id', referencedColumnName: 'id' }])
  workshop: WorkshopEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.user)
  @JoinColumn([{ name: 'id', referencedColumnName: 'user_id' }])
  appointments: AppointmentEntity[];

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
