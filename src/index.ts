import {app} from './app'
import dao from './repo/dao';
import { seedData } from './utils';
//setup database
dao.setupDbForDev();
seedData();


//Now tisten to this port 
if (app.listen(process.env.PORT)) {
  console.log("Node is listening to Port " + process.env.PORT);
}
else {
  console.log("An error occured");
}
