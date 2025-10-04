const rows = 4;
const columns = 4;
const min = -10;
const max = 10;

function generateRandomTable(rows, columns, min, max) {
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];

        for (let j = 0; j < columns; j++) {
            const value = Math.floor(Math.random() * (max - min + 1)) + min;
            row.push(value);
        };

        matrix.push(row);
    };

    return matrix;
};

const randomMatrix = generateRandomTable(rows, columns, min, max);

console.table(randomMatrix);

// 1.

const k = 1;

function shiftMatrix(matrix, k) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const shifted = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
    );

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const newRow = i - k;
            const newCol = j + k;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                shifted[newRow][newCol] = matrix[i][j];
            };
        };
    };

    return shifted;
};

const shiftedMatrix = shiftMatrix(randomMatrix, k);

console.log("1. Shifted matrix right and up:");
console.table(shiftedMatrix);

// 2.

function sumAfterThird(matrix) {
    let sum = 0;

    matrix.forEach(row => {
        if (row.length > 3) {
            const slice = row.slice(3);
            sum += slice.reduce((a, b) => a + b, 0);
        };
    });

    return sum;
};

const result = sumAfterThird(randomMatrix);
console.log("2. Sum of elements after the third element in each row:", result);

// 3.

function subtractionByAverage(matrix) {
    return matrix.map(row => {
        const avg = row.reduce((a, b) => a + b, 0) / row.length;
        
        return row.map(b => parseFloat((b - avg).toFixed(1)));
    });
};

const minusMatrix = subtractionByAverage(randomMatrix);

console.log("3. The matrix which rows have their arithmetic means subtracted:");
console.table(minusMatrix);

// 4.

function removeMaxElements(matrix) {
    const rewrite = matrix.flat();
    const max = Math.max(...rewrite);

    console.log("4. Maximum value in the matrix:", max);

    const rowsToRemove = new Set();
    const columnsToRemove = new Set();

    matrix.forEach((row, i) => {
        row.forEach((value, j) => {
            if (value === max) {
                rowsToRemove.add(i);
                columnsToRemove.add(j);
            };
        });
    });

    const filtered = matrix
        .filter((_, i) => !rowsToRemove.has(i))
        .map(row => row.filter((_, j) => !columnsToRemove.has(j)));

    return filtered;
};

const cleanedMatrix = removeMaxElements(randomMatrix);

console.log("The matrix after removing rows and columns with maximum values:");
console.table(cleanedMatrix);

// 5.

function swapColumns(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const rewrite = matrix.flat();
    const min = Math.min(...rewrite);
    const max = Math.max(...rewrite);

    let minColumn = -1;
    let maxColumn = -1;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === min && minColumn === -1) {
                minColumn = j;
            };
            if (matrix[i][j] === max && maxColumn === -1) {
                maxColumn = j;
            };
        };
    };

    console.log(`5. Minimum: ${min} in column ${minColumn}`);
    console.log(`   Maximum: ${max} in column ${maxColumn}`);

    if (minColumn === maxColumn) {
        console.log("Minimum and maximum are in the same column, cannot be moved");
        
        return false;
    };

    for (let i = 0; i < rows; i++) {
        [matrix[i][minColumn], matrix[i][maxColumn]] = [matrix[i][maxColumn], matrix[i][minColumn]];
    };

    return matrix;
};

const swappedMatrix = swapColumns(randomMatrix);

if (swappedMatrix !== false) {
    console.log("Matrix after swapping columns with minimum and maximum:");
    console.table(swappedMatrix);
};
