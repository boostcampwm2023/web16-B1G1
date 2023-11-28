import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity()
@Index('idx_filename', ['filename'])
export class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, nullable: false })
	mimetype: string;

	@Column({ type: 'varchar', length: 50, nullable: false })
	filename: string;

	@Column({ type: 'int', nullable: false })
	size: number;

	@CreateDateColumn()
	created_at: Date;

	@ManyToOne(() => Board, (board) => board.images, { eager: false })
	board: Board;
}
