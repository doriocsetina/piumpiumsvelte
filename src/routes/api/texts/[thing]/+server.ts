import { readFileSync } from "fs";
import { join } from "path";
import { json } from '@sveltejs/kit';

  export async function GET({ params }) {
    const { thing } = params;
    const textsDir: string = 'build/client/written'
    const jsonFilePath: string = join(textsDir, thing, 'data.json');
    console.log("i did a thing");
    const data = JSON.parse(readFileSync(jsonFilePath, 'utf-8'))
    console.log("the thing is: ", data );
    return json(data);
  }