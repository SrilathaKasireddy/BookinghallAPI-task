import  express from "express"
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();
const app=express()
import  uniqid  from 'uniqid'
import cors from "cors"
app.use(express.json())
app.use(cors());
const PORT =process.env.PORT
const MONGO_URL=process.env.MONGO_URL;
 async function createConnection(){
  const client =new MongoClient(MONGO_URL);
   await client.connect();
   console.log("mongo is connected😊👍");
   return client;
}
 export const client =await createConnection();

let rooms = [];
let roomNo = 100;
let bookings =[];



  app.get("/getAllRooms", function (req, res) {
    res.json({
        output: rooms
    });

});

app.get("/getAllBookings", function (req, res) {
    res.json({
        output: bookings
    });

});

app.post("/createRoom", function (req, res) {

    let room = {};
    room.id = uniqid();
    room.roomNo = roomNo;
    room.bookings = [];
    if(req.body.noSeats){room.noSeats = req.body.noSeats} else{res.status(400)
     .json({ output: 'Please specify No of seats for Room'})};
    if(req.body.amenities){room.amenities = req.body.amenities} else{res.status(400)
     .json({ output: 'Please specify all Amenities for Room in Array format'})};
    if(req.body.priceforOneHour){room.priceforOneHour = req.body.priceforOneHour} 
    else{res.status(400).json({ output: 'Please specify pricefoforOneHour per hour for Room'})};
    
    roomNo++;
    res.send(`{ Room Created Successfully with roomID: ${room.id}}`) 
    rooms.push(room);
});

app.post("/createBooking", function (req, res) {
 
    let booking = {};
    booking.id = uniqid();
    if(req.body.customerName)
    {booking.customerName = req.body.customerName} 
    else{res.status(400).json({ output: 'Please specify customer Name for booking.'})};
    if(req.body.date)
    {booking.date=req.body.date}
    else{res.status(400).json({ output: 'Please specify date'})};
    if(req.body.starttime)
    {booking.date=req.body.starttime}
    else{res.status(400).json({ output: 'Please specify starttime'})};
    if(req.body.endtime)
    {booking.date=req.body.endtime}
    else{res.status(400).json({ output: 'Please specify endtime'})};
    if(req.body.roomid)
    {booking.date=req.body.roomid}
    else{res.status(400).json({ output: 'Please specify roomid'})};

    bookings.push(booking)


    res.send(`room booked with booking id :  ${booking.id}`)
    
})

 
    



 app.listen(PORT,()=>console.log(`App started in ${PORT}`));