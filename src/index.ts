import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from 'express';

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

