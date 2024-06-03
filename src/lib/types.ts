export type Post = {
  slug: string
  title: string
  description: string
  published: boolean
  tags: string[]
  date: string
  languages: string[]
  previewComponent?: string
}
