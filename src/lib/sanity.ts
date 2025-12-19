
import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

import { apiVersion, dataset, projectId, useCdn } from '../../sanity/env'

export const client = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
})

const builder = createImageUrlBuilder(client)

type ImageSource = Parameters<typeof builder.image>[0]

export function urlFor(source: ImageSource) {
    return builder.image(source)
}
