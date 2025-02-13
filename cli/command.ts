import { program } from 'commander';
import {
    Connection,
    PublicKey,
} from '@solana/web3.js';
import { migrate, global, createBondingCurve, setClusterConfig, addWl, swap } from './script';

program.version('0.0.1');

programCommand('migrate')
    .requiredOption('-m, --mint <string>', 'Token mint address')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc, mint } = cmd.opts();

        await setClusterConfig(env, keypair, rpc)
        const migrateTxId = await migrate(mint);
        console.log("Transaction ID: ", migrateTxId);
    });

programCommand('global')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        await setClusterConfig(env, keypair, rpc)

        const txId = await global();
        console.log("Transaction ID: ", txId);
    });

programCommand('createCurve')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        await setClusterConfig(env, keypair, rpc)
        await createBondingCurve();
    });

programCommand('swap')
    .requiredOption('-m, --mint <string>', 'Token mint address')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc, mint } = cmd.opts();

        await setClusterConfig(env, keypair, rpc)
        await swap(mint);
    });

programCommand('addWl')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        await setClusterConfig(env, keypair, rpc)

        await addWl();
    });

function programCommand(name: string) {
    return program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
        .option('-r, --rpc <string>', 'Solana cluster RPC name', 'rpc')
        .option('-k, --keypair <string>', 'Solana wallet Keypair Path', '/home/king/contract_test/pump_science/pump-science-contract/pump_key.json')
}

program.parse(process.argv);