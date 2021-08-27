import {expect} from '@oclif/test'
import {parseDependency} from '../src/dependency-parser'

describe('dependency parser', function () {
  it('parse npm dependency', async function () {
    const content = `
    {
      "dependencies": {
        "tslib": "^1"
      },
      "devDependencies": {
        "typescript": "^3.3"
      }
    }`
    const deps = parseDependency('package.json', content)
    expect(deps).to.have.keys(['tslib', 'typescript'])
    expect(deps).to.have.property('tslib', '^1')
    expect(deps).to.have.property('typescript', '^3.3')
  })

  it('parse npm dependency with only dependencies', async function () {
    const content = `
    {
      "dependencies": {
        "tslib": "^1"
      }
    }`
    const deps = parseDependency('package.json', content)
    expect(deps).to.have.keys(['tslib'])
    expect(deps).to.have.property('tslib', '^1')
  })

  it('parse npm dependency with only devDependencies', async function () {
    const content = `
    {
      "devDependencies": {
        "typescript": "^3.3"
      }
    }`
    const deps = parseDependency('package.json', content)
    expect(deps).to.have.keys(['typescript'])
    expect(deps).to.have.property('typescript', '^3.3')
  })

  it('parse nuget packages.config dependency', async function () {
    const content = `
    ï»¿<?xml version="1.0" encoding="utf-8"?>
    <packages>
      <package id="FSharp.Core" version="4.0.0" targetFramework="net45" />
      <package id="NUnit" version="2.6.2" targetFramework="net45" />
    </packages>
    `
    const deps = parseDependency('packages.config', content)
    expect(deps).to.have.keys(['FSharp.Core', 'NUnit'])
    expect(deps).to.have.property('NUnit', '2.6.2')
    expect(deps).to.have.property('FSharp.Core', '4.0.0')
  })

  it('parse nuget packages.config dependency with nothing', async function () {
    const content = `
    ï»¿<?xml version="1.0" encoding="utf-8"?>
    <packages>
    </packages>
    `
    const deps = parseDependency('packages.config', content)
    expect(deps).to.be.empty
  })

  it('parse .csproj dependency', async function () {
    const content = `
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
    <NoWarn>1701;1702;CS1573;CS1591;</NoWarn>
    <IsPackable>true</IsPackable>
    <ProjectGuid>{D25D9224-031F-4E53-B898-E962735C862A}</ProjectGuid>
  </PropertyGroup>

  <PropertyGroup>
    <PackageId>Service</PackageId>
    <PackageVersion>1.0.0.0</PackageVersion>
    <Title>Service</Title>
    <PackageRequireLicenseAcceptance>false</PackageRequireLicenseAcceptance>
    <Copyright>Copyright 2018</Copyright>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AutoMapper" Version="9.0.0" />
    <PackageReference Include="NLog" Version="4.6.8" />
  </ItemGroup>
</Project>
    `
    const deps = parseDependency('service.csproj', content)
    expect(deps).to.have.keys(['AutoMapper', 'NLog'])
    expect(deps).to.have.property('AutoMapper', '9.0.0')
    expect(deps).to.have.property('NLog', '4.6.8')
  })

  it('parse .csproj dependency with nothing', async function () {
    const content = `
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
    <NoWarn>1701;1702;CS1573;CS1591;</NoWarn>
    <IsPackable>true</IsPackable>
    <ProjectGuid>{D25D9224-031F-4E53-B898-E962735C862A}</ProjectGuid>
  </PropertyGroup>

  <PropertyGroup>
    <PackageId>Service</PackageId>
    <PackageVersion>1.0.0.0</PackageVersion>
    <Title>Service</Title>
    <PackageRequireLicenseAcceptance>false</PackageRequireLicenseAcceptance>
    <Copyright>Copyright 2018</Copyright>
  </PropertyGroup>

</Project>
    `
    const deps = parseDependency('service.csproj', content)
    expect(deps).to.be.empty
  })
})
