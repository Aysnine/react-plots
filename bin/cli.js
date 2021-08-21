#!/usr/bin/env node
'use strict';

const { program } = require('commander');
const esbuild = require('esbuild')
const path = require('path')

program
  .command('serve')
  .option('-p, --port <port>')
  .option('-h, --host <host>')
  .action(async (options) => {
    const port = Number(options.port ?? 3000)
    const host = options.host ?? 'localhost'

    const server = await esbuild.serve({
      servedir: 'public',
      port,
      host,
    }, {
      entryPoints: ['src/index.tsx'],
      outdir: 'public',
      bundle: true,
      sourcemap: true,
      inject: [path.join(__dirname, './react-shim.js')],
    })

    console.log(`Server at http://${server.host}:${server.port}`)
  })

program.parse()
