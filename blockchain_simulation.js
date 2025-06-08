// crypto-js library is used for SHA256 hashing.
const SHA256 = require('crypto-js/sha256');

// Defines a single block in the blockchain.
class Block {
    // Constructor for a Block.
    // 'index': position of the block in the chain.
    // 'timestamp': when the block was created.
    // 'data': transactions or any information stored in the block.
    // 'previousHash': hash of the block that came before it.
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0; // A counter used in mining to find a valid hash.
        this.hash = this.calculateHash(); // Calculate the initial hash of the block.
    }

    // Calculates the SHA256 hash of the block's content.
    // The hash is based on all properties of the block, including the nonce,
    // ensuring that any change in data or nonce will result in a different hash.
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    // Simulates the mining process for the block.
    // It repeatedly increments the nonce until the block's hash starts with
    // the required number of leading zeros (determined by 'difficulty').
    mineBlock(difficulty) {
        const startTime = Date.now(); // Start timer
        let attempts = 0; // Initialize nonce attempts counter
        // Continue looping until the hash meets the difficulty target.
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++; // Increment the nonce.
            attempts++; // Increment attempts
            this.hash = this.calculateHash(); // Recalculate the hash with the new nonce.
        }
        const endTime = Date.now(); // End timer
        const timeTaken = (endTime - startTime) / 1000; // Time in seconds
        // Log the successful mining of the block and its final hash.
        console.log(`Block ${this.index} mined: ${this.hash}`);
        console.log(`Nonce attempts: ${attempts}`);
        console.log(`Time taken to mine: ${timeTaken} seconds`);
    }
}

// Defines the Blockchain itself.
class Blockchain {
    // Constructor for the Blockchain.
    constructor() {
        // 'chain': an array to hold all the blocks.
        this.chain = [this.createGenesisBlock()]; // Start with the genesis block.
        // 'difficulty': the mining difficulty for new blocks (number of leading zeros required in hash).
        this.difficulty = 2;
    }

    // Creates the very first block in the blockchain, known as the genesis block.
    // It has no previous hash.
    createGenesisBlock() {
        // A block with index 0, current timestamp, "Genesis block" data, and a "0" previous hash.
        return new Block(0, new Date().toLocaleString(), "Genesis block", "0");
    }

    // Returns the latest block in the blockchain.
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Adds a new block to the blockchain.
    // It links the new block to the previous one and then mines it.
    addBlock(newBlock) {
        // Set the previousHash of the new block to the hash of the current latest block.
        newBlock.previousHash = this.getLatestBlock().hash;
        console.log(`Mining block ${newBlock.index}...`); // Indicate that mining is starting.
        newBlock.mineBlock(this.difficulty); // Mine the new block to meet the difficulty.
        this.chain.push(newBlock); // Add the successfully mined block to the chain.
    }

    // Checks if the entire blockchain is valid.
    // It verifies each block's integrity and its link to the previous block.
    isChainValid() {
        // Iterate through the chain, starting from the second block (index 1),
        // as the genesis block (index 0) has no preceding block to check.
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if the current block's stored hash matches its re-calculated hash.
            // If they don't match, it means the block's data has been tampered with.
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log(`Block ${currentBlock.index} hash is invalid!`);
                return false;
            }

            // Check if the current block's 'previousHash' correctly points to the actual hash of the previous block.
            // If not, the link in the chain is broken.
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(`Block ${currentBlock.index} does not point to the correct previous hash!`);
                return false;
            }
        }
        // If all checks pass, the blockchain is considered valid.
        return true;
    }
}

// --- Blockchain Simulation Execution ---

console.log("--- Blockchain Simulation ---");
// Create a new instance of our blockchain.
const myBlockchain = new Blockchain();

// Add the first block after the genesis block.
// This block contains a simple transaction.
myBlockchain.addBlock(new Block(1, new Date().toLocaleString(), { amount: 10, from: "Alice", to: "Bob" }));

// Add the second block.
myBlockchain.addBlock(new Block(2, new Date().toLocaleString(), { amount: 25, from: "Bob", to: "Charlie" }));

// Add the third block.
myBlockchain.addBlock(new Block(3, new Date().toLocaleString(), { amount: 5, from: "Charlie", to: "Alice" }));

console.log("\nBlockchain complete:");
// Print the entire blockchain in a human-readable JSON format.
console.log(JSON.stringify(myBlockchain.chain, null, 2));

// Check and log whether the entire blockchain is currently valid.
console.log("\nIs blockchain valid?", myBlockchain.isChainValid());

/*
// --- Tampering Example (Uncomment to see invalidation) ---
// This section demonstrates how tampering with a block invalidates the chain.
console.log("\nAttempting to tamper with Block 1...");
// Modify the data of the second block (Block with index 1).
myBlockchain.chain[1].data = { amount: 1000, from: "Alice", to: "Bob" };
// Recalculate the hash of the tampered block to reflect the new data.
// Note: In a real blockchain, this block would need to be re-mined, and subsequent
// blocks would also need to be re-mined to maintain valid hashes and previousHash links.
myBlockchain.chain[1].hash = myBlockchain.chain[1].calculateHash();
// After tampering, check the chain's validity again. It should now be false.
console.log("Is blockchain valid after tampering?", myBlockchain.isChainValid());
*/
