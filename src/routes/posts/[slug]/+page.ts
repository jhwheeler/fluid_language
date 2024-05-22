import { error } from "@sveltejs/kit";

export async function load({ params }) {
  try {
    const post = await import(`../../../posts/${params.slug}.md`)
    const { default: content, metadata } = post

    return {
      content,
      metadata,
    }
  } catch (e) {
    error(404, e)
  }
}
