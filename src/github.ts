import fetch from 'node-fetch'

type Tree = {
  path: string,
  url: string
}

type FileResponse = {
  content: string
}

function fetchGithubRestApi(url: string) {
  const token = process.env['GITHUB_TOKEN']

  if (!token) {
    throw 'token is missing'
  }

  return fetch(url, {
    headers: {
      "Authorization": "Basic " + btoa("token:" + token),
      "User-Agent": "curl/7.72.0"
    }
  })
}

export async function getPackageFiles(repo: string, revision: string = 'main') {
  const response = await fetchGithubRestApi(`https://api.github.com/repos/${repo}/git/trees/${revision}?recursive=true`)
  const trees: Array<Tree> = (await response.json()).tree

  const packageFileContents: { [index: string]: string } = {}
  const npmPackageFiles = trees.filter(t => /package\.json/.test(t.path))

  for (let file of npmPackageFiles) {
    const response = await fetchGithubRestApi(file.url)
    const fileResponse: FileResponse = await response.json()
    const fileContent = atob(fileResponse.content.replace(/\n/g, ''))
    packageFileContents[file.path] = fileContent
  }

  const nugetPackageFiles = trees.filter(t => /packages\.config/.test(t.path))

  for (let file of nugetPackageFiles) {
    const response = await fetchGithubRestApi(file.url)
    const fileResponse: FileResponse = await response.json()
    const fileContent = atob(fileResponse.content.replace(/\n/g, ''))
    packageFileContents[file.path] = fileContent
  }

  const csprojPackageFiles = trees.filter(t => /\.csproj/.test(t.path))

  for (let file of csprojPackageFiles) {
    const response = await fetchGithubRestApi(file.url)
    const fileResponse: FileResponse = await response.json()
    const fileContent = atob(fileResponse.content.replace(/\n/g, ''))
    packageFileContents[file.path] = fileContent
  }

  return packageFileContents
}
