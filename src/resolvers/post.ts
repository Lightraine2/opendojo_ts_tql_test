import { MyContext } from 'src/types';
import {Resolver, Query, Ctx, Arg, Int} from 'type-graphql';
import {Post} from '../entities/Post';

// the resolver file determines what can be done with the objects in entities - crud functions. i.e. the post resolver dictates what is done with the post entity

@Resolver()
export class PostResolver {

    @Query(() => Post, {nullable: true})
    posts(
        //specify how to sort the data. i.e. if you search by 'id' it will find one that matches the search param
            // e.g.
        // post(id: 1)
        @Arg('id', () => Int) id: number,
        @Ctx() {em}: MyContext): Promise<Post | null> {
        return em.findOne(Post, {id});
}
}