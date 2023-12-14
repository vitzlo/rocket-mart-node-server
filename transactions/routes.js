import * as dao from "./dao.js";

function TransactionRoutes(app) {
  const createTransaction = async (req, res) => {
    if (
      req.session["currentUser"] &&
      req.session["currentUser"].type === "SELLER"
    ) {
      const transaction = await dao.createTransaction({
        ...req.body,
        seller: req.session["currentUser"].username,
        timeOfListing: new Date().toJSON(),
      });
      res.json(transaction);
    } else {
      res.status(401).send("Unauthorized, not logged in or not a seller");
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
  const findTransactionsBySellerName = async (req, res) => {
    const transactions = await dao.findTransactionsBySellerName(
      req.params.seller
    );
    res.json(transactions);
  };
  const findTransactionsByBuyerName = async (req, res) => {
    const transactions = await dao.findTransactionsByBuyerName(
      req.params.buyer
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
        buyer: req.session["currentUser"].username,
        timeOfPurchase: new Date().toJSON(),
      });
      const transaction = await dao.findTransactionById(
        req.params.transactionId
      );

      res.json(transaction);
    } else {
      res.status(401).send("Unauthorized, not logged in");
    }
  };

  app.post("/api/transactions", createTransaction);
  app.get("/api/transactions", findAllTransactions);
  app.get("/api/transactions/:id", findTransactionById);
  app.get("/api/transactions/seller/:seller", findTransactionsBySellerName);
  app.get("/api/transactions/buyer/:buyer", findTransactionsByBuyerName);
  app.get("/api/transactions/pokemon/:pokemonId", findTransactionByPokemonId);
  app.put("/api/transactions/:id", updateTransaction);
  app.delete("/api/transactions/:id", deleteTransaction);
  app.put("/api/transactions/purchase/:transactionId", purchaseTransaction);
}

export default TransactionRoutes;
