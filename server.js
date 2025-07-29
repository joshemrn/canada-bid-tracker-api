import express from "express";
import scrapeMerx from "./scraper/merx.js";
import scrapeSeao from "./scraper/seao.js";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/api/bids", async (req, res) => {
  try {
    const [merxData, seaoData] = await Promise.all([scrapeMerx(), scrapeSeao()]);
    const bids = [...merxData, ...seaoData];
    res.json(bids);
  } catch (err) {
    console.error("Error during scraping:", err.message);
    res.status(500).json({ error: "Scraping failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Scraper server running at http://localhost:${PORT}`);
});
