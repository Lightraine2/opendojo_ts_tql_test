import { MyContext } from 'src/types';
import {Resolver, Query, Ctx, Arg, Int, Mutation} from 'type-graphql';
import {Post} from '../entities/Post';

// the resolver file determines what can be done with the objects in entities - crud functions. i.e. the post resolver dictates what is done with the post entity

@Resolver()
export class PostResolver {

    @Query(() => Post, {nullable: true})
    post(
        //specify how to sort the data. i.e. if you search by 'id' it will find one that matches the search param
            // e.g.
        // post(id: 1)
        @Arg('id') id: number,
        @Ctx() {em}: MyContext): Promise<Post | null> {
        return em.findOne(Post, {id});
    }

    @Mutation(() => Post )
    async createPost(

        @Arg('title') title: string,
        @Ctx() {em}: MyContext): Promise<Post> {
        const post = em.create(Post, {title})
        await em.persistAndFlush(post)
        return post
    }
    
    @Mutation(() => Post, {nullable: true} )
    async updatePost(
        // if something is nullable, you must declare the type
        @Arg("id") id: number,
        @Arg("title", () => String, {nullable:true}) title: string,
        @Ctx() {em}: MyContext): Promise <Post | null> {
        const post = await em.findOne(Post, {id});
        if (!post) {
            return null;
        }    
        if (typeof title !== "undefined") {
        post.title = title;            
        await em.persistAndFlush(post);
        }

        return post;
    }

    @Mutation(() => Boolean )
    async deletePost(
        // if something is nullable, you must declare the type
        @Arg("id") id: number,
        @Ctx() {em}: MyContext): Promise <boolean> {
        await em.nativeDelete(Post, { id });    
        return true;
    }
}