import { execSync } from 'node:child_process'
import process from 'node:process'

try {
  // Check whether the template remote already exists.
  const remotes = execSync('git remote', { encoding: 'utf8' })
    .split(/\r?\n/)
    .filter(Boolean)
  if (!remotes.includes('template'))
    throw new Error('Missing template remote')
}
catch {
  // Add the template remote when it is missing.
  execSync(
    'git remote add template https://github.com/moeyua/astro-theme-typography.git',
    { stdio: 'inherit' },
  )
}

try {
  // Fetch the latest template changes.
  execSync('git fetch template', { stdio: 'inherit' })

  // Merge the latest template changes into the current branch.
  execSync('git merge template/main --allow-unrelated-histories', {
    stdio: 'inherit',
  })
}
catch (error) {
  console.error('Failed to update the theme:', error)
  process.exit(1)
}
