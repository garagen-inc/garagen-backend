import { AddressEntity } from 'src/address/address.entity';
import { AppointmentEntity } from 'src/appointment/appointment.entity';
import { AvailableSlotEntity } from 'src/available-slot/available-slot.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('workshop')
export class WorkshopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string;

  @Column({ name: 'workshop_image', type: 'varchar', nullable: true })
  workshopImage: string | null;

  @OneToOne(() => AddressEntity, (address) => address.workshop)
  address: AddressEntity;

  @OneToMany(() => UserEntity, (user) => user.workshop)
  @JoinColumn([{ name: 'id', referencedColumnName: 'workshop_id' }])
  users: UserEntity[];

  @OneToMany(() => AvailableSlotEntity, (availableSlot) => availableSlot.workshop)
  @JoinColumn([{ name: 'id', referencedColumnName: 'workshop_id' }])
  availableSlots: AvailableSlotEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.workshop)
  @JoinColumn([{ name: 'id', referencedColumnName: 'workshop_id' }])
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
