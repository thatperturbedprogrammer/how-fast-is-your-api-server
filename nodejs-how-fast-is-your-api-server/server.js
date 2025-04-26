const express = require("express");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.text());

app.use(cors());

// server index.html
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/sendrequest", (req, res) => {
  const bodyData = req.body;
  console.log(req.body);

  // Time taken logic

  const timeWhenReqSent = req.body.timeWhenReqSent;
  const timeWhenReqSentLocale = new Date(timeWhenReqSent).toLocaleString();

  const timeWhenResSent = Date.now();
  const timeWhenResSentLocale = new Date(timeWhenResSent).toLocaleString();

  console.log("Req time: ", timeWhenReqSentLocale);
  console.log("Res time: ", timeWhenResSentLocale);

  const difference = timeWhenResSent - timeWhenReqSent;

  console.log("Diff time: ", difference);

  res.status(200).json({
    body: bodyData,
    message: "Success",
    timeDifference: `${difference} milliseconds`,
    timeWhenReqSentLocale: timeWhenReqSentLocale,
    timeWhenResSentLocale: timeWhenResSentLocale,
  });
});

// Dynamic port for Render
const PORT = process.env.PORT || 4008;
app.listen(PORT, () => {
  console.log(`API Request Speed Server running on http://localhost:${PORT}`);
});
