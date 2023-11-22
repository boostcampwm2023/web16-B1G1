import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Board extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	title: string;

	@Column({ type: 'text', nullable: true })
	content: string;

	@Column({ type: 'varchar', length: 50, nullable: false })
	author: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column({ type: 'int', default: 0 })
	like_cnt: number;

	@OneToOne(() => Image, { nullable: true })
	@JoinColumn()
	image: number;

	@ManyToOne(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
	user: User;
}
