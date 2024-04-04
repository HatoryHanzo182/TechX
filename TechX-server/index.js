import mongoose, { connect } from "mongoose";
import express from "express";
import { _techx_data_connection_string } from './ServerData/connect_db.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from './Configs/config_token.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import SEND_CODE_VERIFICATION from './Configs/config_gmail.js'
import { UserModel } from "./Models/User.js";
import { SessionModel } from "./Models/Session.js"
import { IPhoneModel } from "./Models/IPhone.js";
import { AirPodsModel } from "./Models/AirPods.js";
import { AppleWatchModel } from "./Models/AppleWatch.js";
import { MacbookModel } from "./Models/Macbook.js";
import { ProductReviewModel } from "./Models/ProductReview.js";



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

dotenv.config();

const app = express();
const _token_secret_key = config.token_secret_key;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use((req, res, next) =>  // Middleware for handling CORS.
{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use((req, res, next) => // Middleware to extract the token from the Authorization header.
{
  const auth_header = req.headers['authorization'];
  const utoken = auth_header && auth_header.split(' ')[1];

  req.token = utoken;
  next();
});

const DB_URL = _techx_data_connection_string;  // process.env.MONGODB_URI;
const PORT = 3001  // process.env.PORT;

// + + + + + + + + + + + + + + + + + + + TECHX + + + + + + + + + + + + + + + + + + +
// REQUESTS TO SEND THIS DATA.
//=============================================================================================
        // Let's check if the user exists.
app.post("/CheckUserExists", async (req, res) => 
{
  try 
  {
    const { email } = req.body;
    const existing_user = await UserModel.findOne({ email });

    if (existing_user) 
      res.status(200).json({ existing_user: true });
    else 
      res.status(200).json({ existing_user: false });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

        // We send the user a confirmation code by email.
app.post("/SendConfirmationCodeEmail", async (req, res) => 
{
  try 
  {
    const { email } = req.body;
    const confirmation_сode = Math.floor(1000 + Math.random() * 9000).toString();

    SEND_CODE_VERIFICATION(email, confirmation_сode);

    res.status(200).json({ conf: confirmation_сode });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

        // Push new user data.
app.post("/NewUser", async (req, res) => 
{
  try 
  {
    const { name, email, password } = req.body;
    const new_user = new UserModel({ name, email, password });

    await new_user.save();

    res.status(200).json({ message: "User added successfully" });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

        // Prompt to verify user password.
app.post("/ProofPass", async (req, res) => 
{
  try 
  {
    const { email, password } = req.body;
    const existing_user = await UserModel.findOne({ email });

    if (existing_user) 
    {
      const is_password_correct = await bcrypt.compare(password, existing_user.password);

      if (is_password_correct) 
        res.status(200).json({ success: true });
      else 
        res.status(200).json({ success: false });
    } 
    else 
      res.status(200).json({ success: false });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

        // Generate and issue a token.
app.post("/GenerateToken", async (req, res) => 
{
  try 
  {
    const { email } = req.body;
    const token = jwt.sign({ user: email }, _token_secret_key, {expiresIn: "1h" });

    res.status(200).json({ token });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

        // Checking the validity of the token.
app.post("/CheckToken", async (req, res) => 
{
  try 
  {
    const token = req.token;

    jwt.verify(token, _token_secret_key, (err, decoded) => 
    {
      if (err) 
        res.status(200).json({ success: false });
      else 
        res.status(200).json({ success: true });
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

        // Create a new session for the user.
app.post("/CreateSession", async (req, res) => 
{
  try 
  {
    const { email } = req.body;
    const id = await UserModel.findOne({ email });
    const new_session = new SessionModel({ user_id: id.id, token: req.token })

    await new_session.save();

    res.status(200).json({ create_session_data: true });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ create_session_data: false });
  }
});

        // Getting session data.
app.post("/PullOutOfSession", async (req, res) => 
{
  try 
  {
    const token = req.token;
    const session = await SessionModel.findOne({ token });
    
    if (session) 
    {
      const user = await UserModel.findOne({ _id: session.user_id });
  
      if (user) 
      {
        const user_data = {name: user.name, email: user.email };

        res.status(200).json({ user_data });
      } 
      else 
        res.status(404).json({ message: "User not found" });
    } 
    else 
      res.status(404).json({ message: "Session not found" });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Getting session data.
app.post("/RemoveFromSession", async (req, res) => 
{
  try 
  {
    const token = req.token;
    const session = await SessionModel.findOne({ token });
    
    if (session) 
    {
      await session.deleteOne();

      res.status(200).json({ message: "The session was over" });
    } 
    else 
      res.status(404).json({ message: "Session not found" });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        //Search products on the site.
app.post("/SearchForProducts", async (req, res) => 
{
  try 
  {
    const { query } = req.body;
    const iphones = await IPhoneModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");
    const formatted_data_iphones = iphones.map(phone => 
    {
      return { _id: phone.id, images: phone.images[0], model: phone.model, price: phone.price };
    });

    // Поиск в MacBookModel (подобным образом).

    const all_products = [...formatted_data_iphones /*, ...macbooks*/];  // Объединение результатов из обеих коллекций.

    res.status(200).json(all_products);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Retrieving an image from the server.
app.get('/GetImage/:ImageName', (req, res) => 
{
  const image_name = decodeURIComponent(req.params.ImageName);
  const image_path = join(__dirname, 'ProductImages', image_name);

  if (fs.existsSync(image_path)) 
  {
      const image_stream = fs.createReadStream(image_path);
      
      image_stream.pipe(res);
  } 
  else 
      res.status(404).send('Image not found');
});

        // Getting Iphone data for carusel.
app.post("/GettingIphoneDataForCarusel", async (req, res) => 
{
  try 
  {
    const iphones = await IPhoneModel.find();
    const formatted_data = iphones.map(phone => 
    {
      return { images: phone.images[0], model: phone.model, price: phone.price };
    });

    res.status(200).json(formatted_data);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Getting Iphone data for list product.
app.post("/GetDataForListProduct/Iphone", async (req, res) => 
{
  try 
  {
    const iphones = await IPhoneModel.find();
    const formatted_data = iphones.map(phone => 
    {
      return { id: phone.id, images: phone.images[0], model: phone.model, memory: phone.memory, color: phone.color, price: phone.price };
    });

    res.status(200).json(formatted_data);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Getting AirPods data for list product.
app.post("/GetDataForListProduct/AirPods", async (req, res) => 
{
  try 
  {
    const airpods = await AirPodsModel.find();

    const formatted_data = airpods.map(airpod => 
    {
      return { id: airpod.id, images: airpod.images[0], model: airpod.model, color: airpod.color, price: airpod.price };
    });

    res.status(200).json(formatted_data);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Getting AppleWatch data for list product.
app.post("/GetDataForListProduct/AppleWatch", async (req, res) => 
{
  try 
  {
    const applewatchs = await AppleWatchModel.find();

    const formatted_data = applewatchs.map(applewatch => 
    {
      return { id: applewatch.id, images: applewatch.images[0], model: applewatch.model, color: applewatch.color[0], price: applewatch.price };
    });

    res.status(200).json(formatted_data);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Getting Macbook data for list product.
app.post("/GetDataForListProduct/Macbook", async (req, res) => 
{
  try 
  {
    const macbooks = await MacbookModel.find();

    const formatted_data = macbooks.map(macbook => 
    {
      return { id: macbook.id, images: macbook.images[0], model: macbook.model, color: macbook.color, price: macbook.price };
    });

    res.status(200).json(formatted_data);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Getting Product data for product-detail.
app.post("/ExtractData/:id", async (req, res) => 
{
  try 
  {
    const _id = req.params.id;
    
    if(_id !== "null")
    {
      const iphone_data = await IPhoneModel.findById(_id);
      
      if (iphone_data) 
      {
        res.status(200).json(iphone_data);
        return;
      }

      const airpod_data = await AirPodsModel.findById(_id);

      if (airpod_data) 
      {
        res.status(200).json(airpod_data);
        return;
      }

      const applewatch_data = await AppleWatchModel.findById(_id);

      if (applewatch_data) 
      {
        res.status(200).json(applewatch_data);
        return;
      }

      const macbook_data = await MacbookModel.findById(_id);

      if (macbook_data) 
      {
        res.status(200).json(macbook_data);
        return;
      }
      else
        res.status(404).json({ message: "Product not found" });
    }
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Request for product review.
app.post("/SendProductReview", async (req, res) => 
{
  try 
  {
    const { product_id, review_owner_id, user_name, user_review, grade } = req.body;
    let found_user_id = null;
    let found_user_name = null;
    
    if(user_name == null)
    {
      const user_id = await UserModel.findOne({ email: review_owner_id });
      
      found_user_id = user_id.id;
      found_user_name = user_id.name
    }

    const new_review = new ProductReviewModel({ product_id, review_owner_id: found_user_id || review_owner_id, review_owner_name: user_name || found_user_name, review: user_review, grade });

    await new_review.save();

    res.status(200).json({ success: true });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Get a review of the product ID.
app.post("/GetProductReview/:id", async (req, res) => 
{
  try 
  {
    const prod_id = req.params.id;
    
    if (prod_id !== "null") 
    {
      const review_data = await ProductReviewModel.find({ product_id: prod_id });
      
      if (review_data && review_data.length > 0)
        res.status(200).json(review_data);
    } 
    else
      res.status(400).json({ message: "Invalid product ID" });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});
//=============================================================================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +






// + + + + + + + + + + + + + + + + + + + COMPASS + + + + + + + + + + + + + + + + + + +
// REQUESTS TO SEND THIS DATA.
//=============================================================================================
// Push product data.
app.post("/AddIPhone", async (req, res) => 
{
  try 
  {
    const { company, series, screen_diagonal } = req.body;
    const new_phone = new IPhoneModel({ company, series, screen_diagonal });

    await new_phone.save();

    res.status(200).json({ message: "IPhone added successfully" });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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

    app.listen(PORT, () => { console.log(`🍕 Server listening on port ${PORT}`); });
  } 
  catch (error) { console.log(error); }
};

start();