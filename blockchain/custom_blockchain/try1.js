const SHA256 = require("crypto-js/sha256");
const uuid = require("uuid/v4");

const ACCOUNT = 'ACCOUNT';
const TRANSACTION = 'TRANSACTION';
const SYS_ACC = '0000000000000000000000000000000000000000000000000000000000000000';

// genesis block: new Block()
function Block(data = null) {
    this.data = data;
    this.hash = '';
    this.prevHash = '0000000000000000000000000000000000000000000000000000000000000000';
    this.nonce = 0;
}

const chain = [findAndInjectBlockHash(new Block())];

function findAndInjectBlockHash(block) {
    let hash = '';

    while(hash.indexOf('0') !== 0) {
        hash = SHA256(JSON.stringify(block)).toString();
        block.nonce = block.nonce + 1;
    }
    block.hash = hash;

    return block;
}

function addToChain(block) {
    block.prevHash = chain[chain.length - 1].hash;

    findAndInjectBlockHash(block);
    chain.push(block);
}

function nameToID(name) {
    return SHA256(name).toString()
}

function AccountTransaction(name = null) {
    this.type = ACCOUNT;
    this.id = name ? nameToID(name) :  SHA256(uuid()).toString();
}

function TransferTransaction(from, to, amount) {
    const fromBallance = getBallance(from);
    if (fromBallance < amount && from !== SYS_ACC) 
        throw new Error(`incorrect ballance, need ${amount}, have: ${fromBallance}`);

    this.type = TRANSACTION;
    this.from = from;
    this.to = to;
    this.amount = amount;
}

addToChain(new Block([
    new AccountTransaction('X'),
    new AccountTransaction('andrey'),
    new TransferTransaction(
        SYS_ACC,
        nameToID('andrey'),
        10
    )
]));
addToChain(new Block([
    new TransferTransaction(
        nameToID('andrey'),
        '4b68ab3847feda7d6c62c1fbcbeebfa35eab7351ed5e78f4ddadea5df64b8015',
        7.9
    )
]));

console.log(
    JSON.stringify(chain, null, 4)
);

function walkThroughtTransactions(chain, handler) {
    for (let block of chain) {
        if (block.data) {
            for (let trs of block.data) {
                handler(trs);
            }
        }
    }
}

function getAccounts(chain) {
    const accs = [];

    walkThroughtTransactions(chain, trs => {
        if (trs.type === ACCOUNT) {
            accs.push(trs.id);
        }
    })
    return accs;
}

function getBallance(acc) {
    let ballance = 0;
    
    walkThroughtTransactions(chain, trs => {
        if (trs.type === TRANSACTION) {
            if (trs.to === acc) {
                ballance += trs.amount;
            }
            if (trs.from === acc) {
                ballance -= trs.amount;
            }
        }
    })
    return ballance;
}

console.log(
    getAccounts(chain)
)
console.log(
    getAccounts(chain).map(acc => `${acc} : ${getBallance(acc)}`)
)
