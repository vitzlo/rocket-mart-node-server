import * as dao from "./dao.js";

function TransactionRoutes(app) {
  const createTransaction = async (req, res) => {
    const transaction = await dao.createTransaction(req.body);
    res.json(transaction);
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
}

export default TransactionRoutes;
