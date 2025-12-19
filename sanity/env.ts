export const apiVersion =
    sanitizeEnvValue(process.env.NEXT_PUBLIC_SANITY_API_VERSION) || '2024-12-18'

export const dataset = assertValue(
    sanitizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET),
    'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = validateProjectId(
    assertValue(
        sanitizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
        'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
    )
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage)
    }
    return v
}

function sanitizeEnvValue(value?: string) {
    if (value === undefined) return value
    const trimmed = value.trim()
    return trimmed === '' ? undefined : trimmed
}

function validateProjectId(id: string) {
    const isValid = /^[a-z0-9-]+$/.test(id)
    if (!isValid) {
        throw new Error(
            `Invalid NEXT_PUBLIC_SANITY_PROJECT_ID "${id}". Use only lowercase letters, numbers, and dashes, and remove any extra whitespace or newlines.`
        )
    }
    return id
}
