import d from "dotenv"
import e, { json } from "express";
d.config()

const PORT = process.env.PORT || 4444
const app = e()

app.use(json())

app.get("/", (req, res) => {
    console.log(req.body.name)
    res.send("Nice")
})

app.listen(PORT, (err) => {
    if(err){
        return console.log(err)
    }
    console.log("Server OK")
})