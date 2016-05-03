import {expect} from 'chai';
import Permissions from '../lib';


describe('Permissions', () => {

  it('allows unauthenticated access by default', () => {
    expect(new Permissions().check({}, null)).to.be.true;
  });

  it('allows configuration of defaultLevel', () => {
    expect(new Permissions({defaultLevel: 1}).check({}, null)).to.be.false;
  });

  it('does not allow unauthenticated access if p > 0', () => {
    expect(new Permissions().check({p: 1}, null)).to.be.false;
  });

  it('allows authenticated access if p = 0', () => {
    expect(new Permissions().check({p: 1}, 'user_id')).to.be.true;
  });

  it('does not allow authenticated access if p > 1', () => {
    expect(new Permissions().check({p: 2}, 'user_id')).to.be.false;
  });

  it('allows configuration of authenticatedLevel', () => {
    expect(
      new Permissions({authenticatedLevel: 5})
        .check({p: 2}, 'user_id')
    ).to.be.true;
  });

  it('allows admin access if p <= 10', () => {
    expect(
      new Permissions({admins: ['user_id']})
        .check({p: 10}, 'user_id')
    ).to.be.true;
  });

  it('does not allow admin access if p > 10', () => {
    expect(
      new Permissions({admins: ['user_id']})
        .check({p: 11}, 'user_id')
    ).to.be.false;
  });

  it('allows configuration of adminLevel', () => {
    expect(
      new Permissions({admins: ['user_id'], adminLevel: 100})
        .check({p: 11}, 'user_id')
    ).to.be.true;
  });

  it('allows whitelist of user ids', () => {
    expect(new Permissions().check({p: 2, a: ['user_id']}, 'user_id')).to.be.true;
  });

  it('allows blacklist of user ids', () => {
    expect(new Permissions().check({p: 0, b: ['user_id']}, 'user_id')).to.be.false;
  });

  it('check method can be passed around', () => {
    const {check} = new Permissions({admins: ['user_id']});
    expect(check({p: 10}, 'user_id')).to.be.true;
  });

});
