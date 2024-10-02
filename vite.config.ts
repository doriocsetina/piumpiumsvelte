import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";


export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@gallery': '/app/gallery',
		},
	},
	server: {
	  fs: {
		allow: [
		  searchForWorkspaceRoot(process.cwd()),
		],
	  },
	},
  })