import { isInt, IsNotEmpty, IsString, Length } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Length(8)
    @IsNotEmpty()
    @IsString()
    @Column()
    cep: string

    @Length(50)
    @IsNotEmpty()
    @IsString()
    @Column()
    state: string;

    @Length(50)
    @IsNotEmpty()
    @IsString()
    @Column()
    municipality: string;

    @Length(50)
    @IsNotEmpty()
    @IsString()
    @Column()
    address: string;

    @OneToOne(() => User, (user) => user.address)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @Column()
    houseNumber: number;



}
