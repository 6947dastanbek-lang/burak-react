//X-TASK
function countOccurrences(obj: object, str: string): number {
    let count = 0;

    for (const key in obj) {
        // Object ichidagi keylarni aylanadi
        if (key === str) {
            count++;
        }
        const value = obj[key as keyof typeof obj]; // Keyning qiymatini oladi
        if (typeof value === "object" && value !== null) {
            // Qiymat nested object bo'lsa, ichiga kirib sanaydi
            count += countOccurrences(value, str);
        }
    }

    return count;
}

console.log(
    countOccurrences(
        {
            model: "Bugatti",
            steer: {
                model: "HANKOOK",
                size: 30,
            },
        },
        "model",
    ),
);
