import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, nullable: false, unique: true })
	username: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	password: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@Column({ type: 'varchar', length: 50, nullable: false, unique: true })
	nickname: string;

	@Column({ type: 'json', nullable: false })
	galaxy_style: string;
}
