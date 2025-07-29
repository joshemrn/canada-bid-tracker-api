import axios from "axios";
import cheerio from "cheerio";

const scrapeSeao = async () => {
  const bids = [];
  try {
    const response = await axios.get("https://www.seao.ca/OpportunitySearch/Search?callingPage=1");
    const $ = cheerio.load(response.data);

    $(".searchResults tr").each((_, el) => {
      const columns = $(el).find("td");
      const title = $(columns[1]).text().trim();
      const deadline = $(columns[4]).text().trim();
      const link = "https://www.seao.ca" + $(columns[1]).find("a").attr("href");

      if (title && link) {
        bids.push({
          title,
          source: "SEAO",
          status: "Open",
          deadline,
          link
        });
      }
    });
  } catch (err) {
    console.error("SEAO scraping failed:", err.message);
  }
  return bids;
};

export default scrapeSeao;
