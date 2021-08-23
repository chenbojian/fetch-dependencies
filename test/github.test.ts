import {expect} from '@oclif/test'

import {getPackageFiles} from '../src/github'

describe('github', () => {
  it('get packages.json file from react repo', async () => {
    const files = await getPackageFiles('facebook/react')
    expect(JSON.stringify(files)).to.equal('');
  })
})
