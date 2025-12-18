
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../blog-data.ndjson');

const AUTHORS = [
    {
        _id: 'author-adapty',
        _type: 'author',
        name: 'Adapty Team',
        role: 'Growth Experts',
        slug: { _type: 'slug', current: 'adapty-team' },
        image: undefined // We'll skip image for now or use a placeholder if needed
    }
];

const CATEGORIES = [
    { _id: 'cat-growth', _type: 'category', title: 'App Growth' },
    { _id: 'cat-monetization', _type: 'category', title: 'Monetization' },
    { _id: 'cat-analytics', _type: 'category', title: 'Analytics' },
    { _id: 'cat-engineering', _type: 'category', title: 'Engineering' }
];

const POSTS = [
    {
        _id: 'post-pricing-models',
        _type: 'blogPost',
        title: 'App pricing models: How to choose a price strategy for your app',
        slug: { _type: 'slug', current: 'app-pricing-models-strategy' },
        publishedAt: '2024-12-15T12:00:00Z',
        author: { _type: 'reference', _ref: 'author-adapty' },
        category: { _type: 'reference', _ref: 'cat-monetization' },
        excerpt: 'Choosing the right pricing model is crucial for your app\'s success. Learn about Freemium, Subscription, Paid, and Hybrid models to find the best fit for your business.',
        readTime: 8,
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'Pricing is one of the most difficult P\'s in marketing mix to get right. It directly affects your revenue, user acquisition, and retention.' }]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'The Freemium Model' }]
            },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'Freemium is the most popular model in the App Store. It lowers the barrier to entry, allowing users to try before they buy.' }]
            }
        ]
    },
    {
        _id: 'post-analytics-stack',
        _type: 'blogPost',
        title: 'Mobile app analytics stack: UA, monetization & product metrics explained',
        slug: { _type: 'slug', current: 'mobile-app-analytics-stack' },
        publishedAt: '2024-12-10T10:00:00Z',
        author: { _type: 'reference', _ref: 'author-adapty' },
        category: { _type: 'reference', _ref: 'cat-analytics' },
        excerpt: 'Build a comprehensive analytics stack to track User Acquisition, Monetization, and Product metrics. Understand the tools and KPIs that matter.',
        readTime: 12,
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'To grow your mobile app, you need visibility into every stage of the user journey. From the first ad impression to the lifetime value of a subscriber.' }]
            }
        ]
    },
    {
        _id: 'post-onboarding-flow',
        _type: 'blogPost',
        title: 'How to fix your app onboarding flow (Real A/B test data inside)',
        slug: { _type: 'slug', current: 'fix-app-onboarding-flow' },
        publishedAt: '2024-12-05T09:00:00Z',
        author: { _type: 'reference', _ref: 'author-adapty' },
        category: { _type: 'reference', _ref: 'cat-growth' },
        excerpt: 'Onboarding is where you win or lose users. See real A/B test results and learn how to optimize your funnel for higher conversion rates.',
        readTime: 10,
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'We analyzed data from over 5,000 apps to understand what makes a successful onboarding flow. The results might surprise you.' }]
            }
        ]
    },
    {
        _id: 'post-delete-app',
        _type: 'blogPost',
        title: 'Why 45% of users delete your app in 24 hours — and how onboarding can save you',
        slug: { _type: 'slug', current: 'why-users-delete-app' },
        publishedAt: '2024-11-28T14:30:00Z',
        author: { _type: 'reference', _ref: 'author-adapty' },
        category: { _type: 'reference', _ref: 'cat-growth' },
        excerpt: 'High churn on day 1 is a common problem. meaningful onboarding can reduce this by showing value early.',
        readTime: 6,
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'First impressions matter. If users don\'t see value within the first session, they are likely to churn immediately.' }]
            }
        ]
    },
    {
        _id: 'post-100k-mrr',
        _type: 'blogPost',
        title: 'Going from $10K to $100K MRR: 7 questions that unlock app growth',
        slug: { _type: 'slug', current: 'unlocking-growth-100k-mrr' },
        publishedAt: '2024-11-20T11:15:00Z',
        author: { _type: 'reference', _ref: 'author-adapty' },
        category: { _type: 'reference', _ref: 'cat-monetization' },
        excerpt: 'Scaling from early traction to serious revenue requires a shift in strategy. Ask these 7 questions to unlock your next stage of growth.',
        readTime: 15,
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'What got you to $10k won\'t get you to $100k. You need to systematize your acquisition and optimize your monetization.' }]
            }
        ]
    }
];

const stream = fs.createWriteStream(OUTPUT_FILE);

[...AUTHORS, ...CATEGORIES, ...POSTS].forEach(doc => {
    stream.write(JSON.stringify(doc) + '\n');
});

stream.end();
console.log(`Generated ${AUTHORS.length + CATEGORIES.length + POSTS.length} documents to ${OUTPUT_FILE}`);
