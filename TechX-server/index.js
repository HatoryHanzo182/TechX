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
import path from 'path';
import multer from 'multer';
import SEND_CODE_VERIFICATION from './Configs/config_gmail.js'
import { UserModel } from "./Models/User.js";
import { SessionModel } from "./Models/Session.js"
import { IPhoneModel } from "./Models/IPhone.js";
import { AirPodsModel } from "./Models/AirPods.js";
import { AppleWatchModel } from "./Models/AppleWatch.js";
import { MacbookModel } from "./Models/Macbook.js";
import { IpadModel } from "./Models/Ipad.js";
import { ConsoleModel } from "./Models/Console.js";
import { ProductReviewModel } from "./Models/ProductReview.js";
import { OrderModel } from "./Models/Order.js";

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

//#region [Middlewares]
app.use(express.json());   // Middleware parses incoming requests with JSON bodies.
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
//#endregion

const DB_URL = _techx_data_connection_string;  // process.env.MONGODB_URI;
const PORT = 3001  // process.env.PORT;

//#region [TECHX]
// + + + + + + + + + + + + + + + + + + + TECHX + + + + + + + + + + + + + + + + + + +
// REQUESTS TO SEND THIS DATA.
//=============================================================================================
//#region [Registration Requests]
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
    const new_user = new UserModel({ name, email, password, phone_number: "null", delivery_address: "null", favourites: [] });

    await new_user.save();

    res.status(200).json({ message: "User added successfully" });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//#endregion
