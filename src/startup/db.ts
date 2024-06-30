import  dotenv  from 'dotenv';

// import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import Admin from '../Admin/model/admin-model';

import { setting } from "../config/db";
import Products from '../Products/model/product-model';
import Stores from '../StoreFront/model/store-front-model';
import Token from '../token/model/token-model';
import { NodeEnvironment } from '../Utils/type';


// Importing models from Users module

dotenv.config();

const env = process.env.NODE_ENV as NodeEnvironment;
const config = setting[env];

/**
 * Models would be loaded manually. This is because of the modelMatch option in the sequelize constructor
 * @see [Sequelize-Typescript](https://www.npmjs.com/package/sequelize-typescript#model-path-resolving)
 */

const connString = `${config.dialect}://${config.username}:${config.password}@${config.host}/${config.database}`;

const sequelize = new Sequelize(connString, {
  models: [
   Admin,
   Token,
   Stores,
   Products
  ],
});

export default sequelize;
