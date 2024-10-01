import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { json } from '@sveltejs/kit';


export async function GET() {
  const galleryDir = 'static/img/gallery'
  const folders = readdirSync(galleryDir);

  const posts = folders.map(folder => {
    const jsonFilePath = join(galleryDir, folder, 'data.json');
    const postData = JSON.parse(readFileSync(jsonFilePath, 'utf-8'))
    return postData
  })
  return posts;
}