//#region [Authorization Requests]
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
//#endregion
//#region [Sessions Requests]
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
        const user_data = { name: user.name, email: user.email, phone_number: user.phone_number, delivery_address: user.delivery_address, favourites: user.favourites };

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
//#endregion
//#region [For client Requests]
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

    const formatted_data_iphones = iphones.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const airpods = await AirPodsModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");

    const formatted_data_airpods = airpods.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const applewatchs = await AppleWatchModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");
  
    const formatted_data_applewatchs = applewatchs.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const macbooks = await MacbookModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");
  
    const formatted_data_macbooks = macbooks.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const ipads = await IpadModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");
  
    const formatted_data_ipads = ipads.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const consoles = await ConsoleModel.find(
    {
      $or: 
      [
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } }
      ]
    }).select("images model price");
  
    const formatted_data_consoles = consoles.map(i => 
    {
      return { _id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const all_products = [...formatted_data_iphones , ...formatted_data_airpods, ...formatted_data_applewatchs, ...formatted_data_macbooks, ...formatted_data_ipads, ...formatted_data_consoles]; 

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

        // Getting data for carusel.
app.post("/GettingDataForCarusel", async (req, res) => 
{
  try 
  {
    const iphones = await IPhoneModel.find();
  
    const formatted_data_iphones = iphones.filter(i => i.incarousel === true).map(i => 
    {
        return { id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const airpods = await AirPodsModel.find();

    const formatted_data_airpods = airpods.filter(i => i.incarousel === true).map(i => 
    {
      return { id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const applewatchs = await AppleWatchModel.find();
  
    const formatted_data_applewatchs = applewatchs.filter(i => i.incarousel === true).map(i => 
    {
      return { id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const macbooks = await MacbookModel.find();
  
    const formatted_data_macbooks = macbooks.filter(i => i.incarousel === true).map(i => 
    {
      return { id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const ipads = await IpadModel.find();
  
    const formatted_data_ipads = ipads.filter(i => i.incarousel === true).map(i => 
    {
      return { id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const consoles = await ConsoleModel.find();
  
    const formatted_data_consoles = consoles.filter(i => i.incarousel === true).map(i => 
    {
      return { id: i.id, images: i.images[0], model: i.model, price: i.price };
    });

    const formatted_data = [...formatted_data_iphones , ...formatted_data_airpods, ...formatted_data_applewatchs, ...formatted_data_macbooks, ...formatted_data_ipads, ...formatted_data_consoles]; 

    res.status(200).json(formatted_data);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});
//#endregion
//#region [Products Requests]
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
      return { id: macbook.id, images: macbook.images[0], model: macbook.model, memory: macbook.memory, color: macbook.color, price: macbook.price };
    });

    res.status(200).json(formatted_data);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Getting Ipad data for list product.
app.post("/GetDataForListProduct/Ipad", async (req, res) => 
{
  try 
  {
    const ipads = await IpadModel.find();

    const formatted_data = ipads.map(ipad => 
    {
      return { id: ipad.id, images: ipad.images[0], model: ipad.model, memory: ipad.memory[0], color: ipad.color[0], price: ipad.price };
    });

    res.status(200).json(formatted_data);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Getting Console data for list product.
app.post("/GetDataForListProduct/Console", async (req, res) => 
{
  try 
  {
    const consoles = await ConsoleModel.find();

    const formatted_data = consoles.map(console => 
    {
      return { id: console.id, images: console.images[0], model: console.model, memory: console.memory, color: console.color[0], price: console.price };
    });

    res.status(200).json(formatted_data);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});
//#endregion
//#region [Product detail Requests]
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

      const ipad_data = await IpadModel.findById(_id);

      if (ipad_data) 
      {
        res.status(200).json(ipad_data);
        return;
      }

      const console_data = await ConsoleModel.findById(_id);

      if (console_data) 
      {
        res.status(200).json(console_data);
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
//#endregion
//#region [Product review Requests]
        // Request for product review.
app.post("/SendProductReview", async (req, res) => 
{
  try 
  {
    const { product_id, review_owner_id, user_name, user_review, grade } = req.body;
    let found_user_id = null;
    let found_user_name = null;
    const current_date = new Date();
    const day = ('0' + current_date.getDate()).slice(-2);
    const month = ('0' + (current_date.getMonth() + 1)).slice(-2);    
    const year = current_date.getFullYear();
    
    if(user_name == null)
    {
      const user_id = await UserModel.findOne({ email: review_owner_id });
      
      found_user_id = user_id.id;
      found_user_name = user_id.name
    }

    const new_review = new ProductReviewModel(
    { 
      product_id, 
      review_owner_id: found_user_id || review_owner_id, 
      review_owner_name: user_name || found_user_name, 
      review: user_review, 
      grade, 
      date: `${day}.${month}.${year}`,
      viewed_admin: false,  
    });

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
//#endregion
//#region [Product favorits Requests]
        // Add favorite product.
app.post("/AddFavoriteProduct/:id", async (req, res) => 
{
  try 
  {
    const token = req.token;
    const session = await SessionModel.findOne({ token });
    const product_object_id = new mongoose.Types.ObjectId(req.params.id);
    
    if (session) 
    {
      const user = await UserModel.findOne({ _id: session.user_id });
      
      user.favourites.push(product_object_id);
      await user.save();
    }
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Get favorite product.
app.post("/GetFavoriteProduct/:id", async (req, res) => 
{
  try 
  {
    const product_object_id = new mongoose.Types.ObjectId(req.params.id);
    const iphone_data = await IPhoneModel.findById(product_object_id);

    if(iphone_data)
    {
      res.status(200).json({ id: iphone_data.id, images: iphone_data.images[0], model: iphone_data.model, price: iphone_data.price });
      return;
    }

    const airpod_data = await AirPodsModel.findById(product_object_id);

    if(airpod_data)
    {
      res.status(200).json({ id: airpod_data.id, images: airpod_data.images[0], model: airpod_data.model, price: airpod_data.price });
      return;
    }

    const applewatch_data = await AppleWatchModel.findById(product_object_id);

    if(applewatch_data)
    {
      res.status(200).json({ id: applewatch_data.id, images: applewatch_data.images[0], model: applewatch_data.model, price: airpod_data.price });
      return;
    }

    const macbook_data = await MacbookModel.findById(product_object_id);

    if(macbook_data)
    {
      res.status(200).json({ id: macbook_data.id, images: macbook_data.images[0], model: macbook_data.model, price: macbook_data.price });
      return;
    }

    const ipad_data = await IpadModel.findById(product_object_id);

    if(ipad_data)
    {
      res.status(200).json({ id: ipad_data.id, images: ipad_data.images[0], model: ipad_data.model, price: ipad_data.price });
      return;
    }

    const console_data = await ConsoleModel.findById(product_object_id);

    if(console_data)
    {
      res.status(200).json({ id: console_data.id, images: console_data.images[0], model: console_data.model, price: console_data.price });
      return;
    }
    else
      res.status(404).json({ message: "Product not found" });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Delete favorite product.
app.post("/DeleteFavoriteProduct/:id", async (req, res) => 
{
  try 
  {
    const token = req.token;
    const session = await SessionModel.findOne({ token });
    const product_object_id = new mongoose.Types.ObjectId(req.params.id);
    
    if (session) 
    {
      const user = await UserModel.findOne({ _id: session.user_id });

      const index_f = user.favourites.indexOf(product_object_id);
      if (index_f === -1)
        return res.status(400).json({ message: "Product not found in favourites" });
  
      user.favourites.splice(index_f, 1);
      await user.save();
    }
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});
//#endregion
//#region [Order store Requests]
        // Ordered.
app.post("/Order", async (req, res) => 
{
  const user_order = req.body; 
  const current_date = new Date();
  const day = ('0' + current_date.getDate()).slice(-2);
  const month = ('0' + (current_date.getMonth() + 1)).slice(-2);    
  const year = current_date.getFullYear();

  try 
  {
    const FindProductByName = async (name) => 
    {
      let product = await IPhoneModel.findOne({ model: name }) || await AirPodsModel.findOne({ model: name }) || await AppleWatchModel.findOne({ model: name }) || await MacbookModel.findOne({ model: name }) || await IpadModel.findOne({ model: name }) || await ConsoleModel.findOne({ model: name });
      
      return product ? product._id : null;
    };

    const products_ordered_ids = [];

    for (const item of user_order.stored_array) 
    {
      const product_id = await FindProductByName(item.model);

      if (product_id)
        products_ordered_ids.push(product_id);
    }

    const f_user_id = await UserModel.findOne({ email: user_order.user_email });

    const new_order = new OrderModel(
    {
      _id: new mongoose.Types.ObjectId(),
      name: user_order.user_name,
      email: user_order.user_email,
      phone: user_order.user_phone,
      city: user_order.user_city,
      delivery_adress: user_order.user_del_address,
      payment_state: user_order.user_card ? "paid by card" : "сash on delivery",
      sum: user_order.user_sum,
      products_ordered: products_ordered_ids,
      user_id: f_user_id ? f_user_id._id : null,
      date_registration: `${day}.${month}.${year}`,
      status: "pending"
    });

    new_order.save();
    
    res.status(200).json({ message: "Order submitted successfully" }); 
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Get ordered history.
app.post("/GetOrderHistory", async (req, res) => 
{
  const user_t = req.token;

  try 
  {
    const user = await SessionModel.findOne({ token: user_t });
    
    if(user) 
    {
      const user_orders = await OrderModel.find({ user_id: user.user_id });
      const product_ids = user_orders.map(order => order.products_ordered).flat();

      const promises = product_ids.map(async __id => 
      {
        const iphone_data = await IPhoneModel.findById(__id);
        const airpod_data = await AirPodsModel.findById(__id);
        const applewatch_data = await AppleWatchModel.findById(__id);
        const macbook_data = await MacbookModel.findById(__id);
        const ipad_data = await IpadModel.findById(__id);
        const console_data = await ConsoleModel.findById(__id);

        return [iphone_data, airpod_data, applewatch_data, macbook_data, ipad_data, console_data];
      });

      const data_product = await Promise.all(promises);
      const flattened_data_product = data_product.flat().filter(product => product !== null);

      const order_history = user_orders.map(order => (
      {
        _id: order._id,
        products: flattened_data_product.filter(product => order.products_ordered.includes(product._id)),
        date: order.date_registration,
        payment_method: order.payment_state,
        status: order.status
      }));

      res.status(200).json({ order_history });
    }
    else
      res.status(404).json({ message: "User not found" });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});
//#endregion
//=============================================================================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
//#endregion

//#region [COMPASS]
// + + + + + + + + + + + + + + + + + + + COMPASS + + + + + + + + + + + + + + + + + + +
// REQUESTS TO SEND THIS DATA.
//=============================================================================================
//#region [Add Products]
const storage = multer.diskStorage(
{
  destination: (req, file, cb) => { cb(null, path.join(__dirname, 'ProductImages'));},
  filename: (req, file, cb) => 
  {
    const unique_suffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileName = `${unique_suffix}-${file.originalname}`;
    
    cb(null, fileName);
  },
});

const upload = multer({ storage });

        // Adding product images to the server.
app.post("/AddNewProductImg", upload.array('image', 5), async (req, res) => 
{
  try 
  {
    const uploaded_files = req.files;

    if (!uploaded_files || uploaded_files.length === 0) 
      return res.status(400).json({ message: 'No files uploaded' });

    const file_names = uploaded_files.map((file) => file.filename);

    res.status(200).json({ message: 'Images uploaded successfully', file_names });
  } 
  catch (error) 
  {
    console.error('Error uploading images:', error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
});

        // Push new data.
app.post("/AddProduct", async (req, res) => 
{
  const new_p = req.body;
  let new_product;
  const arr_color = [];

  arr_color.push(new_p.product._id);
  
  try 
  {
    switch (new_p.product.category) 
    {
      case "iPhone":
        new_product = new IPhoneModel(
        {
          _id: new mongoose.Types.ObjectId(), 
          category: new_p.product.category, 
          brand: new_p.product.brand, 
          model: new_p.product.model, 
          price: new_p.product.price, 
          descont_price: new_p.product.descont_price,
          color: new_p.product.color, 
          memory: new_p.product.memory, 
          displaySize: new_p.product.displaySize, 
          description: new_p.product.description, 
          os: new_p.product.os, 
          camera: new_p.product.camera, 
          processor: new_p.product.processor, 
          images: new_p.server_img, 
          incarousel: new_p.product.incarousel
        });
        break;
      case "Macbook":
        new_product = new MacbookModel(
        {
          _id: new mongoose.Types.ObjectId(), 
          category: new_p.product.category, 
          brand: new_p.product.brand, 
          model: new_p.product.model, 
          price: new_p.product.price, 
          descont_price: new_p.product.descont_price,
          color: new_p.product.color, 
          memory: new_p.product.memory, 
          displaySize: new_p.product.displaySize, 
          description: new_p.product.description, 
          os: new_p.product.os, 
          camera: new_p.product.camera, 
          processor: new_p.product.processor, 
          battery: new_p.product.battery, 
          RAM: new_p.product.RAM,
          CPU: new_p.product.CPU,
          GPU: new_p.product.GPU,
          images: new_p.server_img, 
          incarousel: new_p.product.incarousel
        });
        break;
      case "Ipad":
        new_product = new IpadModel(
        {
          _id: new mongoose.Types.ObjectId(), 
          category: new_p.product.category, 
          brand: new_p.product.brand, 
          model: new_p.product.model, 
          price: new_p.product.price, 
          descont_price: new_p.product.descont_price,
          color: arr_color, 
          memory: new_p.product.memory, 
          displaySize: new_p.product.displaySize, 
          description: new_p.product.description, 
          os: new_p.product.os, 
          camera: new_p.product.camera, 
          processor: new_p.product.processor, 
          battery: new_p.product.battery, 
          RAM: new_p.product.RAM,
          CPU: new_p.product.CPU,
          GPU: new_p.product.GPU,
          images: new_p.server_img, 
          incarousel: new_p.product.incarousel
        });
        break;
      case "AirPods":
        new_product = new AirPodsModel(
        {
          _id: new mongoose.Types.ObjectId(), 
          category: new_p.product.category, 
          brand: new_p.product.brand, 
          model: new_p.product.model, 
          price: new_p.product.price, 
          descont_price: new_p.product.descont_price,
          processor: new_p.product.processor, 
          color: new_p.product.color, 
          description: new_p.product.description, 
          battery: new_p.product.battery, 
          images: new_p.server_img, 
          incarousel: new_p.product.incarousel
        });
        break;
      case "Watch":
        new_product = new AppleWatchModel(
        {
          _id: new mongoose.Types.ObjectId(), 
          category: new_p.product.category, 
          brand: new_p.product.brand, 
          model: new_p.product.model, 
          price: new_p.product.price, 
          descont_price: new_p.product.descont_price,
          color: arr_color, 
          memory: new_p.product.memory, 
          displaySize: new_p.product.displaySize, 
          description: new_p.product.description, 
          os: new_p.product.os, 
          processor: new_p.product.processor, 
          battery: new_p.product.battery, 
          RAM: new_p.product.RAM,
          CPU: new_p.product.CPU,
          GPU: new_p.product.GPU,
          images: new_p.server_img, 
          incarousel: new_p.product.incarousel
        });
        break;
      case "Console":
        new_product = new ConsoleModel(
        {
          _id: new mongoose.Types.ObjectId(), 
          category: new_p.product.category, 
          brand: new_p.product.brand, 
          model: new_p.product.model, 
          price: new_p.product.price, 
          descont_price: new_p.product.descont_price,
          color: arr_color, 
          memory: new_p.product.memory, 
          description: new_p.product.description, 
          os: new_p.product.os, 
          processor: new_p.product.processor, 
          RAM: new_p.product.RAM,
          CPU: new_p.product.CPU,
          GPU: new_p.product.GPU,
          images: new_p.server_img, 
          incarousel: new_p.product.incarousel
        });
        break;
      default:
        break;
    }

    await new_product.save();

    res.status(200).json({ message: `${new_p.category} added successfully`});
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//#endregion
//#region [Remove Product sector.]
        // Remove product from display.
app.post("/RemoveProductFromDB", async (req, res) => 
{
  const { category, model } = req.body;
  
  try 
  {
    let product_model;

    switch (category) 
    {
      case "iPhone":
        product_model = IPhoneModel;
        break;
      case "Macbook":
        product_model = MacbookModel;
        break;
      case "Ipad":
        product_model = IpadModel;
        break;
      case "AirPods":
        product_model = AirPodsModel;
        break;
      case "Watch":
        product_model = AppleWatchModel;
        break;
      case "Console":
        product_model = ConsoleModel;
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid product category" });
    }

    const result = await product_model.findOneAndDelete({ model: model });
    const image_paths = result.images;

    image_paths.forEach(image => 
    {
      const full_path = path.join(__dirname, 'ProductImages', image);
      
      fs.access(full_path, fs.constants.F_OK, (err) => 
      {
        if (err) 
          console.error(`Image not found: ${full_path}`);
        else 
        {
          fs.unlink(full_path, (err) => 
          {
            if (err) 
              console.error(`Error deleting image: ${full_path}`, err);
          });
        }
      });
    });

    if (result) 
      res.status(200).json({ success: true, message: "Product removed successfully" }); 
    else
        res.status(404).json({ success: false, message: "Product not found" });
  } 
  catch (error) 
  {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
//#endregion
//#region [Orders for admin]
        // Get orders for admin.
app.post("/GetOrder", async (req, res) => 
{
  try 
  {
    const order_data = await OrderModel.find();
    const product_ids = order_data.map(order => order.products_ordered).flat();
    const promises = product_ids.map(async __id => 
    {
      const iphone_data = await IPhoneModel.findById(__id);
      const airpod_data = await AirPodsModel.findById(__id);
      const applewatch_data = await AppleWatchModel.findById(__id);
      const macbook_data = await MacbookModel.findById(__id);
      const ipad_data = await IpadModel.findById(__id);
      const console_data = await ConsoleModel.findById(__id);
      return [iphone_data, airpod_data, applewatch_data, macbook_data, ipad_data, console_data];
    });
    const data_product = await Promise.all(promises);
    const flattened_data_product = data_product.flat().filter(product => product !== null);
    const formatted_data = order_data.map(order => (
    {
      _id: order._id,
      name: order.name,
      email: order.email,
      phone: order.phone,
      city: order.city,
      delivery_adress: order.delivery_adress,
      sum: order.sum,
      products: flattened_data_product.filter(product => order.products_ordered.includes(product._id)),
      date: order.date_registration,
      payment_method: order.payment_state,
      status: order.status
    }));
    res.status(200).json({ formatted_data });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

        // Change status order for admin.
app.post("/ChangeStatusOrder", async (req, res) => 
{
  const status_for = req.body;

  try 
  {
    await OrderModel.findByIdAndUpdate(status_for._id, { status: status_for.status }, { new: true });

    res.status(200).json({ success: true, message: `Status successfully changed to ${status_for.status}`});
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ success: false, message: `Status change error`});
  }
});
//#endregion
//#region [Reviews for admin]
        // Get all reviews for admin.
app.post("/GetProductReview", async (req, res) => 
{
  try 
  {
    const review_data = await ProductReviewModel.find();
    const formatted_data = [];
    
    if (review_data && review_data.length > 0)
    {
      const reviews_product = [];
      const review_owner = [];

      for(const review of review_data)
      {
        const iphone_data = await IPhoneModel.findById(review.product_id, { model: 1, images: { $slice: 1 } });
        
        review_owner.push(review.review_owner_name);
        
        if(iphone_data)
        {
          reviews_product.push(iphone_data);
          continue;
        }

        const airpod_data = await AirPodsModel.findById(review.product_id, { model: 1, images: { $slice: 1 } });
        
        if(airpod_data)
        {
          reviews_product.push(airpod_data);
          continue;
        }

        const applewatch_data = await AppleWatchModel.findById(review.product_id, { model: 1, images: { $slice: 1 } });
        
        if(applewatch_data)
        {
          reviews_product.push(applewatch_data);
          continue;
        }

        const macbook_data = await MacbookModel.findById(review.product_id, { model: 1, images: { $slice: 1 } });
        
        if(macbook_data)
        {
          reviews_product.push(macbook_data);
          continue;
        }

        const ipad_data = await IpadModel.findById(review.product_id, { model: 1, images: { $slice: 1 } });
        
        if(ipad_data)
        {
          reviews_product.push(ipad_data);
          continue;
        }

        const console_data = await ConsoleModel.findById(review.product_id, { model: 1, images: { $slice: 1 } });
        
        if(console_data)
        {
          reviews_product.push(console_data);
          continue;
        }
      }

      for (let i = 0; i < review_data.length; i++) 
      {
        const combined = 
        {
          id: review_data[i].id,
          review: review_data[i].review,
          grade: review_data[i].grade,
          product_arr: reviews_product[i],
          owner_name: review_owner[i],
          date: review_data[i].date,
          viewed_admin: review_data[i].viewed_admin
        };

        formatted_data.push(combined);
      }

      res.status(200).json(formatted_data);
    }
    else 
      res.status(200).json([]);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({});
  }
});

        // Removing a review by ID that is objectionable to the admin.
app.post("/RemovingReviewById", async (req, res) => 
{
  try 
  {
    const review_id = req.body.id;

    const id_r = await ProductReviewModel.findByIdAndDelete(review_id);

    res.status(200).json({ success: true });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

        // Indicate in the database that the admin has checked this review.
app.post("/AdminChecked", async (req, res) => 
{
  try 
  {
    const review_id = req.body.id;

    const id_r = await ProductReviewModel.findById(review_id);

    if(id_r != null) 
    {
      id_r.viewed_admin = true;
      
      await id_r.save();
      
      res.status(200).json({ success: true });
    }
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ success: false });
  }
});
//#endregion
//=============================================================================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
//#endregion

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