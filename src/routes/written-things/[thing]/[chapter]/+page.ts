import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  return {
      thing: params.thing,
      chapter: params.chapter,
  };
};
