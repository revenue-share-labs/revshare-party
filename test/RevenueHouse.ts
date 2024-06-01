import hre from "hardhat";

describe('Test Hackathon', () => {
    async function deployRevenueHouse() {
        // Contracts are deployed using the first signer/account by default
        const [owner, alice, bob] = await hre.ethers.getSigners();

        const RevenueHouse = await hre.ethers.getContractFactory("RevenueHouse");
        const revenueHouse = await RevenueHouse.deploy();

        return { owner, alice, bob, revenueHouse };
    }

    it('asdasd', async () => {
        const { owner, alice, bob, revenueHouse } = await deployRevenueHouse()
        console.log('last party id ', await revenueHouse.lastPartyId());

        await revenueHouse.connect(alice).createRS();

        console.log('last party id ', await revenueHouse.lastPartyId());

        console.log('total party tasks', await revenueHouse.total_party_tasks(0));

        let tx = await revenueHouse.connect(alice).createTask(0, { temp: 1 });

        console.log('total party tasks ', await revenueHouse.total_party_tasks(0));
        const lastPartyId = await revenueHouse.lastPartyId()
        const task_id = await revenueHouse.getTaskId(lastPartyId)

        console.log(task_id)
        console.log(await revenueHouse.party_tasks(task_id));

        console.log('balance before ', await revenueHouse.balanceOf(alice.address, 0));
        const secret = await revenueHouse.generatePrivateKey(alice.address, task_id)
        await revenueHouse.connect(alice).claim(0, task_id, secret);
        console.log('balance after ', await revenueHouse.balanceOf(alice.address, 0));

        console.log('balance before ', await revenueHouse.balanceOf(alice.address, 0));
        await revenueHouse.connect(alice).burn(0, 10);
        console.log('balance after ', await revenueHouse.balanceOf(alice.address, 0));

        await revenueHouse.connect(alice).burnBatch([0, 1], [10, 10]);
    })
})