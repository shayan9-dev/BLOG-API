import { Comment } from "src/comment/entities/comment.entity"
import { User } from "src/user/entities/user.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"



@Entity('Posts')
export class Post {

    @PrimaryGeneratedColumn()
    id:string

    @Column()
    title:string

    @Column()
    des:string

    @ManyToOne(()=>User,(user)=>user.post)
    user:User

    @OneToMany(()=>Comment,(Pcomment)=>Pcomment.post)
    postcomment:Comment[]
}
