import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PEOPLEDECIMAL_CSV_PATH = path.join(__dirname, "../data/peopleDecimal.csv");
const PEOPLELOCATION_CSV_PATH = path.join(__dirname, "../data/peopleLocation.csv");
const PEOPLEMIDDLENAME_CSV_PATH = path.join(__dirname, "../data/peopleMiddleName.csv");
const PEOPLEQUOTE_CSV_PATH = path.join(__dirname, "../data/peopleQuote.csv");
const PEOPLE_NO_HEADER = path.join(__dirname, "../data/peopleNoHeader.csv");
const BAD = path.join(__dirname, "../data/bad.csv");
const PRODUCTS_NO_HEADER = path.join(__dirname, "../data/productsNoHeader.csv");



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

//Test PersonRowSchema

const PersonRowSchema = z
  .tuple([z.string(), z.coerce.number()])
  .transform(t => ({ name: t[0], age: t[1] }));

test("parseCSV w/ schema (validates & transforms rows)", async () => {
  const people = await parseCSV(PEOPLE_NO_HEADER, PersonRowSchema);
  expect(people).toEqual([
    { name: "Alice", age: 23 },
    { name: "Bob", age: 45 }
  ]);
});

 test("parseCSV throws on failure", async () => {
  await expect(parseCSV(BAD, PersonRowSchema))
    .rejects.toThrow(/CSV Parser Failure on row 1/i); //Check for error on row 1
});


// Schema: ["name", "price", "category"] → { name, price:number, category:string }
const ProductRowSchema = z
  .tuple([z.string(), z.coerce.number(), z.string()])
  .transform(t => ({ name: t[0], price: t[1], category: t[2] }));

test("parseCSV with product schema", async () => {
  const products = await parseCSV(PRODUCTS_NO_HEADER, ProductRowSchema);
  expect(products).toEqual([
    { name: "Hammer", price: 19.99, category: "Tools" },
    { name: "Bear", price: 5.5, category: "Toys" }
  ]);
});
