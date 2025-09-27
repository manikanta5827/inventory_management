import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})
