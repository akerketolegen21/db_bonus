const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
const path = require("path")
const PORT = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === "production") {
    //server static content
    app.use(express.static(path.join(__dirname, "client/build")))
    console.log("prod")
}else console.log("dev")
//ROUTES

//create a record
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

app.post("/records", async (req, res) => {
    try {
        const { email, cname, dcode, deaths, patients } = req.body
        const newRecord = await pool.query(
            "INSERT INTO Record(email, cname, \"disease code\", \"total deaths\", \"total patients\") VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [email, cname, dcode, deaths, patients]
        )
        res.json(newRecord)
    } catch (error) {
        console.error(error.message)
    }
})

//get all records
app.get("/records", async (req, res) => {
    try {
        const allRecords = await pool.query("SELECT * FROM Record")
        res.json(allRecords.rows)
        console.log(res)
    } catch (error) {
        console.log(error.message)
    }
})

//get all servants
app.get("/servants", async (req, res) => {
    try {
        const allServants = await pool.query("SELECT email FROM PublicServant")
        res.json(allServants.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//get all countries
app.get("/countries", async (req, res) => {
    try {
        const allCountries = await pool.query("SELECT cname FROM Country")
        res.json(allCountries.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//get all disease codes
app.get("/dcodes", async (req, res) => {
    try {
        const allDiseases = await pool.query("SELECT \"disease code\" FROM Disease")
        res.json(allDiseases.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//get a record from id
app.get("/records/:id", async (req, res) => {
    try {
        const { id } = req.params
        const rec = await pool.query("SELECT * FROM Record WHERE \"recordID\" = $1", [id])
        res.json(rec.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

//update a record
app.put("/records/deaths/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { deaths } = req.body
        const updateRecord = await pool.query(
            "UPDATE Record SET \"total patients\" = \"total patients\" + ($1 - \"total deaths\"), \"total deaths\" = $1 WHERE \"recordID\" = $2", [deaths, id]
        )
        res.json("Death record updated at " + id + ": put " + deaths)
    } catch (error) {
        console.log(error.message)
    }
})

//delete a record
app.delete("/records/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteRecord = await pool.query(
            "DELETE FROM Record WHERE \"recordID\" = $1", [id]
        )
        res.json(id + " was deleted")
    } catch (error) {
        console.log(error.message)
    }
})

//get specializes_in
app.get("/descriptions", async (req, res) => {
    try {
        const descriptions = await pool.query("SELECT description FROM DiseaseType")
        res.json(descriptions.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//get average salaries
app.post("/findAVG/:id", async (req, res) => {
    try {
        const { id } = req.params
        const rec = await pool.query("SELECT Country.cname, AVG(salary) FROM Country LEFT OUTER JOIN Users ON Users.email IN (SELECT email FROM Specialize WHERE Specialize.id = (SELECT id FROM DiseaseType WHERE description = $1)) AND Users.cname = Country.cname GROUP BY Country.cname;", [id])
        res.json(rec.rows)
    } catch (error) {
        console.log(error.message)
    }
})

if(process.env.NODE_ENV === 'production'){
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
})