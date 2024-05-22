import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4, TonClient, fromNano } from "@ton/ton";

async function main() {
  // open wallet v4 (notice the correct wallet version here)
  const mnemonic = "grunt donate away stomach knee present like strong occur foster glove fall balcony nasty possible orchard charge purse system sleep draft arctic stem loyal"; // your 24 secret words (replace ... with the rest of the words)
  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  // query balance from chain
  const balance = await client.getBalance(wallet.address);
  console.log("balance:", fromNano(balance));
  console.log("address:", wallet.address);
  
  // query seqno from chain
  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  console.log("seqno:", seqno);
}

main();