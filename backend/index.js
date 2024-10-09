
const express= require("express")
const cors= require("cors")
const dotenv= require("dotenv").config()
const mongoose= require("mongoose")
const authController = require("./controllers/authController")
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')
const app= express()
const path=require("path")

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, ()=>console.log("db is connected"))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/images', express.static('public/images'))
app.use('/auth',authController)
app.use('/product', productController)
app.use('/upload', uploadController)
app.post('/test', (req, res) => {
 res.status(200).json({
"id": 1,
"currency": "USD",
"taxAmountCents": 0,
"taxType": null,
"totalPriceAmountCents": 100,
"basePriceAmountCents": 100,
"discountCents": 0,
"nextBillTotalPriceAmountCents": 100,
"renewalInterval": "month",
"freeTrialDays": null
});
});
if (process.env.NODE_ENV === 'production') {
  console.log("hi")
  app.use(express.static(path.join(path.resolve(), '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(path.resolve(), '../frontend', 'build', 'index.html'))
  );

}
app.listen(process.env.PORT, ()=>console.log("server has been started succ 5000"))
