
import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 3000;

// Scrape mock MERX public solicitations page
async function scrapeMerx() {
  const url = "https://www.merx.com/public/supplier/solicitations";
  const bids = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $(".solicitation .solicitation-title").each((_, el) => {
      const title = $(el).text().trim();
      const link = "https://www.merx.com" + $(el).attr("href");
      bids.push({
        title,
        source: "MERX",
        status: "Open",
        deadline: "TBD",
        link,
      });
    });
  } catch (err) {
    console.error("MERX scraping failed:", err.message);
  }

  return bids;
}

app.get("/api/bids", async (req, res) => {
  const bids = await scrapeMerx();
  res.json(bids);
});

app.listen(PORT, () => {
  console.log(`Scraper server running at http://localhost:${PORT}`);
});
