import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {

    //connect db, update migrations
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    
    // sample data creation commands
//    const post = orm.em.create(Post, {title: 'my first post'});
//    await orm.em.persistAndFlush(post);

//    const posts = await orm.em.find(Post, {});
//    console.log(posts);

    const app = express();
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
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

