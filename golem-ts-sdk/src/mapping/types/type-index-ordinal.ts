export function numberToOrdinalKebab(n: number): string {
    const units: Record<number, string> = {
        0: "",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
    };

    const teens: Record<number, string> = {
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
    };

    const tens: Record<number, string> = {
        2: "twenty",
        3: "thirty",
        4: "forty",
        5: "fifty",
        6: "sixty",
        7: "seventy",
        8: "eighty",
        9: "ninety",
    };

    const irregularOrdinals: Record<string, string> = {
        one: "first",
        two: "second",
        three: "third",
        five: "fifth",
        eight: "eighth",
        nine: "ninth",
        twelve: "twelfth",
    };

    // Convert number to cardinal words
    function toWords(num: number): string {
        if (num < 10) return units[num];
        if (num < 20) return teens[num];
        if (num < 100) {
            const ten = Math.floor(num / 10);
            const unit = num % 10;
            return tens[ten] + (unit ? "-" + units[unit] : "");
        }
        if (num < 1000) {
            const hundred = Math.floor(num / 100);
            const remainder = num % 100;
            return units[hundred] + "-hundred" + (remainder ? "-" + toWords(remainder) : "");
        }
        return num.toString(); // fallback for larger numbers
    }

    // Convert cardinal to ordinal
    const words = toWords(n);
    const parts = words.split("-");
    const lastWord = parts[parts.length - 1];

    let ordinalLastWord: string;
    if (irregularOrdinals[lastWord]) {
        ordinalLastWord = irregularOrdinals[lastWord];
    } else if (lastWord.endsWith("y")) {
        ordinalLastWord = lastWord.slice(0, -1) + "ieth";
    } else {
        ordinalLastWord = lastWord + "th";
    }

    parts[parts.length - 1] = ordinalLastWord;
    return parts.join("-").toLowerCase();
}
