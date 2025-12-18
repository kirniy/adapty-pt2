import { groq } from 'next-sanity'

export const POSTS_QUERY = groq`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc)`

export const POST_BY_SLUG_QUERY = groq`*[_type == "blogPost" && slug.current == $slug][0]`

export const CATEGORIES_QUERY = groq`*[_type == "category"] {
  _id,
  name,
  slug,
  color,
  "count": count(*[_type == "blogPost" && references(^._id)])
}`

export const FEATURED_POST_QUERY = groq`*[_type == "blogPost"][0] {
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,
  mainImage,
  category->
}`
