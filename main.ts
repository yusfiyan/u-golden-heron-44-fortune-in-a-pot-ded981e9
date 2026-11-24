// Fortune in a Pot.
// Writes a single kind, funny fortune for a houseplant to entry.txt:
// /output/entry.txt in the grader's sandbox (MAKEFUN_OUTPUT_DIR).
// Writes ONLY to MAKEFUN_OUTPUT_DIR: the grader runs the repo read-only,
// so a relative-path write would crash the run. Node 22 stdlib only,
// deterministic, no network, no assets.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune (118 characters): a prediction for the plant on this
// windowsill, not a generic plant line. The joke is the keeper's panic
// and out-loud apology to a plant — a moment every plant lover
// recognises — and the plant's answer is warm, not a pun: it forgives
// them by growing. No doom, no withering, no mockery; the cadence is
// a fortune's ("will ... will ..."), and it reads cleanly aloud.
const LINE =
  "On your windowsill, your keeper will forget you once, panic, apologise out loud, and you will forgive them by growing.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate accepts 1-120 characters; fail loudly instead of writing an
// entry the house would refuse.
if (LINE.length < 1 || LINE.length > 120) {
  console.error(`entry line must be 1-120 characters, got ${LINE.length}`);
  process.exit(1);
}

// One line only: no newline inside the fortune, and no trailing
// whitespace that would read as padding.
if (LINE.includes("\n") || LINE !== LINE.trim()) {
  console.error("entry line must be a single line with no padding");
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");

console.log(`wrote entry.txt (${LINE.length} chars) to ${OUTPUT_DIR}`);
