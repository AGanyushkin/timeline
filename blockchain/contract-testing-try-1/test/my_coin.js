const MyCoin = artifacts.require("MyCoin");

contract('MyCoin', function([owner]) {

  let inst;
  beforeEach('setup contract for each test', async () => {
    inst = await MyCoin.new('xxx');
  })

  it("should assert getOwner", async () => {
    let val = await inst.getOwner();
    assert.equal(val, owner);
  });

  it("should assert owner field", async () => {
    let val = await inst.owner();
    assert.equal(val, owner);
  });

  it("should assert getBls", async () => {
    let val = await inst.getBls();
    assert.isTrue(val.toNumber() < 100097573167600000000000);
  });

  it("should assert getName", async () => {
    let val = await inst.getName();
    assert.equal(val, 'xxx');
  });

  it("should assert setName", async () => {
    await inst.setName('test 1');
    let val = await inst.getName();
    assert.equal(val, 'test 1_x'); 
  });

});
