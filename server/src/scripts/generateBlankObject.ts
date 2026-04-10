import { Project, type Type } from "ts-morph";
import path from "path";
import fs from "fs";

function getDefaultValueCode(type: Type): string {
    if (type.isString()) return "''";
    if (type.isNumber()) return "0";
    if (type.isBoolean()) return "false";
    if (type.isArray()) return "[]";
    if (type.isObject()) return "{}";
    return "null";
}

function generateBlankObjectCodeFromInterface(
    filePath: string,
    interfaceName: string,
    exportConstName: string
): string {
    const project = new Project({
        tsConfigFilePath: path.resolve("tsconfig.json"),
    });

    const sourceFile = project.getSourceFile(filePath) ?? project.addSourceFileAtPath(filePath);
    const iface = sourceFile.getInterface(interfaceName);

    if (!iface) {
        throw new Error(`Interface "${interfaceName}" not found in ${filePath}`);
    }

    const lines: string[] = [];
    lines.push(`import type { ${interfaceName} } from "${getImportPath(filePath)}";`);
    lines.push("");
    lines.push(`export const ${exportConstName}: ${interfaceName} = {`);

    for (const prop of iface.getProperties()) {
        const name = prop.getName();
        const type = prop.getType();
        const defaultValue = getDefaultValueCode(type);
        lines.push(`  ${name}: ${defaultValue},`);
    }

    lines.push("};");
    lines.push("");
    lines.push(`export function createBlank${interfaceName}(): ${interfaceName} {`);
    lines.push(`  return { ...${exportConstName} };`);
    lines.push("}");

    return lines.join("\n");
}

function getImportPath(filePath: string): string {
    const withoutExt = filePath.replace(/\\/g, "/").replace(/\.ts$/, "");
    if (withoutExt.startsWith("src/")) {
        return `../${withoutExt.slice(4)}`;
    }
    return withoutExt;
}

// Example usage
const sourcePath = path.resolve("../modifiable_content/translationTextInterface.ts");
const outputPath = path.resolve("generated/blankMutableTextTranslation.ts");

const mutableTextTranslation = generateBlankObjectCodeFromInterface(
    sourcePath,
    "MutableTextTranslation",
    "BLANK_MUTABLE_TEXT_TRANSLATION"
);
const disabledContent = generateBlankObjectCodeFromInterface(
    sourcePath,
    "DisabledQuestionsAndPages",
    "BLANK_DISABLED_CONTENT"
);
const standardTextTranslation = generateBlankObjectCodeFromInterface(
    sourcePath,
    "StandardTextTranslation",
    "BLANK_STANDARD_TEXT_TRANSLATION"
);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, mutableTextTranslation, "utf8");

// eslint-disable-next-line no-undef
console.log(`Generated ${outputPath}`);
fs.writeFileSync(path.resolve("generated/blankDisabledContent.ts"), disabledContent, "utf8");
// eslint-disable-next-line no-undef
console.log(`Generated ${path.resolve("generated/blankDisabledContent.ts")}`);
fs.writeFileSync(path.resolve("generated/blankStandardTextTranslation.ts"), standardTextTranslation, "utf8");
// eslint-disable-next-line no-undef
console.log(`Generated ${path.resolve("generated/blankStandardTextTranslation.ts")}`);