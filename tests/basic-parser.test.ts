import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PEOPLEDECIMAL_CSV_PATH = path.join(__dirname, "../data/peopleDecimal.csv");
const PEOPLELOCATION_CSV_PATH = path.join(__dirname, "../data/peopleLocation.csv");
const PEOPLEMIDDLENAME_CSV_PATH = path.join(__dirname, "../data/peopleMiddleName.csv");
const PEOPLEQUOTE_CSV_PATH = path.join(__dirname, "../data/peopleQuote.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV w/ Apostrophes and Decimal", async () => { //PASSES
  const results = await parseCSV(PEOPLEDECIMAL_CSV_PATH)

  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["O'Brien", "23"]);
  expect(results[2]).toEqual(["Bob", "30.5"]);
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV w/ Locations and Commas", async () => { //FAILS
  const results = await parseCSV(PEOPLELOCATION_CSV_PATH)

  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age", "location"]);
  expect(results[1]).toEqual(["O'Brien", "23","Providence, RI"]);
  expect(results[2]).toEqual(["Bob", "30.5","Newport, RI"]);
  expect(results[3]).toEqual(["Charlie", "25","Boston, MA"]);
  expect(results[4]).toEqual(["Nim", "22", "San Francisco, CA"]);
});


test("parseCSV w/ Empty Column", async () => { //PASSES
  const results = await parseCSV(PEOPLEMIDDLENAME_CSV_PATH)

  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["first name", "middle name", "last name", "age"]);
  expect(results[1]).toEqual(["O'Brien", "John", "Doe", "23"]);
  expect(results[2]).toEqual(["Bob", "", "Smith", "30.5"]);
  expect(results[3]).toEqual(["Charlie", "Michael", "Brown", "25"]);
  expect(results[4]).toEqual(["Nim", "William", "Johnson", "22"]);
});

test("parseCSV w/ Double Quotes", async () => { //FAILS
  const results = await parseCSV(PEOPLEQUOTE_CSV_PATH)

  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age", "quote"]);
  expect(results[1]).toEqual(["Alice", "23", "Hello"]);
  expect(results[2]).toEqual(["Bob", "30", "Hi"]);
  expect(results[3]).toEqual(["Charlie", "25", "Hey"]);
  expect(results[4]).toEqual(["Nim", "22", "Greetings"]);
});
