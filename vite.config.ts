import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryName = 'ZJU_Zoology_Tests'
const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: isGitHubPagesBuild ? `/${repositoryName}/` : '/',
  plugins: [react()],
})
