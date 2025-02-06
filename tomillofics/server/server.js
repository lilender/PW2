const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const language = require('@google-cloud/language');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "moderation.html"));
});

const client = new language.LanguageServiceClient();


app.post("/check", async (req, res) => {
    console.log(req.body);
    const inputText = req.body.text;

    // Make a map of the categories and the count of times they appear
    let categoriesMap = {};

    // Split the input text into sentences
    const sentences = inputText.match(/[^.!?]+[.!?]*/g);

    for (const sentence of sentences) {
        console.log(sentence);
        console.log("---------------------");

        const document = {
            content: sentence.trim(),
            type: 'PLAIN_TEXT',
        };
        const [result] = await client.moderateText({document: document});
        const categories = result.moderationCategories;

        for (const category of categories) {
            if (category.confidence > 0.5) {
                console.log(`Category: ${category.name}, Confidence: ${category.confidence}`);
                if (categoriesMap[category.name]) {
                    categoriesMap[category.name] += 1;
                } else {
                    categoriesMap[category.name] = 1;
                }
            }
        }
    }

    if(Object.keys(categoriesMap).length === 0) {
        categoriesMap["No Inappropriate Content"] = 1;
    }

    res.json(categoriesMap);

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});