import {expect} from '@oclif/test'
import {npmPackageLatestVersion} from '../src/npm-dependency'

describe('npm-dependency', () => {
  it('get pacote latest version', async () => {
    expect(await npmPackageLatestVersion('pacote')).to.equal('11.3.5')
  })

  it('get not exist package\'s latest version', async () => {
    expect(await npmPackageLatestVersion('not-exist-package')).to.equal(null)
  })
})
