
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

import { apiVersion, dataset, projectId, useCdn } from '../../sanity/env'

export const client = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
})

const builder = imageUrlBuilder(client)

type ImageSource = Parameters<typeof builder.image>[0]

export function urlFor(source: ImageSource) {
    return builder.image(source)
}
