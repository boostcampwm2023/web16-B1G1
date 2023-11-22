import { Board } from 'src/board/entities/board.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, nullable: false, unique: true })
	username: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	password: string;

	@Column({ type: 'varchar', length: 50, nullable: false, unique: true })
	nickname: string;

	@CreateDateColumn()
	created_at: Date;

	@OneToMany(() => Board, (board) => board.user)
	boards: Board[];
}
