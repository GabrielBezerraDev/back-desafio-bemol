import { User } from './../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

@Entity()
@Index(['userId', 'timestamp']) 
export class ChatHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text') 
    content: string;

    @Column('text') 
    responseIA: string;

    @Column({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP' 
    })
    timestamp: Date;

    @ManyToOne(() => User, (user) => user.chatHistories)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number; 

}