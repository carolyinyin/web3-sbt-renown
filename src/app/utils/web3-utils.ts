import { Observable, throwError, of } from 'rxjs';
import * as web3 from 'web3-utils';
import { EtherUnit } from '../models';
// import * as bn from 'bn.js';
// export const BN = bn;

export class Web3Utils {

    public static isAddress(address: string): boolean {
        return web3.isAddress(address);
    }

}
