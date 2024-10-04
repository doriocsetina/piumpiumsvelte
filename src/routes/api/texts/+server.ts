import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { json } from '@sveltejs/kit';

interface TextData {
  id: string;
  title: string;
  description: string;
  has_chapters: boolean;
  chapters: string[];
}

export async function GET() {
  const textsDir: string = 'build/client/written';
  const folders: string[] = readdirSync(textsDir);

  const texts: TextData[] = folders.map((folder: string) => {
    const jsonFilePath: string = join(textsDir, folder, 'data.json');
    const textData: TextData = JSON.parse(readFileSync(jsonFilePath, 'utf-8'));
    return textData;
  });

  return json(texts);
}