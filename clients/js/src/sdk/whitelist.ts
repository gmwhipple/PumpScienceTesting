import { Pda, PublicKey, Umi } from "@metaplex-foundation/umi";
import { findWLPda } from "../utils";
import {
    addWl,
    AddWlInstructionArgs,
    removeWl,
    RemoveWlInstructionDataArgs,
    safeFetchWhitelist
} from "../generated";
import { PumpScienceSDK } from "./pump-science";

export class WlSDK {
    PumpScience: PumpScienceSDK;
    umi: Umi;
    whitelistPda: Pda;
    creator: PublicKey;
    fetchWlData() {
        return safeFetchWhitelist(this.umi, this.whitelistPda[0]);
    }

    addWl() {
        const params: AddWlInstructionArgs = {
            newCreator: this.creator
        }

        return addWl(this.umi, {
            global: this.PumpScience.globalPda[0],
            admin: this.umi.identity,
            ...params,
            ...this.PumpScience.evtAuthAccs,
            whitelist: this.whitelistPda[0]
        });
    }

    removeWl() {
        const params: RemoveWlInstructionDataArgs = {
            remover: this.creator
        }

        return removeWl(this.umi, {
            global: this.PumpScience.globalPda[0],
            admin: this.umi.identity,
            ...params,
            ...this.PumpScience.evtAuthAccs,
            whitelist: this.whitelistPda[0]
        });
    }

    constructor(sdk: PumpScienceSDK, creator: PublicKey) {
        this.PumpScience = sdk;
        this.umi = sdk.umi;
        this.whitelistPda = findWLPda(this.umi, creator);
        this.creator = creator
    }
}