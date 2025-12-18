import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { projectId, dataset, apiVersion, useCdn } from '../../../sanity/env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}
