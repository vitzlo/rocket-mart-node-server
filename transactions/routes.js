import * as dao from "./dao.js";

function TransactionRoutes(app) {
  const createTransaction = async (req, res) => {
    if (req.session["currentUser"]) {
      const transaction = await dao.createTransaction({
        ...req.body,
        sellerId: req.session["currentUser"]._id,
        timeOfListing: new Date().toJSON(),
      });
      res.json(transaction);
    } else {
      res.json(undefined);
    }
  };
  const deleteTransaction = async (req, res) => {
    const status = await dao.deleteTransaction(req.params.id);
    res.json(status);
  };
  const findAllTransactions = async (req, res) => {
    const transactions = await dao.findAllTransactions();
    res.json(transactions);
  };
  const findTransactionById = async (req, res) => {
    const transaction = await dao.findTransactionById(req.params.id);
    res.json(transaction);
  };
  const findTransactionsBySellerId = async (req, res) => {
    const transactions = await dao.findTransactionsBySellerId(
      req.params.sellerId
    );
    res.json(transactions);
  };
  const findTransactionsByBuyerId = async (req, res) => {
    const transactions = await dao.findTransactionsByBuyerId(
      req.params.buyerId
    );
    res.json(transactions);
  };
  const findTransactionByPokemonId = async (req, res) => {
    const transaction = await dao.findTransactionByPokemonId(
      req.params.pokemonId
    );
    res.json(transaction);
  };
  const updateTransaction = async (req, res) => {
    const status = await dao.updateTransaction(req.params.id, req.body);
    res.json(status);
  };
  const purchaseTransaction = async (req, res) => {
    if (req.session["currentUser"]) {
      await dao.updateTransaction(req.params.transactionId, {
        buyerId: req.session["currentUser"]._id,
        timeOfPurchase: new Date().toJSON(),
      });
      const transaction = await dao.findTransactionById(
        req.params.transactionId
      );

      res.json(transaction);
    } else {
      res.json(undefined);
    }
  };

  app.post("/api/transactions", createTransaction);
  app.get("/api/transactions", findAllTransactions);
  app.get("/api/transactions/:id", findTransactionById);
  app.get("/api/transactions/seller/:sellerId", findTransactionsBySellerId);
  app.get("/api/transactions/buyer/:buyerId", findTransactionsByBuyerId);
  app.get("/api/transactions/pokemon/:pokemonId", findTransactionByPokemonId);
  app.put("/api/transactions/:id", updateTransaction);
  app.delete("/api/transactions/:id", deleteTransaction);
  app.put("/api/transactions/purchase/:transactionId", purchaseTransaction);
}

export default TransactionRoutes;
