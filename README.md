This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This project is set up with an automated CI/CD pipeline that deploys to Vercel on every push to the main branch.

### CI/CD Pipeline

The CI/CD pipeline is configured using GitHub Actions and includes the following steps:

1. **Validation**: Checks that all required Vercel secrets are set up correctly
2. **Linting**: Runs ESLint to ensure code quality
3. **Building**: Builds the Next.js application
4. **Testing**: Runs Jest tests (commented out by default, uncomment in workflow file when tests are added)
5. **Deployment**: Automatically deploys to Vercel

### Required Secrets

To use the CI/CD pipeline, you need to set up the following secrets in your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

### Running Tests Locally

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel
```

For production deployment:

```bash
vercel --prod
```

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
