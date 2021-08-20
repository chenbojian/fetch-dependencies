import fetch from 'node-fetch'

export async function nugetPackageLatestVersion(pkg: string) {
  const response = await fetch(`https://api.nuget.org/v3-flatcontainer/${pkg.toLowerCase()}/index.json`, {
    redirect: 'follow',
  })

  if (response.status === 200) {
    const versions: Array<string> = (await response.json()).versions
    versions.reverse()
    return versions[0]
  }
  return null
}
