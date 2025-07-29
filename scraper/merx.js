import axios from "axios";
import cheerio from "cheerio";

const scrapeMerx = async () => {
  const bids = [];
  try {
    const response = await axios.get("https://www.merx.com/public/solicitations/open");
    const $ = cheerio.load(response.data);

    $(".solicitation-list-item").each((_, el) => {
      const title = $(el).find(".solicitation-title").text().trim();
      const deadline = $(el).find(".solicitation-date span:last-child").text().trim();
      const link = "https://www.merx.com" + $(el).find("a.solicitation-title").attr("href");

      if (title && link) {
        bids.push({
          title,
          source: "MERX",
          status: "Open",
          deadline,
          link
        });
      }
    });
  } catch (err) {
    console.error("MERX scraping failed:", err.message);
  }
  return bids;
};

export default scrapeMerx;
