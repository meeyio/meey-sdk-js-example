import { MeeyClient, GrpcProvider } from '@meey-sdk-js/client';
const meey = new MeeyClient({}, new GrpcProvider({url: '192.168.6.252:7845'}));

async function update() {
    const blockchain = await meey.blockchain();
    console.log(blockchain.bestHeight, blockchain.bestBlockHash);
    const block = await meey.getBlock(blockchain.bestHeight);
    console.log(block);
    if (block.body.txsList.length) {
        console.log(block.body.txsList[0]);
        const txInfo = await meey.getTransaction(block.body.txsList[0].hash);
        console.log(txInfo)
        const account = await meey.getState(txInfo.tx.from);
        console.log(account);
    }
    setTimeout(update, 1000);
}

update();
