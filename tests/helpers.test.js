/* eslint-disable */
import {
  stringCleaner,
  stringCleanerKeepUpperCase,
  createArray,
  sanitizeEmptyValues,
  wordCounter
} from "../src/store/helpers";

test("Cleans string from special characters and line breaks", () => {
  expect(stringCleaner("lower case string")).toBe("lower case string");
  expect(stringCleaner("lower. case. string")).toBe("lower  case  string");
  expect(stringCleaner("lower? case!#€% string")).toBe(
    "lower  case     string"
  );
  expect(stringCleaner("lower \n case \n string")).toBe(
    "lower   case   string"
  );
  expect(stringCleaner("Upper \n Case \n string")).toBe(
    "upper   case   string"
  );
});

test("Cleans string from special characters and line breaks but keeps uppercase", () => {
  expect(stringCleanerKeepUpperCase("Upper Case String")).toBe(
    "Upper Case String"
  );
  expect(stringCleanerKeepUpperCase("UPPER. Case. String")).toBe(
    "UPPER  Case  String"
  );
  expect(stringCleanerKeepUpperCase("UPPEr? case!#€% string")).toBe(
    "UPPEr  case     string"
  );
  expect(stringCleanerKeepUpperCase("Upper \n Case \n string")).toBe(
    "Upper   Case   string"
  );
});

test("Creates array from string", () => {
  expect(createArray("string")).toStrictEqual(["string"]);
  expect(createArray("string with multiple words")).toStrictEqual([
    "string",
    "with",
    "multiple",
    "words"
  ]);
  expect(createArray(" string  with multiple  words")).toStrictEqual([
    "",
    "string",
    "",
    "with",
    "multiple",
    "",
    "words"
  ]);
});

test("Cleans array from empty strings", () => {
  expect(sanitizeEmptyValues([""])).toStrictEqual([]);
  expect(sanitizeEmptyValues(["", "word", "", "", "word", ""])).toStrictEqual([
    "word",
    "word"
  ]);
});

test("Calculates the most common word or words in an array of strings. Returns an object with a maxCount-value and and array of string/strings", () => {
  expect(wordCounter(["monkey", "monkey", "monkey"])).toStrictEqual({
    maxCount: 3,
    word: ["monkey"]
  });
  expect(wordCounter(["monkey", "monkey", "ape"])).toStrictEqual({
    maxCount: 2,
    word: ["monkey"]
  });
  expect(wordCounter(["monkey", "monkey", "ape", "ape"])).toStrictEqual({
    maxCount: 2,
    word: ["monkey", "ape"]
  });
  expect(wordCounter(["monkey", "chimpanzee", "ape"])).toStrictEqual({
    maxCount: 1,
    word: ["monkey", "chimpanzee", "ape"]
  });
  expect(
    wordCounter(["MONKEY", "MONkey", "Monkey", "ape", "ape"])
  ).toStrictEqual({ maxCount: 2, word: ["ape"] });
});
