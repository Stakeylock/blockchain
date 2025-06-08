// Function to generate a random integer within a specified range
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Mock Objects for Validators ---

// Proof of Work (PoW) Miner: Represents a single miner with 'power' (simulating hash rate/computational power).
const miner = {
    id: 'miner_alpha',
    power: getRandomValue(500, 5000) // Random power between 500 and 5000 units
};

// Proof of Stake (PoS) Stakers: An array of staker objects, each with 'stake' (simulating crypto collateral).
const stakers = [
    { id: 'staker_one', stake: getRandomValue(1000, 10000) },
    { id: 'staker_two', stake: getRandomValue(1000, 10000) },
    { id: 'staker_three', stake: getRandomValue(1000, 10000) },
    { id: 'staker_four', stake: getRandomValue(1000, 10000) },
    { id: 'staker_five', stake: getRandomValue(1000, 10000) }
];

// Delegated Proof of Stake (DPoS) Delegates and Voters:
// Delegates are candidates that token holders vote for.
const delegates = [
    { id: 'delegate_A', votes: 0 },
    { id: 'delegate_B', votes: 0 },
    { id: 'delegate_C', votes: 0 },
    { id: 'delegate_D', votes: 0 },
    { id: 'delegate_E', votes: 0 }
];

// Mock voters, each with 'votingPower' (simulating their token holdings).
const voters = [
    { id: 'voter_1', votingPower: getRandomValue(10, 100) },
    { id: 'voter_2', votingPower: getRandomValue(10, 100) },
    { id: 'voter_3', votingPower: getRandomValue(10, 100) },
    { id: 'voter_4', votingPower: getRandomValue(10, 100) },
    { id: 'voter_5', votingPower: getRandomValue(10, 100) },
    { id: 'voter_6', votingPower: getRandomValue(10, 100) },
    { id: 'voter_7', votingPower: getRandomValue(10, 100) }
];

// Distribute votes from voters to delegates randomly
// Each voter distributes their 'votingPower' among delegates.
voters.forEach(voter => {
    let remainingVotes = voter.votingPower;
    while (remainingVotes > 0) {
        // Choose a random delegate to cast votes for
        const randomDelegateIndex = Math.floor(Math.random() * delegates.length);
        // Cast a random amount of votes, up to the remaining voting power
        const votesToCast = getRandomValue(1, remainingVotes);
        delegates[randomDelegateIndex].votes += votesToCast;
        remainingVotes -= votesToCast;
    }
});

// --- Consensus Mechanism Simulations ---

console.log("--- Consensus Mechanism Simulation Results ---");

// Simulates the Proof of Work (PoW) consensus mechanism.
// In this simplified simulation, the single 'miner' object is assumed to be the one
// that successfully found the nonce or has the highest power.
function simulatePoW(miner) {
    console.log("\n--- Proof of Work (PoW) ---");
    console.log("Simulating PoW: Selecting validator based on computational 'power'.");
    console.log(`Miner ID: ${miner.id}, Power: ${miner.power}`);

    // Output the selected validator and the consensus method used.
    console.log(`Selected Validator for PoW: ${miner.id} (Power: ${miner.power})`);
    // Console log explanation of the selection logic.
    console.log("Explanation: In Proof of Work, validators (miners) compete by using their computational power to solve a cryptographic puzzle. The first miner to find the solution gets the right to add the next block to the blockchain and is rewarded. This mechanism prioritizes computational contribution and energy expenditure for security.");
}
simulatePoW(miner); // Run PoW simulation

// Simulates the Proof of Stake (PoS) consensus mechanism.
// Selects the staker with the highest 'stake' (amount of cryptocurrency held).
function simulatePoS(stakers) {
    console.log("\n--- Proof of Stake (PoS) ---");
    console.log("Simulating PoS: Selecting validator with highest 'stake'.");

    let highestStake = 0;
    let selectedStaker = null;

    stakers.forEach(staker => {
        console.log(`Staker ID: ${staker.id}, Stake: ${staker.stake}`);
        // Identify the staker with the maximum stake
        if (staker.stake > highestStake) {
            highestStake = staker.stake;
            selectedStaker = staker;
        }
    });

    if (selectedStaker) {
        // Output the selected validator and the consensus method used.
        console.log(`Selected Validator for PoS: ${selectedStaker.id} (Stake: ${selectedStaker.stake})`);
    } else {
        console.log("No stakers found or stake values are zero.");
    }
    // Console log explanation of the selection logic.
    console.log("Explanation: In Proof of Stake, validators are chosen to create new blocks based on the amount of cryptocurrency they have 'staked' (locked up) as collateral. The more stake a validator commits, the higher their chance of being selected to validate transactions and earn rewards. This mechanism aims to be more energy-efficient than PoW.");
}
simulatePoS(stakers); // Run PoS simulation

// Simulates the Delegated Proof of Stake (DPoS) consensus mechanism.
// Randomly chooses a delegate based on their accumulated votes. Delegates with more votes
// have a proportionally higher chance of being selected.
function simulateDPoS(delegates) {
    console.log("\n--- Delegated Proof of Stake (DPoS) ---");
    console.log("Simulating DPoS: Randomly choosing a delegate based on their accumulated votes.");

    let totalVotes = 0;
    delegates.forEach(delegate => {
        totalVotes += delegate.votes;
        console.log(`Delegate ID: ${delegate.id}, Votes: ${delegate.votes}`);
    });

    if (totalVotes === 0) {
        console.log("No votes cast for delegates. Cannot select a delegate.");
        console.log("Explanation: In DPoS, token holders vote for delegates who then validate transactions and maintain the network. If no votes are cast, no delegates can be selected.");
        return;
    }

    // Create a weighted list where each delegate appears 'votes' times.
    // This allows for a simple random selection from a list where the probability
    // of a delegate being picked is proportional to their votes.
    const weightedDelegates = [];
    delegates.forEach(delegate => {
        for (let i = 0; i < delegate.votes; i++) {
            weightedDelegates.push(delegate);
        }
    });

    // Randomly select a delegate from the weighted list
    const randomIndex = Math.floor(Math.random() * weightedDelegates.length);
    const selectedDelegate = weightedDelegates[randomIndex];

    if (selectedDelegate) {
        // Output the selected validator and the consensus method used.
        console.log(`Selected Delegate for DPoS: ${selectedDelegate.id} (Votes: ${selectedDelegate.votes})`);
    } else {
        console.log("Error: Could not select a delegate despite total votes. This should not happen if totalVotes > 0.");
    }
    // Console log explanation of the selection logic.
    console.log("Explanation: In DPoS, token holders 'delegate' their voting power to elect a set of delegates (or witnesses/block producers). These elected delegates are then responsible for validating transactions and producing blocks. The chance of a delegate being selected to create a block is proportional to the total votes they received. This mechanism aims for faster transaction times and greater scalability compared to PoW and PoS, as there are fewer validators.");
}
simulateDPoS(delegates); // Run DPoS simulation

console.log("\n--- End of Simulation ---");
