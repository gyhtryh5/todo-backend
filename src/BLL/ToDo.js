import {
  getNameByIdDb,
  getAllDataDb
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

export async function getAllDataSorted() {
  try {
    const data = await getAllDataDb();
    if (!data) {
      console.log("No data found");    // "     '   ,    ;    :     `     -      \      /    _      
    }
    return data;
  } catch (err) {
    console.log(err)
  }
};