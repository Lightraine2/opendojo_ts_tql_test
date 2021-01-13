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
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from "./types";



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

    let RedisStore = connectRedis(session)
let redisClient = redis.createClient()

app.use(
    session({
        name: 'qid',

        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
            
        }),
        cookie: {
            maxAge: 1000 * 15,
            sameSite: 'lax',
            httpOnly: true,
            secure: __prod__
        },
        secret: '123456789qwerty',
        resave: false,
    })
)

    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, DojoResolver, UserResolver],
            validate: false
        }),
        context: ({req, res}): MyContext => ({ em: orm.em, req, res }),
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

