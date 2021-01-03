import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Dojo } from "./entities/Dojo";
import microConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { DojoResolver } from "./resolvers/dojo";

const main = async () => {

    //connect db, update migrations
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    
    // sample data creation commands
//    const dojo = orm.em.create(Dojo, ({id: 1, title: 'Bath SKY Taekwondo', styles: 'WT Taekwondo'}))

//    await orm.em.persistAndFlush(dojo);

//    const dojos = await orm.em.find(Dojo, {});
//    console.log(dojos);

    const app = express();
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, DojoResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({app});
    
    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    });

    app.get('/', (req, res) => {
        res.send("Hello world!");
    });



};

main().catch((err) => {
    console.error(err)
});

