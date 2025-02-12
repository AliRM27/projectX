import e, { json } from "express";
const app = e()

app.use(json())
app.get("/", (req, res) => {
    console.log(req.body.name)
    res.send("Nice")
})

app.listen("4444", (err) => {
    if(err){
        return console.log(err)
    }
    console.log("Server OK")
})