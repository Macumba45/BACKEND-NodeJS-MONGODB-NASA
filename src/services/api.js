import fetch from 'node-fetch';
import Apod from '../models/apod.js';
import Rover from '../models/rover.js';

async function apiCallApod() {


    const response = await fetch('https://api.nasa.gov/planetary/apod?start_date=2023-01-01&api_key=MHU6tgxe1jpiu8rvJUM6yPczfAbm2NueXnFKWAQI')
    const apods = await response.json()

    const newList = apods.map(apod => ({ title: apod.title, date: apod.date, explanation: apod.explanation, url: apod.url }));

    const arrApodCreation = []

    const apodFind = await Apod.find()

    for (const item of newList) {
        const exists = apodFind.find((existItem) => existItem.date === item.date)
        if (!exists) {
            arrApodCreation.push(item)
        }
    }

    if (arrApodCreation.length > 0) {
        await Apod.insertMany(arrApodCreation)
        console.log('Apod Inserted')
    }

    return [...apodFind, ...arrApodCreation]


}

async function apiCallRovers() {

    try {

        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=MHU6tgxe1jpiu8rvJUM6yPczfAbm2NueXnFKWAQI')
        const rovers = await response.json()
        const roverPhoto = rovers.photos
        const newList = roverPhoto.map(rover => ({ camera: rover.camera, img_src: rover.img_src, earth_date: rover.earth_date }));

        const arrRoverCreation = []
        const roverFind = await Rover.find()

        for (const item of newList) {
            const exists = roverFind.find(item => ({ camera: item.camera, img_src: item.img_src, earth_date: item.earth_date }));
            if (!exists) {
                arrRoverCreation.push(item)
            }
        }
        const allData = await Rover.insertMany(arrRoverCreation);

        return allData

    } catch (error) {
        console.log("DOCUMENTO YA EXISTE")
    }

}



export { apiCallApod, apiCallRovers }

