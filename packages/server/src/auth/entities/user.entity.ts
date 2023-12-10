import { Board } from '../../board/entities/board.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { ShareLink } from './share-link.entity';
import { UserShareStatus } from '../enums/user.enum';

@Entity()
@Index('IDX_FULLTEXT_NICKNAME', ['nickname'], { fulltext: true })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, nullable: false, unique: true })
	username: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	password: string;

	@Column({ type: 'varchar', length: 50, nullable: false, unique: true })
	nickname: string;

	@Column({
		type: 'varchar',
		length: 50,
		nullable: true,
		default: UserShareStatus.NEW,
	})
	status: UserShareStatus;

	@CreateDateColumn()
	created_at: Date;

	@OneToMany(() => Board, (board) => board.user, {
		eager: false,
		onDelete: 'CASCADE',
	})
	boards: Board[];

	@OneToOne(() => ShareLink, (shareLink) => shareLink.user, {
		eager: false,
		onDelete: 'SET NULL',
	})
	shareLink: ShareLink;

	@Column({ type: 'varchar', length: 50, nullable: true })
	galaxy: string;
}
