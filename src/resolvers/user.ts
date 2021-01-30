import { MyContext } from 'src/types';
import {Resolver, Mutation, Arg, InputType, Field, Ctx, ObjectType, Query} from 'type-graphql';
import { User } from "../entities/User";
import argon2 from 'argon2';
import {EntityManager } from '@mikro-orm/postgresql';

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, {nullable: true})
    user?: User;
}


@Resolver()
export class UserResolver {

    @Query(() => User, {nullable: true})
   async me(
        @Ctx() { req, em}: MyContext
    ) {
        // not logged in
       if (!req.session.userId) {
           return null
       }

       const user = await em.findOne(User, {id: req.session.userId});
       return user;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em, req}: MyContext
    ): Promise<UserResponse> {

        if (options.username.length <= 2) {
            return {
                errors: [{
    field: "username",
    message: "length must be greater than 2",
                }]
            }
        }
        if (options.password.length <= 6) {
            return {
                errors: [{
    field: "password",
    message: "length must be greater than 6",
                }]
            }
        }

        const hashedPassword = await argon2.hash(options.password)

        try {
           const [user] = await (em as EntityManager).createQueryBuilder(User).getKnexQuery().insert({
            username: options.username, 
            password: hashedPassword,
            created_At: new Date(),
            updated_At: new Date(), 
            });

        } catch (err) {
            //|| err.detail.includes("already exists")) {
                //duplicate username error

            if (err.code === '23505') { 

                return {
                    errors: [
                        {
                        field: "username",
                        message: "username already exists",
                    },
                ],
                };
            }
            
        }

        // return session cookie - user is logged in

        req.session.userId = user.id;

        return {user};
    }
    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() {em, req }: MyContext
    ): Promise <UserResponse> {
        const user = await em.findOneOrFail(User, {username: options.username});
        if (!user) {
            return {
                errors: [{
                    field: "username",
                    message: "invalid credentials",
                },
            ],
            };
        }
        const valid = await argon2.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "invalid credentials", 
                    },
                ],
            };
        }
        
        req.session!.userId = user.id;

        return {
            user,
        };
    }
}