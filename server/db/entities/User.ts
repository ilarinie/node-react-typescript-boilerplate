import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword = async () => {
        if (this.password) {
            const hash = await bcrypt.hash(this.password, 11);
            this.password = hash;
        }
    };

    isPassword = async (password: string): Promise<boolean> => {
        const match = await bcrypt.compare(password, this.password);
        return match;
    };

    public static findByUsernameAndPassword = async (username: string, password: string): Promise<User> => {
        return Promise.reject('');
    };
}
