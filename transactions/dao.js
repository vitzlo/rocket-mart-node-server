import model from "./model.js";

export const createTransaction = (transaction) => model.create(transaction);
export const findAllTransactions = () => model.find();
export const findTransactionById = (id) => model.findById(id);
export const findTransactionsBySellerName = (seller) =>
  model.find({ seller });
export const findTransactionsByBuyerName = (buyer) => model.find({ buyer });
export const findTransactionByPokemonId = (pokemonId) =>
  model.find({ pokemonId });
export const updateTransaction = (id, transaction) =>
  model.findByIdAndUpdate(id, transaction);
export const deleteTransaction = (id) => model.findByIdAndDelete(id);