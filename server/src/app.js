import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import partRoutes from '../routes/parts.js'
import locationRoutes from '../routes/locations.js'
import tagRoutes from '../routes/tags.js'
import inventoryRoutes from '../routes/inventories.js'
import Part from '../models/part.js';
import Location from '../models/location.js';
import Tag from '../models/tag.js';
import Inventory from '../models/inventory.js';
dotenv.config();
const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "pug")

app.use('/catalog/parts', partRoutes)
app.use('/catalog/locations', locationRoutes)
app.use('/catalog/tags', tagRoutes)
app.use('/catalog/availability', inventoryRoutes)

app.use('/catalog', async (req, res) => {
    try {
        const [partCount, locationCount, tagCount, inventoryCount] = await Promise.all([
            Part.countDocuments(),
            Location.countDocuments(),
            Tag.countDocuments(),
            Inventory.countDocuments(),
        ]);
        res.json({ partCount, locationCount, tagCount, inventoryCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


app.use('/', (req, res) => {
    res.send('Hello from the API')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

mongoose.connect(process.env.CONNECTION_URL, { useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))
