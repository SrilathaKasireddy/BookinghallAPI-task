import  {client} from "./index.js";

// export async function getAllRooms(request) {
//  return await client.db("Rooms")
//  .collection("Rooms")
//  .find(request.query).toArray();
// }

export async function createNewRooms(data){
 return await client.db("Rooms")
 .collection("Rooms").insertMany([data])
}