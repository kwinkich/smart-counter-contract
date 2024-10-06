import { NetworkProvider } from '@ton/blueprint';
import { toNano } from '@ton/core';
import { SmartCounter } from '../wrappers/SmartCounter';

export async function run(provider: NetworkProvider) {
    const smartCounter = provider.open(await SmartCounter.fromInit(52n));

    await smartCounter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        },
    );

    await provider.waitForDeploy(smartCounter.address);

    // run methods on `smartCounter`
}
