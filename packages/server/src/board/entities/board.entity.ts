import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@Column({ type: 'int', default: 0 })
	like_cnt: number;
}
