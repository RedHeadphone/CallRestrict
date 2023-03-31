const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { expect } = require("chai");

describe("CallRestrict Test", function () {

    async function fixture() {
        const CallRestrict = await ethers.getContractFactory("Test");
        const callRestrict = await CallRestrict.deploy();
        
        const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        return { callRestrict, owner, addr1, addr2, addrs };
    }
    
    it("Should be able to call the function only 2 times per address", async function () {
        const { callRestrict, owner, addr1, addr2, addrs } = await loadFixture(fixture);
        await callRestrict.connect(owner).count_check();
        await callRestrict.connect(owner).count_check();
        await expect(callRestrict.connect(owner).count_check()).to.be.revertedWith("CallRestrict: countRestrict");

        await callRestrict.connect(addr1).count_check();
        await callRestrict.connect(addr1).count_check();
        await expect(callRestrict.connect(addr1).count_check()).to.be.revertedWith("CallRestrict: countRestrict");
    });
    
    it("Shouldn't be able to call the function second time under 1 minutes", async function () {
        const { callRestrict, owner, addr1, addr2, addrs } = await loadFixture(fixture);
        await callRestrict.connect(owner).time_check();
        await expect(callRestrict.connect(owner).time_check()).to.be.revertedWith("CallRestrict: timeRestrict");
        await time.increase(60);
        await expect(callRestrict.connect(owner).time_check()).to.be.not.reverted;

        await callRestrict.connect(addr1).time_check();
        await expect(callRestrict.connect(addr1).time_check()).to.be.revertedWith("CallRestrict: timeRestrict");
        await time.increase(60);
        await expect(callRestrict.connect(addr1).time_check()).to.be.not.reverted;
    });

});