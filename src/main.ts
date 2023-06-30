
import { createDummyArticles } from "./app/helper";
import { web } from "./app/web";




createDummyArticles()

web.listen(3120,() : void => console.log(`Server run in port 3120`) )

