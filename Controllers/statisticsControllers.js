const express = require("express");
const router = express.Router();
const app = express();
const Statistic = require("../Models/statisticModel");
router.post("/save", async (req, res) => {
  try {
    const { date, views, clicks, cost } = req.body;
    console.log(res);
    const post = new Statistic({
      date, // new Date() could be used
      views,
      clicks,
      cost,
    });

    await post.save();
    res.send({
      error: false,
      message: "Post Saved",
    });
  } catch (error) {
    res.status(404).send({ error: true, message: error });
  }
});

router.post("/display", async (req, res) => {
  try {
    const { from, to } = req.body; // Destructuring The from and to values
    const availablePosts = await Statistic.find(
      {
        date: {
          $gte: new Date(from),
          $lte: new Date(to),
        },
      },
      "date clicks views cost "
    )
      .sort("date")
      .lean();

    /*
     * updatedValues is important to retrieve the most updated values for cpc and cpm  (calculated based on the cost,clicks,views values)
     * This Function could be implemented with Model.pre("save") function on models which could calculate the cpc,cpm while saving the record
     * And also be updated automatically when the model was updated
     */
    const updatedValues = availablePosts.map((post) => {
      return {
        ...post,
        cpc: post.cost / post.clicks,
        cpm: (post.cost / post.views) * 1000,
      };
    });

    res.status(200).send({
      error: false,
      data: updatedValues,
    });
  } catch (error) {
    console.log(`Error on /display route ${error}`);
    res.status(404).send({ error: true, message: error });
  }
});

/*
 * displaySpecificPost is responsible to return specific post by its unique ID
 * This funcction is helpful if we have searching algorithm
 *
 */
router.get("/displaySpecificPost/:postID", async (req, res) => {
  try {
    const { postID } = req.params;
    const post = await Statistic.find({ _id: postID });
    res.send({ error: false, data: post });
  } catch (error) {
    res.status(404).send({ error: true, message: error });
  }
});

router.get("/reset", async (req, res) => {
  try {
    await Statistic.deleteMany({});
    res.send({
      error: false,
      message: "All Posts Are Successfully Deleted!",
    });
  } catch (error) {
    res.status(409).send({ error: true, message: error });
    console.log(error);
  }
});

module.exports = router;
