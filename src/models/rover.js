import mongoose from "mongoose";

export const roverSchema = new mongoose.Schema({

    camera: {
        name: {
            type: String,
        },
        full_name: {
            type: String,
        }
    },
    img_src: {
        type: String,
    },
    earth_date: {
        type: String,

    },
});

const Rover = mongoose.model('ApodApiRover', roverSchema);

export default Rover 
