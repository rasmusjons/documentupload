/* eslint-disable */
import {
  stringCleaner,
  stringCleanerKeepUpperCase,
  arrayCreator,
  arrayCleaner,
  wordCounter
} from "../src/store/helpers";

test("cleans string from special characters and linebreaks", () => {
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

test("cleans string from special characters and linebreaks but keeps uppercase", () => {
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

test("creates array from string", () => {
  expect(arrayCreator("string")).toStrictEqual(["string"]);
  expect(arrayCreator("string with mutiple words")).toStrictEqual([
    "string",
    "with",
    "mutiple",
    "words"
  ]);
  expect(arrayCreator(" string  with mutiple  words")).toStrictEqual([
    "",
    "string",
    "",
    "with",
    "mutiple",
    "",
    "words"
  ]);
});

test("cleans array from empty strings", () => {
  expect(arrayCleaner([""])).toStrictEqual([]);
  expect(arrayCleaner(["", "word", "", "", "word", ""])).toStrictEqual([
    "word",
    "word"
  ]);
});

test("calculates the most common word or words in an array of strings. Returns an array of string/strings", () => {
  expect(wordCounter(["monkey", "monkey", "monkey"])).toStrictEqual(["monkey"]);
  expect(wordCounter(["monkey", "monkey", "ape"])).toStrictEqual(["monkey"]);
  expect(wordCounter(["monkey", "monkey", "ape", "ape"])).toStrictEqual([
    "monkey",
    "ape"
  ]);
  expect(wordCounter(["monkey", "chimpanzee", "ape"])).toStrictEqual([
    "monkey",
    "chimpanzee",
    "ape"
  ]);
  expect(
    wordCounter(["MONKEY", "MONkey", "Monkey", "ape", "ape"])
  ).toStrictEqual(["ape"]);
});
