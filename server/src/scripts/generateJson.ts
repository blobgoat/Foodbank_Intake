import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, ParseError } from 'jsonc-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server/src/scripts -> server/src -> server -> project root
const projectRoot = path.resolve(__dirname, '../../..');
const targetRoot = path.join(projectRoot, 'modifiable_content');

// Finds all jsonc files within a specified directory.
function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.jsonc')) {
      results.push(fullPath);
    }
  }

  return results;
}

function convertJsoncFile(inputPath: string) {
  const raw = fs.readFileSync(inputPath, 'utf-8');
  const errors: ParseError[] = [];
  const parsed = parse(raw, errors);

  if (errors.length > 0) {
    const formattedErrors = errors
      .map(err => `offset ${err.offset}, length ${err.length}, error code ${err.error}`)
      .join('; ');
    throw new Error(`Failed to parse ${inputPath}: ${formattedErrors}`);
  }

  const outputPath = inputPath.replace(/\.jsonc$/i, '.generated.json');
  fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2) + '\n', 'utf-8');

  console.log(`Generated: ${path.relative(projectRoot, outputPath)}`);
}

function main() {
  if (!fs.existsSync(targetRoot)) {
    throw new Error(`Directory not found: ${targetRoot}`);
  }

  const jsoncFiles = walk(targetRoot);

  if (jsoncFiles.length === 0) {
    console.log('No .jsonc files found.');
    return;
  }

  for (const file of jsoncFiles) {
    convertJsoncFile(file);
  }

  console.log(`Done. Converted ${jsoncFiles.length} file(s).`);
}

main();