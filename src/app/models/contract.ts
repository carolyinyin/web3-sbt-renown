declare let require: any;

export const  MembershipTokenContract = require('../../assets/data/MBT.json')
export const  RatingTokenContract = require('../../assets/data/RT.json')

export interface ResumeInitialOptions {
    name: string;
    address: string;
    age: number;
    gender: number;
}

export interface EventLogOptions {
    filter?: Object;
    fromBlock?: number;
    toBlock?: number;
    topics?: Array<any>;
}
