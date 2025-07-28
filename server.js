import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/bids", (req, res) => {
  const allBids = [
    {
      title: "IV Bag Supply for Emergency Stockpile",
      source: "MERX",
      status: "Open",
      deadline: "2025-08-12",
      link: "https://www.merx.com/example-bid-1"
    },
    {
      title: "Provincial PPE Procurement",
      source: "SEAO",
      status: "Awarded",
      deadline: "2025-07-10",
      link: "https://www.seao.ca/example-bid-2"
    },
    {
      title: "Hospital Tracheostomy Kits",
      source: "MERX",
      status: "Open",
      deadline: "2025-08-30",
      link: "https://www.merx.com/example-bid-3"
    }
  ];

  res.json(allBids);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
