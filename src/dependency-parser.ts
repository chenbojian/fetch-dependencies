import {DomUtils, parseDocument} from 'htmlparser2'

export function parseDependency(path: string, content: string): { [id: string]: string } | undefined {
  if (/package\.json/.test(path)) {
    const obj = JSON.parse(content)
    return {
      ...obj.dependencies,
      ...obj.devDependencies,
    }
  }

  if (/packages.config/.test(path)) {
    const dom = parseDocument(content)
    const elements = DomUtils.findAll(e => e.tagName === 'package', dom.childNodes)

    const dependencies = elements.map(e => ({[e.attribs.id]: e.attribs.version}))
    return dependencies.reduce((prev, cur) => ({...prev, ...cur}))
  }

  if (/\.csproj/.test(path)) {
    const dom = parseDocument(content)
    const elements = DomUtils.findAll(e => e.tagName === 'packagereference', dom.childNodes)

    const dependencies = elements.map(e => ({[e.attribs.include]: e.attribs.version}))
    return dependencies.reduce((prev, cur) => ({...prev, ...cur}))
  }

  throw new Error('invalid arguments')
}
