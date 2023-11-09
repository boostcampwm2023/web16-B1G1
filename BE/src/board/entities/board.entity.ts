import {
	Column,
	CreateDateColumn,
	Entity,
	Point,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Board {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	title: string;

	@Column({ type: 'text', nullable: true })
	content: string;

	@Column({ type: 'blob', nullable: true })
	image: Buffer;

	@Column({ type: 'json', nullable: false })
	star_style: string;

	@Column({ type: 'point', nullable: false })
	star_position: Point;

	@Column({ type: 'varchar', length: 50, nullable: false })
	author: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	modified_at: Date;
}
