import { join } from "path";

export const replaceScriptRegex = /\$\$replaceScript\(([^)]+)\)/g;

export function path(...paths: string[]) {
  return join(import.meta.dirname, "..", ...paths);
}

export async function replaceAsync(
  string: string,
  regexp: RegExp,
  replacerFunction: (...matches: string[]) => Promise<string>
) {
  const replacements = await Promise.all(
    Array.from(string.matchAll(regexp), (match) => replacerFunction(...match))
  );
  let i = 0;
  return string.replace(regexp, () => replacements[i++]);
}
