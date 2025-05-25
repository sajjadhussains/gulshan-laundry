# Deployment Documentation

This document provides comprehensive information about the CI/CD pipeline and deployment process for the Gulshan Laundry application.

## CI/CD Pipeline

The application uses GitHub Actions for continuous integration and continuous deployment to Vercel. The pipeline is configured in `.github/workflows/vercel-deploy.yml`.

### Pipeline Workflow

1. **Validation**
   - Checks that all required Vercel secrets are properly configured
   - Ensures the deployment can proceed without issues

2. **Test and Build**
   - Sets up Node.js environment
   - Installs dependencies with caching for faster builds
   - Runs linting to ensure code quality
   - Executes tests to verify functionality
   - Builds the application for deployment
   - Creates preview deployments for pull requests
   - Deploys to production for pushes to the main branch

3. **Performance Monitoring**
   - Uses Lighthouse CI to check performance, accessibility, best practices, and SEO
   - Runs only on pull requests to catch performance regressions before they reach production
   - Uploads performance reports for review

### Required GitHub Secrets

The following secrets must be configured in your GitHub repository settings:

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

To obtain these values:

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel login` and authenticate
3. Run `vercel link` in your project directory
4. Find the values in the `.vercel/project.json` file that is created

## Environment Variables

### Configuration

Environment variables are managed through the `src/config/env.ts` file, which provides:

- Environment detection (development, preview, production)
- Environment-specific configurations
- Validation of required environment variables

### Setting Up Environment Variables in Vercel

1. **Go to the Vercel Dashboard**
   - Navigate to your project

2. **Configure Environment Variables**
   - Click on "Settings" > "Environment Variables"
   - Add the following variables:
     - `NEXT_PUBLIC_API_URL`: The URL of your API (if different from the default)
     - Any other environment variables your application needs

3. **Environment-Specific Variables**
   - Vercel allows you to set different values for Production, Preview, and Development
   - Use this feature to point to different API endpoints or enable/disable features

### Local Development

For local development:

1. Create a `.env.local` file in the project root (this file is gitignored)
2. Add your environment variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_USE_MOCKS=true
   ```

## Deployment

### Automatic Deployment

The CI/CD pipeline automatically deploys:
- Preview deployments for all pull requests
- Production deployments when code is merged to the main branch

### Manual Deployment

You can also deploy manually:

1. Install Vercel CLI: `npm i -g vercel`
2. Authenticate: `vercel login`
3. Deploy to preview: `vercel`
4. Deploy to production: `vercel --prod`

## Performance Monitoring

The CI/CD pipeline includes Lighthouse CI for performance monitoring. The configuration is in `.lighthouserc.js`.

Performance thresholds:
- Performance: 80%
- Accessibility: 90%
- Best Practices: 90%
- SEO: 90%

## Troubleshooting

### Common Issues

1. **Deployment Failures**
   - Check GitHub Actions logs for details
   - Verify that all required secrets are properly configured
   - Ensure the build process completes successfully locally

2. **Environment Variable Issues**
   - Verify variables are correctly set in Vercel dashboard
   - Check for typos in variable names
   - Ensure variables are properly accessed in the code

3. **Preview Deployment Not Working**
   - Verify GitHub token permissions
   - Check that the Vercel project is correctly linked

### Getting Help

If you encounter issues not covered here:
1. Check the GitHub Actions logs
2. Review the Vercel deployment logs
3. Consult the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
4. Reach out to the development team for assistance
