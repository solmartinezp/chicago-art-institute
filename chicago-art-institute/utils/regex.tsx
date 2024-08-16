export default function removeHtmlTags(str: string): string {
    const cleanStr = str.replace(/<[^>]+>/g, '');
    const words = cleanStr.split(/\s+/);

    if (words.length > 50) {
        return words.slice(0, 50).join(' ') + '...';
    }

    return cleanStr;
}