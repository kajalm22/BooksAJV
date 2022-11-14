const asyncHandler = require("express-async-handler");
const Books = require("../model/bookModel");

const Ajv = require("ajv");
const ajv = new Ajv();

const createBook = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);

    throw new Error("please add a book");
  }

  const newBook = await Books.create({
    text: req.body.text,
    number: req.body.number,
  });

  res.status(200).json(newBook);
});

const getBook = asyncHandler(async (req, res) => {
  //pagination
  // const page = req.query.p || 1;
  // const perPage = 3;
  const books = await Books.find();
  // .skip(page * perPage)
  // .limit(perPage);

  res.status(200).json(books);

  //AJV implementation
  const schema = {
    type: "object",
    properties: {
      foo: { type: "integer" },
      bar: { type: "string" },
    },
    required: ["foo"],

    additionalProperties: false,
  };

  const validate = ajv.compile(schema);

  const valid = validate(books);

  if (!valid) {
    //if true , then it will give response(list of books added) when hitting get method
    console.log("Schema validated. No error found");
    res.status(200).json(books);
  } else {
    res.status(400);

    throw new Error("validation error");
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  const books = await Books.findById(req.params.id);
  if (!books) {
    res.status(400);

    throw new Error("Could not delete . Please provide a valid Book ID");
  }

  const deletedBook = await Books.deleteOne();
  res.status(200).json(deletedBook);
});

module.exports = { createBook, getBook, deleteBook };
