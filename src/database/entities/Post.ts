import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn() id: number;
    @Column("varchar") title: string;
    @Column("varchar") content: string;
}