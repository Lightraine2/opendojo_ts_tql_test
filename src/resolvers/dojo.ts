import { MyContext } from 'src/types';
import {Resolver, Query, Ctx, Arg, Int} from 'type-graphql';
import {Dojo} from '../entities/Dojo';

// the resolver file determines what can be done with the objects in entities - crud functions. i.e. the post resolver dictates what is done with the post entity

@Resolver()
export class DojoResolver {

    @Query(() => Dojo, {nullable: true})
    dojos(
        //specify how to sort the data. i.e. if you search by 'id' it will find one that matches the search param
            // e.g.
        // post(id: 1)
        @Arg('id', () => Int) id: number,
        @Ctx() {em}: MyContext): Promise<Dojo | null> {
        return em.findOne(Dojo, {id});
}
}