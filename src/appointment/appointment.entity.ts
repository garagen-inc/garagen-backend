import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { WorkshopEntity } from 'src/workshop/workshop.entity';

@Entity('appointment')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_time', type: 'text', nullable: false })
  start_time: string; // 00:00

  @Column({ name: 'final_time', type: 'text', nullable: false })
  final_time: string; // 00:00

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'appointment_date', type: 'text', nullable: false })
  appointment_date: string; // dd/mm/yyyy

  @ManyToOne(() => UserEntity, (user) => user.appointments)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;

  @Column({ name: 'workshop_id' })
  workshop_id: number;

  @ManyToOne(() => WorkshopEntity, (workshop) => workshop.appointments)
  @JoinColumn([{ name: 'workshop_id', referencedColumnName: 'id' }])
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
