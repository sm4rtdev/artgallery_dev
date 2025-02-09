const axios = require("axios");
const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");

const UNISWAP_SUBGRAPH_URL =
  "https://gateway.thegraph.com/api/6d2036fd2889c0945c345c2098e76026/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";

// Get All Products
exports.getPoolInfo = asyncErrorHandler(async (req, res, next) => {
  try {
    const { poolId } = req.params; // Get pool ID from URL params
    console.log(poolId);
    if (!poolId) {
      return res.status(400).json({ error: "Pool ID is required" });
    }

    const query = {
      query: `
          {
            pool(id: "${poolId}") {
              id
              token0 { symbol name }
              token1 { symbol name }
              feeTier
              liquidity
              volumeUSD
            }
          }`,
    };

    const response = await axios.post(UNISWAP_SUBGRAPH_URL, query);

    if (!response.data.data.pool) {
      return res.status(404).json({ error: "Pool not found" });
    }

    return res.json(response.data.data.pool);
  } catch (error) {
    console.error("Error fetching pool data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
