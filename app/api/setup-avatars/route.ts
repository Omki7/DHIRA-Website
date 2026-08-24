import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const srcFiles: Record<string, string> = {
    "dilip-hanumara.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872893787.png",
    "dilip-hanumara-v2.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872893787.png",
    "sirish-simha.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872900508.png",
    "sirish-simha-v2.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872900508.png",
    "rupa-sridhar.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872908082.png",
    "rupa-sridhar-v2.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872908082.png",
    "rajiv-kumar.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872913574.png",
    "rajiv-kumar-v2.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872913574.png",
    "pratheep-menon.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872297383.png",
    "pratheep-menon-v2.png": "C:\\Users\\veman.chippa\\.gemini\\antigravity-ide\\brain\\a3348d91-3277-405d-aaf8-b93e90b22324\\media__1784872297383.png",
  };

  const destDir = path.join(process.cwd(), "public", "avatars");
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const results: string[] = [];
  for (const [filename, src] of Object.entries(srcFiles)) {
    if (fs.existsSync(src)) {
      const dest = path.join(destDir, filename);
      fs.copyFileSync(src, dest);
      results.push(`Copied ${filename}`);
    } else {
      results.push(`Missing src ${src}`);
    }
  }

  const nextCacheDir = path.join(process.cwd(), ".next", "cache", "images");
  if (fs.existsSync(nextCacheDir)) {
    fs.rmSync(nextCacheDir, { recursive: true, force: true });
    results.push("Cleared .next/cache/images");
  }

  return NextResponse.json({ ok: true, results });
}
