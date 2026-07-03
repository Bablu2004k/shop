const express = require("express") 
const morgan = require("morgan")  
const productRoutes = require("./routes/product.routes")  
const { notFound, errorHandler } = require("./middleware/error.middleware") 

const app = express() 

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))  

app.get("/", (req, res) => {
    res.json({
        massage: "Shop API is running!"
    })
})

app.use("/api/products", productRoutes) 
app.use(notFound)
app.use(errorHandler)

module.exports = app