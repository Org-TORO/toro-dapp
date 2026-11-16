// ───────── Deployed TORO program ─────────
// Single source of truth. The program itself lives in the toro-contracts repo;
// this file pins which deployment this app talks about.
//
// When the program is redeployed to a new address, change PROGRAM_ID here and
// re-run `npm run idl:sync` so src/idl/toro.json matches.

export const PROGRAM_ID = "2cbYretd93guxpURxqhq1UedBtwSHzT2NX6MsrBc4FWc";
export const CLUSTER = "devnet";

export const solscanAccountUrl = (address: string = PROGRAM_ID) =>
  `https://solscan.io/account/${address}?cluster=${CLUSTER}`;

export const solscanTxUrl = (txHash: string) =>
  `https://solscan.io/tx/${txHash}?cluster=${CLUSTER}`;
