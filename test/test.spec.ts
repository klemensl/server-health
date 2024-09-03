import { expect } from 'chai';
import * as offline from '../src/store/store.offline'


describe('test', () => {
  context('store.offline', () => {
    
    it('adds and removes', () => {
      offline.add('serverName');
      expect(offline.get('serverName')).to.not.be.undefined;

      offline.remove('serverName');
      expect(offline.get('serverName')).to.be.undefined;
    });

  });
});