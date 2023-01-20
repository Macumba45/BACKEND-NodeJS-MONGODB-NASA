import { connectToDb } from './src/services/db.js';
import express from 'express';
import bodyParser from 'body-parser';
// import { apiCallApod, apiCallRovers } from './src/services/api.js';
import routerApod from './src/routes/apod.js';
import routerRover from './src/routes/rover.js';
import routerUser from './src/routes/user.js';
import routerAuth from './src/routes/auth.js'
import routerAll from './src/routes/all.js';
import routerApodApi from './src/routes/syncApi.js';
import routerApodApiRovers from './src/routes/syncApiRovers.js';
import Apod from './src/models/apod.js';
import Rover from './src/models/rover.js';
import User from './src/models/user.js';
import dotenv from 'dotenv';

dotenv.config();



const startApp = async () => {

    express()
    // apiCallApod()
    // apiCallRovers()

    const deleteAllApod = function () {

        Apod.deleteMany({}, function (err) {
            if (err) console.log(err);
            console.log("Successful deletion Apod");
        });

    }
    deleteAllApod()

    const deleteAllRovers = function () {

        Rover.deleteMany({}, function (err) {
            if (err) console.log(err);
            console.log("Successful deletion Rover");
        });

    }
    deleteAllRovers()

    const deleteAllUsers = function () {

        User.deleteMany({}, function (err) {
            if (err) console.log(err);
            console.log("Successful deletion Users");
        });

    }
    deleteAllUsers()


    const app = express();
    const port = 8000

    app.use(bodyParser.json());
    app.use(express.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use('/apod', routerApod);
    app.use('/rover', routerRover);
    app.use('/sync-api', routerApodApi);
    app.use('/sync-apiRovers', routerApodApiRovers);
    app.use('/user', routerUser)
    app.use('/auth', routerAuth)
    app.use('/all', routerAll);

    try {
        await connectToDb()
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


startApp()
