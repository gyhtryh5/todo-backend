import {
    getNameByIdDb
} from '../DAL/ToDo.js';

export async function getNameById(id) {
    try {
        let titleById = await getNameByIdDb(id);
        if (!titleById) {
            console.log("No title found for id: " + id);
        }
        return titleById.title.toUpperCase();
    } catch (err) {
        console.log(err)
    }
}