import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id:string

    @Column()
    message:string

    @ManyToOne(()=>User,(user)=>user.comment)
    user:User

    @ManyToOne(()=>Post,(post)=>post.postcomment)
    post:Post
}
