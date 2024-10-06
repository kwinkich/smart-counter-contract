import { toNano } from '@ton/core';
import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import '@ton/test-utils';
import { SmartCounter } from '../wrappers/SmartCounter';

describe('SmartCounter', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let smartCounter: SandboxContract<SmartCounter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        smartCounter = blockchain.openContract(await SmartCounter.fromInit(52n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await smartCounter.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: smartCounter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and smartCounter are ready to use
    });

    it('should be add counter', async () => {
        const counterBefore = await smartCounter.getCounter();

        let res = await smartCounter.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        const counterAfter = await smartCounter.getCounter();

        console.log(`BEfore - ${counterBefore}`);
        console.log(`BEfore - ${counterAfter}`);

        res.events.map((thx) => console.log(thx));
    });
});
