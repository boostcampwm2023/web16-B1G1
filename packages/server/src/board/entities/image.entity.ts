import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, nullable: false })
	mimetype: string;

	@Column({ type: 'varchar', length: 50, nullable: false })
	filename: string;

	@Column({ type: 'varchar', length: 50, nullable: false })
	path: string;

	@Column({ type: 'int', nullable: false })
	size: number;

	@CreateDateColumn()
	created_at: Date;
}
