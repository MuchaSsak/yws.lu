/**
 * A one-line taste of a Markdown text (the We Spark tiles, site/structure.md § We Spark Projects): its first real
 * paragraph (not a heading, list or short credit line such as "Supported by Erasmus+"), whole if it is short, else its
 * first sentence, cut at a word with an ellipsis if even that runs long. The client's words, never rewritten.
 */
const MIN_WORDS = 5;
const MAX_CHARS = 170;

const plain = (markdown: string) =>
  markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<wbr>/g, "")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export function excerpt(markdown: string): string {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block && !/^(#|-|\*|\d+\.|>|\|)/.test(block))
    .map(plain)
    .find((text) => text.split(" ").length >= MIN_WORDS);
  if (!paragraph) return "";
  if (paragraph.length <= MAX_CHARS) return paragraph;
  const sentence = paragraph.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? paragraph;
  if (sentence.length <= MAX_CHARS) return sentence;
  return `${sentence.slice(0, sentence.lastIndexOf(" ", MAX_CHARS - 10)).replace(/[,;:–—-]$/, "")}…`;
}
