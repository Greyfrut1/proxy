const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: "Missing URL parameter" });
    }

    try {
        const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        const contentType = response.headers.get("content-type");

        res.set("Content-Type", contentType);
        response.body.pipe(res);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
