export default function simpleStem(word: string) {
    const suffixes = ["ing", "ed", "ly", "es", "s", "ment", "ness"];
    for (const suffix of suffixes) {
        if (word.endsWith(suffix)) {
            return word.slice(0, -suffix.length);
        }
    }
    return word;
}
