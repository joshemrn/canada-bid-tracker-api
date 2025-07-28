import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 3000;

async function scrapeMerx() {
  const url = "https://www.merx.com/public/supplier/solicitations";
  const bids = [];

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36"
      }
    });

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
