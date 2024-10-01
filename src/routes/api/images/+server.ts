import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { json } from '@sveltejs/kit';

interface PostData {
  id: string;
  title: string;
  description: string;
  preview: string;
  files: string[];
}

export async function GET() {
  const galleryDir: string = 'static/img/gallery';
  const folders: string[] = readdirSync(galleryDir);

  const posts: PostData[] = folders.map((folder: string) => {
    const jsonFilePath: string = join(galleryDir, folder, 'data.json');
    const postData: PostData = JSON.parse(readFileSync(jsonFilePath, 'utf-8'));
    return postData;
  });

  return json(posts);
}