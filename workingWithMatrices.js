const rows = 5;
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

const randomTable = generateRandomTable(rows, columns, min, max);

console.table(randomTable);

// 1.

const k = 2;

function modifyMatrix(matrix, k) {
    const column = matrix[0].length;

    const updatedMatrix = matrix.map(row => {
        const prefix = new Array(k).fill(0);
        return [...prefix, ...row];
    });

    const newColumns = column + k;
    for (let i = 0; i < k; i++) {
        const newRows = new Array(newColumns).fill(0);
        updatedMatrix.push(newRows);
    };

    return updatedMatrix;
};

const shiftedMatrix = modifyMatrix(randomTable, k);

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

const result = sumAfterThird(randomTable);
console.log("2. Sum of elements after the third element in each row:", result);

// 3.

function subtractionByAverage(matrix) {
    return matrix.map(row => {
        const avg = row.reduce((a, b) => a + b, 0) / row.length;
        
        return row.map(b => parseFloat((b - avg).toFixed(1)));
    });
};

const minusMatrix = subtractionByAverage(randomTable);

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

const cleanedMatrix = removeMaxElements(randomTable);

console.log("The matrix after removing rows and columns with maximum values:");
console.table(cleanedMatrix);

// 5.

function swapExtremeColumns(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const rewrite = matrix.flat();
    const min = Math.min(...rewrite);
    const max = Math.max(...rewrite);

    // 2. Знаходимо перший стовпець, де зустрічається max і min
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
        
        return null;
    };

    for (let i = 0; i < rows; i++) {
        [matrix[i][minColumn], matrix[i][maxColumn]] = [matrix[i][maxColumn], matrix[i][minColumn]];
    };

    return matrix;
};

const swappedMatrix = swapExtremeColumns(randomTable);

if (swappedMatrix !== null) {
    console.log("Matrix after swapping columns with minimum and maximum:");
    console.table(swappedMatrix);
};
