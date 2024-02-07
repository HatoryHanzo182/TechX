import mongoose from 'mongoose'
import express from 'express';
import { _techx_data_connection_string } from './connect.js';
import { PhoneModel } from './Models/Phone.js';

//
//  ████████╗███████╗ █████╗ ██╗  ██╗██╗  ██╗  
//  ╚══██╔══╝██╔════╝██╔══██╗██║  ██║╚██╗██╔╝  
//     ██║   █████╗  ██║  ╚═╝███████║ ╚███╔╝   
//     ██║   ██╔══╝  ██║  ██╗██╔══██║ ██╔██╗   
//     ██║   ███████╗╚█████╔╝██║  ██║██╔╝╚██╗  
//     ╚═╝   ╚══════╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  
// 
//   ██████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
//  ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
//  ╚█████╗ █████╗  ██████╔╝╚██╗ ██╔╝█████╗  ██████╔╝
//   ╚═══██╗██╔══╝  ██╔══██╗ ╚████╔╝ ██╔══╝  ██╔══██╗
//  ██████╔╝███████╗██║  ██║  ╚██╔╝  ███████╗██║  ██║
//  ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
//
// The TechX server file provides communication between the Compass products, 
// the TechX Store, and the Database.
//

const app = express();

app.use(express.json());
app.use((req, res, next) =>  // Middleware for handling CORS. 
{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

const DB_URL = _techx_data_connection_string;
const PORT =  3000;

// + + + + + + + + + + + + + + + + + + + COMPASS + + + + + + + + + + + + + + + + + + +
// REQUESTS TO SEND THESE PRODUCTS.
//=============================================================================================
        // Push product data.
app.post('/AddPhone', async (req, res) => 
{
    try 
    {
      const { company, series, screen_diagonal } = req.body;
      const new_phone = new PhoneModel({ company, series, screen_diagonal });

      await new_phone.save();
  
      res.status(200).json({ message: 'Phone added successfully' });
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
//=============================================================================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +

const start = async () => 
{
  try
  {
    await mongoose.connect(DB_URL);

    console.log(`🔌 Connect is [${mongoose.connection.readyState}]`);

    app.listen(PORT, () => { console.log(`🍕 Server listening on port ${PORT}`)});
  } 
  catch (error) { console.log(error);}
}

start();