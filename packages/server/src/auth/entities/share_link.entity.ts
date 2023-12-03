import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ShareLink {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 200, nullable: false, unique: true })
	link: string;

	@OneToOne(() => User, (user) => user.id, {
		eager: false,
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: number;
}
