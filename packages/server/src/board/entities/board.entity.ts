import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Board extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	title: string;

	@Column({ type: 'text', nullable: true })
	content: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToMany(() => User, { eager: true })
	@JoinTable()
	likes: User[];

	@Column({ type: 'int', default: 0 })
	like_cnt: number;

	@OneToMany(() => Image, (image) => image.board, {
		eager: true,
	})
	images: Image[];

	@ManyToOne(() => User, (user) => user.boards, {
		eager: true,
		onDelete: 'CASCADE',
	})
	user: User;

	@Column({ type: 'varchar', length: 50, nullable: true })
	star: string;
}
