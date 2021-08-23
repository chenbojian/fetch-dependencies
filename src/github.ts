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
      "Authorization": "Basic" + btoa("token:" + token)
    }
  })
}

export async function getPackageFiles(repo: string) {
  const response = await fetchGithubRestApi(`https://api.github.com/repos/${repo}/git/trees/main?recurse=true`)
  const trees: Array<Tree> = (await response.json()).tree
  const npmPackageFiles = trees.filter(t => /package\.json/.test(t.path))
  const npmPackageFileContents: Array<string> = [];

  for(let file of npmPackageFiles) {
    const response = await fetchGithubRestApi(file.url)
    const fileResponse: FileResponse = await response.json()
    const fileContent = fileResponse.content
    npmPackageFileContents.push(fileContent)
  }
  return npmPackageFileContents
}
