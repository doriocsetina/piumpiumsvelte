import { readdirSync } from 'fs';
import { json } from '@sveltejs/kit';

export async function GET() {
  const images = readdirSync('static/img/gallery');
  return json(images);
}