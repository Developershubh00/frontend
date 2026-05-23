
/**
 * INICET July 2026 — Result Extractor
 * ------------------------------------
 * Uses pdftotext (poppler) in -layout mode so columns stay aligned,
 * then parses every data row with a simple regex that handles:
 *   - all categories  (UR / OBC / SC / ST / EWS)
 *   - all appliedUnder values (General / Sponsored / Foreign National)
 *   - optional PWBD YES flag (empty cell → null)
 *   - MD/MS section  AND  MDS section
 *   - duplicate roll-numbers (keeps first occurrence per course)
 *
 * Prerequisites (Linux / macOS):
 *   sudo apt-get install poppler-utils   # or brew install poppler
 *
 * Usage:
 *   node extract-results.cjs <path-to-pdf> [output.json]
 *
 * Output JSON shape:
 *   [
 *     {
 *       "rollNo":       "8000003",
 *       "category":     "OBC",
 *       "appliedUnder": "General",
 *       "pwbd":         null,          // "YES" or null
 *       "rank":         "10479",
 *       "percentile":   "88.7506502",
 *       "course":       "MDMS"         // "MDMS" | "MDS"
 *     },
 *     ...
 *   ]
 */

"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ── CLI args ──────────────────────────────────────────────────────────────────
const PDF_PATH = "./inicet-2026compress.pdf";
const OUT_PATH = process.argv[3] || path.join(__dirname, "inicet-results.json");

// if (!PDF_PATH) {
//   console.error("Usage: node extract-results.cjs <path-to-pdf> [output.json]");
//   process.exit(1);
// }

// ── Step 1: extract full text with pdftotext -layout ─────────────────────────
console.log("⏳  Extracting text from PDF (this may take a minute)…");
let rawText;
try {
  rawText = execSync(`pdftotext -layout "${PDF_PATH}" -`, {
    maxBuffer: 200 * 1024 * 1024, // 200 MB buffer for 1324 pages
  }).toString("utf8");
} catch (err) {
  console.error("❌  pdftotext failed. Is poppler-utils installed?");
  console.error(err.message);
  process.exit(1);
}

// ── Step 2: split into lines ──────────────────────────────────────────────────
const lines = rawText.split("\n");

// ── Step 3: parse ─────────────────────────────────────────────────────────────
/*
 * Layout-mode columns (approximate character positions):
 *
 *  Roll No.   Category   Applied Under   PWBD   Rank   Percentile
 *  8001731    EWS        General         YES    41423  55.3374804
 *  8000003    OBC        General                10479  88.7506502
 *
 * The regex captures:
 *   group 1 – rollNo        (\d{7,8})
 *   group 2 – category      (UR|OBC|SC|ST|EWS)
 *   group 3 – appliedUnder  (General|Sponsored|Foreign National)
 *   group 4 – pwbd          (YES)?  — optional
 *   group 5 – rank          (\d+)
 *   group 6 – percentile    ([\d.]+)
 */
const ROW_RE =
  /^\s{1,6}(\d{7,8})\s{2,}\b(UR|OBC|SC|ST|EWS)\b\s{2,}(General|Sponsored|Foreign National)\s{2,}(YES\s{2,})?(\d+)\s{2,}([\d.]+)/;

// Section header detection
const MDMS_RE = /MD,\s*MS,\s*MCH\s*\(6\s*yrs\),\s*DM\s*\(6\s*yrs\)/i;
const MDS_RE = /^\s{10,}MDS\s*$/;

let currentCourse = "MDMS"; // default until we see the header
const results = [];
const seen = new Set(); // dedup key: rollNo + "|" + course

for (const line of lines) {
  // -- detect section changes --
  if (MDMS_RE.test(line)) {
    currentCourse = "MDMS";
    continue;
  }
  if (MDS_RE.test(line)) {
    currentCourse = "MDS";
    continue;
  }

  // -- try to parse a data row --
  const m = ROW_RE.exec(line);
  if (!m) continue;

  const rollNo = m[1];
  const category = m[2];
  const appliedUnder = m[3];
  const pwbd = m[4] ? "YES" : null;
  const rank = m[5];
  const percentile = m[6];

  const key = rollNo + "|" + currentCourse;
  if (seen.has(key)) continue; // skip duplicates
  seen.add(key);

  results.push({
    rollNo,
    category,
    appliedUnder,
    pwbd,
    rank,
    percentile,
    course: currentCourse,
  });
}

// ── Step 4: write JSON ────────────────────────────────────────────────────────
fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2), "utf8");

// ── Step 5: summary ───────────────────────────────────────────────────────────
const mdms = results.filter((r) => r.course === "MDMS").length;
const mds = results.filter((r) => r.course === "MDS").length;
const pwbdCount = results.filter((r) => r.pwbd === "YES").length;

console.log("=================================================");
console.log(`✅  TOTAL RECORDS  : ${results.length}`);
console.log(`   MD/MS (MDMS)   : ${mdms}`);
console.log(`   MDS             : ${mds}`);
console.log(`   PWBD (YES)      : ${pwbdCount}`);
console.log(`📄  JSON saved to  : ${OUT_PATH}`);
console.log("=================================================");
