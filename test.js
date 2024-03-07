let myArray = [];

// 使用默认逗号分隔符连接数组元素
let joinedString = myArray.join();
console.log(joinedString); // 输出: "apple,banana,orange"

// 使用自定义分隔符连接数组元素
let customSeparator = '-';
let customJoinedString = myArray.join(customSeparator);
console.log(customJoinedString); // 输出: "apple-banana-orange"
