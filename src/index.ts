import {Command, flags} from '@oclif/command'
import {getPackageFiles} from './github'
import {parseDependency} from './dependency-parser'

class FetchDependencies extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(FetchDependencies)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from ./src/index.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }

    // const packageFiles = await getPackageFiles('facebook/react')
    // const packageFiles = await getPackageFiles('JamesNK/Newtonsoft.Json', '2039a29')
    const packageFiles = await getPackageFiles('JamesNK/Newtonsoft.Json', 'master')
    const dependencies = Object.keys(packageFiles).map(path => parseDependency(path, packageFiles[path]))
    console.log(dependencies)
  }
}

export = FetchDependencies
