import type { ReactNode } from "react";

const TOKEN_PATTERN = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\b(?:def|class|return|if|elif|else|for|while|in|from|import|as|with|True|False|None|and|or|not|lambda|try|except|raise|yield|async|await|pass|break|continue)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*(?=\s*\()|[=+*/<>!%-]+)/g;
const KEYWORDS = new Set([
  "def", "class", "return", "if", "elif", "else", "for", "while", "in", "from", "import", "as", "with", "True", "False", "None", "and", "or", "not", "lambda", "try", "except", "raise", "yield", "async", "await", "pass", "break", "continue",
]);

function tokenClass(token: string) {
  if (token.startsWith("#")) return "text-[var(--muted)] italic";
  if (token.startsWith("\"") || token.startsWith("'") || token.startsWith("\"\"\"") || token.startsWith("'''")) return "text-amber-700 dark:text-amber-300";
  if (KEYWORDS.has(token)) return "text-violet-700 dark:text-violet-300";
  if (/^\d/.test(token)) return "text-orange-700 dark:text-orange-300";
  if (/^[A-Za-z_]/.test(token)) return "text-cyan-700 dark:text-cyan-300";
  return "text-emerald-700 dark:text-emerald-300";
}

export function highlightPython(source: string): ReactNode[] {
  const parts = source.split(TOKEN_PATTERN);
  const tokens = new Set(source.match(TOKEN_PATTERN) ?? []);
  return parts.map((part, index) =>
    tokens.has(part) ? (
      <span className={tokenClass(part)} key={`${index}-${part.slice(0, 8)}`}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
