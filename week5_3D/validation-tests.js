/**
 * SIT725 – 5.3D Validation Tests (MANDATORY TEMPLATE)
 *
 * HOW TO RUN: (Node.js 18+ is required)
 *   1. Start MongoDB
 *   2. Start your server (npm start)
 *   3. node validation-tests.js
 *
 * DO NOT MODIFY:
 *   - Output format (TEST|, SUMMARY|, COVERAGE|)
 *   - test() function signature
 *   - Exit behaviour
 *   - coverageTracker object
 *   - Logging structure
 *
 * YOU MUST:
 *   - Modify makeValidBook() to satisfy your schema rules
 *   - Add sufficient tests to meet coverage requirements
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

// =============================
// INTERNAL STATE (DO NOT MODIFY)
// =============================

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

// =============================
// OUTPUTS FORMAT (DO NOT MODIFY)
// =============================

function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(
    `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
  );
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;
  console.log(
    `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
  );
  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
    `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
    `|TYPE=${coverageTracker.TYPE}` +
    `|REQUIRED=${coverageTracker.REQUIRED}` +
    `|BOUNDARY=${coverageTracker.BOUNDARY}` +
    `|LENGTH=${coverageTracker.LENGTH}` +
    `|TEMPORAL=${coverageTracker.TEMPORAL}` +
    `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
    `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
    `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

// =============================
// HTTP HELPER
// =============================

async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  return { status: res.status, text };
}

// =============================
// TEST REGISTRATION FUNCTION
// =============================

async function test({ id, name, method, path, expected, body, tags }) {

  const { status } = await http(method, path, body);
  const pass = status === expected;

  const result = { id, name, method, path, expected, actual: status, pass };
  results.push(result);
  logResult(result);

  // treat missing or invalid tags as []
  const safeTags = Array.isArray(tags) ? tags : [];

  safeTags.forEach(tag => {
    if (Object.prototype.hasOwnProperty.call(coverageTracker, tag)) {
      coverageTracker[tag]++;
    }
  });
}

// =============================
// STUDENT MUST MODIFY THESE
// =============================

function makeValidBook(id) {
  return {
    id,
    title: "Valid Book Title",
    author: "Valid Author",
    year: 2020,
    genre: "Other",
    summary: "This is a valid summary for the book.",
    price: "9.99"
  };
}

function makeValidUpdate() {
  return {
    title: "Updated Book Title",
    author: "Updated Author",
    year: 2021,
    genre: "Other",
    summary: "This is a valid updated summary for the book.",
    price: "10.50"
  };
}

// =============================
// REQUIRED BASE TESTS (DO NOT REMOVE)
// =============================

async function run() {

  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);

  const createPath = API_BASE;
  const updatePath = (id) => `${API_BASE}/${id}`;

  // ---- T01 Valid CREATE ----
  await test({
    id: "T01",
    name: "Valid create",
    method: "POST",
    path: createPath,
    expected: 201,
    body: makeValidBook(uniqueId),
    tags: []
  });

  // ---- T02 Duplicate ID ----
  await test({
    id: "T02",
    name: "Duplicate ID",
    method: "POST",
    path: createPath,
    expected: 409,
    body: makeValidBook(uniqueId),
    tags: ["CREATE_FAIL"]
  });

  // ---- T03 Immutable ID ----
  await test({
    id: "T03",
    name: "Immutable ID on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), id: "b999" },
    tags: ["UPDATE_FAIL", "IMMUTABLE"]
  });

  // ---- T04 Unknown field CREATE ----
  await test({
    id: "T04",
    name: "Unknown field CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now()+1}`), hack: true },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // ---- T05 Unknown field UPDATE ----
  await test({
    id: "T05",
    name: "Unknown field UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), hack: true },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });

  // =====================================
  // STUDENTS MUST ADD ADDITIONAL TESTS
  // =====================================
  //
  // Add tests covering:
  // - REQUIRED
  // - TYPE
  // - BOUNDARY
  // - LENGTH
  // - TEMPORAL
  // - UPDATE_FAIL
  //
  // Each test must include appropriate tags.
  //
    // ---- T06 Missing title ----
  await test({
    id: "T06",
    name: "Missing required title",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => {
      const book = makeValidBook(`b${Date.now()+2}`);
      delete book.title;
      return book;
    })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // ---- T07 Missing author ----
  await test({
    id: "T07",
    name: "Missing required author",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => {
      const book = makeValidBook(`b${Date.now()+3}`);
      delete book.author;
      return book;
    })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // ---- T08 Invalid year type ----
  await test({
    id: "T08",
    name: "Invalid year type",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+4}`),
      year: "not-a-number"
    },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // ---- T09 Year below minimum boundary ----
  await test({
    id: "T09",
    name: "Year below minimum",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+5}`),
      year: 999
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // ---- T10 Future year ----
  await test({
    id: "T10",
    name: "Future publication year",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+6}`),
      year: new Date().getFullYear() + 1
    },
    tags: ["CREATE_FAIL", "TEMPORAL"]
  });

  // ---- T11 Title too short ----
  await test({
    id: "T11",
    name: "Title too short",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+7}`),
      title: "A"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T12 Title too long ----
  await test({
    id: "T12",
    name: "Title too long",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+8}`),
      title: "A".repeat(101)
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T13 Author too short ----
  await test({
    id: "T13",
    name: "Author too short",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+9}`),
      author: "A"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T14 Genre too short ----
  await test({
    id: "T14",
    name: "Genre too short",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+10}`),
      genre: "SF"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T15 Summary too short ----
  await test({
    id: "T15",
    name: "Summary too short",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+11}`),
      summary: "Too short"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T16 Price must be greater than zero ----
  await test({
    id: "T16",
    name: "Price zero",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+12}`),
      price: "0"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // ---- T17 Negative price ----
  await test({
    id: "T17",
    name: "Negative price",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+13}`),
      price: "-5.00"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // ---- T18 Invalid price type ----
  await test({
    id: "T18",
    name: "Invalid price type",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+14}`),
      price: "invalid-price"
    },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // ---- T19 UPDATE title too short ----
  await test({
    id: "T19",
    name: "Update title too short",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      title: "A"
    },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });

  // ---- T20 UPDATE future year ----
  await test({
    id: "T20",
    name: "Update future year",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      year: new Date().getFullYear() + 1
    },
    tags: ["UPDATE_FAIL", "TEMPORAL"]
  });

  // ---- T21 UPDATE price zero ----
  await test({
    id: "T21",
    name: "Update price zero",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      price: "0"
    },
    tags: ["UPDATE_FAIL", "BOUNDARY"]
  });

  // ---- T22 UPDATE valid data ----
  await test({
    id: "T22",
    name: "Valid update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 200,
    body: makeValidUpdate(),
    tags: []
  });

  // ---- T23 UPDATE non-existent book ----
  await test({
    id: "T23",
    name: "Update non-existent book",
    method: "PUT",
    path: updatePath("nonexistent-book"),
    expected: 404,
    body: makeValidUpdate(),
    tags: ["UPDATE_FAIL"]
  });

  // ---- T24 ID too short ----
  await test({
    id: "T24",
    name: "ID too short",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook("b"),
      id: "b"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T25 ID too long ----
  await test({
    id: "T25",
    name: "ID too long",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook("b12345678901234567890"),
      id: "b12345678901234567890"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  const pass = logSummary();
  logCoverage();

  process.exit(pass ? 0 : 1);
}

run().catch(err => {
  console.error("ERROR", err);
  process.exit(2);
});
