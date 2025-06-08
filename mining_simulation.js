// crypto-js library is used for SHA256 hashing.
const SHA256 = require('crypto-js/sha256');

// Function to calculate the SHA256 hash of a given input.
function calculateHash(input) {
    return SHA256(input).toString();
}

// Function to simulate the mining process.
// It finds a 'nonce' (a random number) such that when combined with the block data,
// the resulting hash meets a specified 'difficulty' (number of leading zeros).
function mineBlock(blockData, difficulty) {
    let nonce = 0; // Initialize nonce to 0
    let hash = ''; // Initialize hash
    // Create the target prefix string (e.g., "000" for difficulty 3)
    const targetPrefix = Array(difficulty + 1).join("0");

    console.log(`Mining for a hash starting with '${targetPrefix}' (Difficulty: ${difficulty})...`);

    // Loop indefinitely until the hash meets the difficulty requirement
    while (true) {
        // Concatenate block data with the current nonce to form the input for hashing
        const input = blockData + nonce;
        hash = calculateHash(input); // Calculate the hash

        // Check if the calculated hash starts with the required number of zeros
        if (hash.substring(0, difficulty) === targetPrefix) {
            console.log(`Found nonce: ${nonce}`); // Log the nonce that solved the puzzle
            console.log(`Resulting hash: ${hash}`); // Log the successful hash
            break; // Exit the loop as the block is 'mined'
        }
        nonce++; // Increment nonce to try a new hash in the next iteration
    }

    // Return the found nonce and its corresponding hash
    return { nonce, hash };
}

// --- Mining Simulation Execution ---

console.log("--- Mining Simulation ---");

// Define the data for the block to be mined.
const data = "My first block data!";
// Set the difficulty level: the number of leading zeros required in the hash.
const difficultyLevel = 3;

// Start the mining process and store the result.
const result = mineBlock(data, difficultyLevel);

// Display the results of the mining simulation.
console.log(`\nMining complete for data: "${data}"`);
console.log(`Nonce found: ${result.nonce}`);
console.log(`Final Hash: ${result.hash}`);
// Verify if the final hash indeed starts with the expected number of zeros.
console.log(`Verification: Does hash start with ${difficultyLevel} zeros? ${result.hash.startsWith(Array(difficultyLevel + 1).join("0"))}`);
