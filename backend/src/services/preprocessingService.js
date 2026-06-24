// services/preprocessingService.js

const Sastrawi = require("sastrawijs");
const sw = require("stopword");

const stemmer = new Sastrawi.Stemmer();

const preprocessText = (text) => {
  if (!text) return "";

  // case folding
  let result = text.toLowerCase();

  // hapus simbol & angka
  result = result.replace(/[^a-zA-Z\s]/g, "");

  // tokenizing
  let tokens = result.split(/\s+/);

  // stopword removal
  tokens = sw.removeStopwords(tokens);

  // stemming
  result = tokens.map((word) => stemmer.stem(word)).join(" ");

  return result;
};

module.exports = preprocessText;