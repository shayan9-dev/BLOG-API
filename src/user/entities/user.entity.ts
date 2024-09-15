import { Comment } from "src/comment/entities/comment.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    username:string
    
    @Column()
    email:string

    @Column()
    password:string

    @OneToMany(()=> Post,(post)=>post.user)
    post:Post[]

    @OneToMany(()=>Comment,(comment)=>comment.user)
    comment:Comment[]
}
