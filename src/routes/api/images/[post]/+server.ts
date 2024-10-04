import { readFileSync } from "fs";
import { join } from "path";
import { json } from '@sveltejs/kit';

  export async function GET({ params }) {
    const { post } = params;
    const galleryDir: string = 'build/client/gallery'
    const jsonFilePath: string = join(galleryDir, post, 'data.json');
    console.log("i did a thing");
    const data = JSON.parse(readFileSync(jsonFilePath, 'utf-8'))
    console.log("the thing is: ", data );
    return json(data);
  }