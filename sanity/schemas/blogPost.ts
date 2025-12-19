import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: { type: 'category' },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true }
                },
                {
                    type: 'object',
                    name: 'codeBlock',
                    title: 'Code Block',
                    fields: [
                        { name: 'code', type: 'text', title: 'Code' },
                        {
                            name: 'language',
                            type: 'string',
                            title: 'Language',
                            options: {
                                list: [
                                    { title: 'Text', value: 'text' },
                                    { title: 'Swift', value: 'Swift' },
                                    { title: 'Kotlin', value: 'Kotlin' },
                                    { title: 'Objective-C', value: 'Objective-C' },
                                    { title: 'Java', value: 'Java' },
                                    { title: 'JavaScript', value: 'JavaScript' },
                                    { title: 'TypeScript', value: 'TypeScript' },
                                    { title: 'React Native', value: 'React Native' },
                                    { title: 'Dart', value: 'Dart' },
                                    { title: 'Flutter', value: 'Flutter' },
                                    { title: 'C#', value: 'C#' },
                                    { title: 'Python', value: 'Python' },
                                    { title: 'Ruby', value: 'Ruby' },
                                    { title: 'PHP', value: 'PHP' },
                                    { title: 'Go', value: 'Go' },
                                    { title: 'Rust', value: 'Rust' },
                                    { title: 'SQL', value: 'SQL' },
                                    { title: 'Bash', value: 'Bash' },
                                    { title: 'JSON', value: 'JSON' },
                                    { title: 'HTML', value: 'HTML' },
                                    { title: 'CSS', value: 'CSS' },
                                ],
                                layout: 'dropdown',
                            },
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'readTime',
            title: 'Read Time (min)',
            type: 'number'
        })
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
