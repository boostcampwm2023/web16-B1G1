import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
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

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToMany(() => User, { eager: true })
	@JoinTable()
	likes: User[];

	@Column({ type: 'int', default: 0 })
	like_cnt: number;

	@OneToOne(() => Image, { nullable: true })
	@JoinColumn()
	image: number;

	@ManyToOne(() => User, (user) => user.boards, {
		eager: true,
		onDelete: 'CASCADE',
	})
	user: User;
}
