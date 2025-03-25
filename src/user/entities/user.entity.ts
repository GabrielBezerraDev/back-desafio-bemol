import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ChatHistory } from 'src/chat-history/entities/chat-history.entity';
import { Address } from 'src/address/entities/address.entity';

@Entity()
@Unique(['email','cpf'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ChatHistory, (chat) => chat.user)
    chatHistories: ChatHistory[];

    @OneToOne(() => Address, (address) => address.user)
    address: Address;

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    @Column({ length: 100 })
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(11, 11)
    @Matches(/^\d+$/, { message: "CPF deve conter apenas números" })
    @Column({ unique: true, length: 11 })
    cpf: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({ unique: true, length: 255 })
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 128)
    @Column({ length: 255 })
    password: string;

}