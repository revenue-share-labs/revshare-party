import { Signer } from "ethers";
import { ethers } from "hardhat";
import { RSHackathon } from "../typechain-types";

describe('Test Hackathon', () => {
    let owner: Signer, alice: Signer, bob: Signer, valve: RSHackathon;

    let ownerAddress: string, aliceAddress: string, bobAddress: string;

    before(async () => {
        [owner, alice, bob] = await ethers.getSigners();

        const valveFactory = await ethers.getContractFactory("RSHackathon", owner);
        valve = await valveFactory.deploy();
        ownerAddress = await owner.getAddress();
        aliceAddress = await alice.getAddress();
        bobAddress = await bob.getAddress();
    })

    it('asdasd', async () => {
        console.log(await valve.lastRS());

        await valve.connect(alice).createRS(100000000000);

        console.log(await valve.lastRS());
        console.log('alice address index 0 ', await valve.balanceOf(aliceAddress, 0))
        console.log('alice address index 1 ', await valve.balanceOf(aliceAddress, 1))
        console.log('bob address index 1 ', await valve.balanceOf(bobAddress, 1))
        console.log('bob address index 1 ', await valve.balanceOf(bobAddress, 1))

        try {
            await valve.connect(bob).safeTransferFrom(aliceAddress, bobAddress, 0, 10000, "0x");
        } catch (err) {
            console.log(err?.message);
        }
    })
})