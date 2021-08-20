import {expect} from '@oclif/test'
import {nugetPackageLatestVersion} from '../src/nuget-dependency'

describe('nuget-dependency', () => {
  it('get Newtonsoft.Json latest version', async () => {
    expect(await nugetPackageLatestVersion('Newtonsoft.Json')).to.equal('13.0.1')
  })

  it('get not exist package latest version', async () => {
    expect(await nugetPackageLatestVersion('Newtonsoft.Json.notexist')).to.equal(null)
  })
})
