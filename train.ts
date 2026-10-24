// //X-TASK
// function countOccurrences(obj: object, str: string): number {
//     let count = 0;

//     for (const key in obj) {
//         // Object ichidagi keylarni aylanadi
//         if (key === str) {
//             count++;
//         }
//         const value = obj[key as keyof typeof obj]; // Keyning qiymatini oladi
//         if (typeof value === "object" && value !== null) {
//             // Qiymat nested object bo'lsa, ichiga kirib sanaydi
//             count += countOccurrences(value, str);
//         }
//     }

//     return count;
// }

// console.log(
//     countOccurrences(
//         {
//             model: "Bugatti",
//             steer: {
//                 model: "HANKOOK",
//                 size: 30,
//             },
//         },
//         "model",
//     ),
// );
//
//Y-TASK
function findIntersection(arr1: number[], arr2: number[]): number[] {
    return arr1.filter((item: number) => arr2.includes(item));
}

console.log(findIntersection([1, 2, 3], [3, 2, 0]));
// result shu [2, 3]
