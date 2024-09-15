import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import  * as bcrypt from "bcrypt"
import { User } from "src/user/entities/user.entity";
import { Strategy } from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userservice: UserService) {
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string) {

        let user:User = await this.userservice.findbyemail(email);

        if (!user) {
            throw new UnauthorizedException('User not found by this :' + email)
        }

        let Password = bcrypt.compare(password,user.password)

        if(password){
            return user;
        }
        else{
            throw new UnauthorizedException("username or psssword is incorrect")
        }

    }

}