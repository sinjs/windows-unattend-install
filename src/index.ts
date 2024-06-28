import fs from "fs/promises";
import { path, replaceAsync, replaceScriptRegex } from "./util.js";

// Main
console.log("Reading base file...");

const base = await fs.readFile(path("base.xml"), "utf-8");

const result = await replaceAsync(base, replaceScriptRegex, async (substring, scriptName) => {
  const scriptPath = path("scripts", scriptName);
  console.log(`Replacing '${scriptName}' script [${scriptPath}]`);
  const script = await fs.readFile(scriptPath, "utf-8");
  return script;
});

const resultPath = path("dist", "autounattend.xml");
console.log(`Writing result [${resultPath}]`);

await fs.writeFile(resultPath, result);
