import * as pacote from 'pacote'

export async function npmPackageLatestVersion(pkg: string) {
  try {
    const r = await pacote.packument(pkg)
    return r['dist-tags'].latest
  } catch {
    return null
  }
}
