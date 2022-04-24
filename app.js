import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(cors({origin: "https://nftart.netlify.app/"}));
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb+srv://username:xa1yDR6wPKUaTRM7@cluster0.gcyg9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
// making schedma for the creators
const creatorSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true, "Mandatory field"]
        },
        DOB:
        {
            type: Date,
            required: [true, "Mandatory field"]
        },
        story: String,
        documentslink:
        {
            type: String,
            required: [true, "Mandatory field"]
        }
    }
)

const Creators = mongoose.model("Creator", creatorSchema);
//function to add elements to the database
async function addToDatabase(name, story, DOB, documentslink) {
    const creator = new Creators({
        name: name,
        story: story,
        DOB: DOB,
        documentslink: documentslink
    });
    let error = 0;
    creator.save()
        .then(() => { error = 0 })
        .catch(() => { error = 1 });
    return error;
}
//configuring our server to respond to requests
app.post("/", async (req, res) => {
    const name = req.body.name;
    const story = req.body.story;
    const DOB = req.body.DOB;
    const documentslink = req.body.documentslink;
    const check = await addToDatabase(name, story, DOB, documentslink);
    if (check == 0)
        console.log("value added");
    else
        console.log("value rejected");
});
app.get("/", (req, res) => {
    Creators.find()
        .then(creators => { res.send(creators) });
})
app.listen(process.env.PORT || 8080, () => {
    console.log("started listening")
});