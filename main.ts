// Two Robots in an Elevator: one line of awkward robot small talk
// Entry for make.fun competition
// u-motasimfuad-two-robots-in-an-elevator-8c6aeb8f
//
// Writes one line of awkward small talk (103 chars, pure ASCII) to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY = "My diagnostic says this silence means we are both avoiding the fact that I replaced you on floor three.";
// 103 chars, pure ASCII, one line. Counted char by char; see candidates.md.

function main(): void {
  // Guard the gate: 1-200 chars, exactly one line, ASCII only, no padding.
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} chars, must be 1-200`);
  }
  if (ENTRY !== ENTRY.trim() || ENTRY.includes("\n") || /[^\x00-\x7F]/.test(ENTRY)) {
    throw new Error("entry must be a single trimmed ASCII line");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");

  // Also drop a copy next to this script so the repo carries entry.txt.
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    writeFileSync(join(here, "entry.txt"), ENTRY + "\n", "utf8");
  } catch {
    // The grader sandbox may not allow writing beside the script; /output is what counts.
  }
}

main();
