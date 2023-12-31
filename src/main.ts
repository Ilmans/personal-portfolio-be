
import { createDummyArticles } from "./app/helper";
import { web } from "./app/web";
require("dotenv").config();





web.listen(process.env.PORT,() : void => console.log(`Server run in port ${process.env.PORT}`));

