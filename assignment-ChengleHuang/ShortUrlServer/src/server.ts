import * as express from "express";
import * as mongoose from "mongoose";
import { getModelForClass } from "@typegoose/typegoose";
import { ShortUrl } from "./database/shortUrl.model";
import { myUtil } from "./myUtil";

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

export default app;

const urlLength: number = 8;
const MongoDBUri: string = "mongodb://127.0.0.1:27017/mydb";

mongoose.set("strictQuery", true);
mongoose
  .connect(MongoDBUri)
  .then(() => {
    const shortUrlModel = getModelForClass(ShortUrl);
    console.log("MongoDB Connected!");

    app.post("/saveLongUrl", async (req, res) => {
      const { longUrl } = req.body;
      if (!myUtil.validateUrl(longUrl)) {
        res.json({ success: false, msg: "Invalid Url!" });
        return;
      }
      let shortUrl: string = myUtil.genShortUrl(urlLength);
      try {
        while (await shortUrlModel.findOne({ shortUrl })) {
          shortUrl = myUtil.genShortUrl(urlLength);
        }
        const createRes = await shortUrlModel.create({ longUrl, shortUrl });
        res.json({ success: true, result: { shortUrl: createRes.shortUrl } });
      } catch (err) {
        console.error("Insert LongUrl Error!", err);
        res.json({ success: false, msg: "Insert LongUrl Error!" });
      }
    });

    app.get("/fetchLongUrl", (req, res) => {
      const { shortUrl } = req.query;
      shortUrlModel
        .findOne({ shortUrl })
        .then((findRes) => {
          if (!findRes) {
            res.json({ success: false, msg: "Your short url not exists！" });
            return;
          }
          res.json({ success: true, result: { longUrl: findRes.longUrl } });
        })
        .catch((err) => {
          console.error("Find LongUrl Error!");
          res.json({ success: false, msg: "Find LongUrl Error!" });
        });
    });

    app.listen(9000, () => {
      console.log("Server is listening on port 9000");
    });
  })
  .catch((err) => {
    console.error("Connect MongoDB Failed!");
    process.exit();
  });
