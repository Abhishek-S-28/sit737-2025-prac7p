const express = require('express');
const mongoose = require('./db');
const app = express();
app.use(express.json());

const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));

app.post('/items', async (req, res) => {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.send(item);
});

app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

app.listen(3000, () => console.log("App running on port 3000"));
