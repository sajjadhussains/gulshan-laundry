# CI/CD Pipeline Documentation

This document provides detailed information about the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Gulshan Laundry application.

## Overview

The CI/CD pipeline automates the testing, building, and deployment process using GitHub Actions and Vercel. The pipeline is configured to:

1. Run on every push to the main branch
2. Run on every pull request to the main branch
3. Create preview deployments for pull requests
4. Deploy to production when changes are merged to main
5. Run performance tests on preview deployments

## Pipeline Configuration

The pipeline is configured in `.github/workflows/vercel-deploy.yml`. It consists of the following jobs:

### 1. Validate

This job validates that all required Vercel secrets are properly configured:

```yaml
validate:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Verify Vercel Project Settings
      run: |
        if [ -z "${{ secrets.VERCEL_TOKEN }}" ] || [ -z "${{ secrets.VERCEL_ORG_ID }}" ] || [ -z "${{ secrets.VERCEL_PROJECT_ID }}" ]; then
          echo "Error: Missing required Vercel secrets. Please add VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID to your repository secrets."
          exit 1
        fi
```

### 2. Test and Build

This job runs tests, builds the application, and deploys to Vercel:

```yaml
test-and-build:
  needs: validate
  runs-on: ubuntu-latest
  outputs:
    preview-url: ${{ steps.vercel-preview-deployment.outputs.preview-url }}
  steps:
    # Setup steps
    - name: Checkout code
    - name: Setup Node.js
    - name: Cache dependencies
    - name: Install dependencies
    
    # Test and build steps
    - name: Run linting
    - name: Run tests
    - name: Build application
    
    # Deployment steps
    - name: Deploy Preview to Vercel (for pull requests)
    - name: Deploy Production to Vercel (for main branch)
```

### 3. Lighthouse Check

This job runs Lighthouse CI to check performance metrics on preview deployments:

```yaml
lighthouse-check:
  needs: test-and-build
  if: github.event_name == 'pull_request'
  runs-on: ubuntu-latest
  steps:
    - name: Checkout code
    - name: Run Lighthouse CI
```

## Required Secrets

The following secrets must be configured in your GitHub repository settings:

| Secret | Description | How to Obtain |
|--------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel API token | Vercel account settings > Tokens |
| `VERCEL_ORG_ID` | Vercel organization ID | Run `vercel link` and check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Vercel project ID | Run `vercel link` and check `.vercel/project.json` |

## Setting Up the Pipeline

### 1. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the required secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

### 2. Obtain Vercel Credentials

1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`
3. Link your project: `vercel link`
4. Check the `.vercel/project.json` file for your `orgId` and `projectId`
5. Get your token from the Vercel dashboard under Account Settings > Tokens

## Workflow Details

### Pull Request Workflow

When a pull request is created or updated:

1. The pipeline runs tests and builds the application
2. A preview deployment is created on Vercel
3. The preview URL is added as a comment to the pull request
4. Lighthouse CI runs performance tests on the preview deployment
5. The results are reported back to the pull request

### Main Branch Workflow

When changes are pushed to the main branch:

1. The pipeline runs tests and builds the application
2. The application is deployed to production on Vercel

## Performance Monitoring

The pipeline uses Lighthouse CI to monitor performance metrics. The configuration is in `.lighthouserc.js`.

Performance thresholds:

- Performance: 80%
- Accessibility: 90%
- Best Practices: 90%
- SEO: 90%

## Customizing the Pipeline

### Adding New Tests

To add new tests to the pipeline:

1. Add your test scripts to `package.json`
2. Ensure they are run with `npm test`
3. The pipeline will automatically run them

### Adding Custom Build Steps

To add custom build steps:

1. Edit the `.github/workflows/vercel-deploy.yml` file
2. Add your custom steps before the deployment step

Example:
```yaml
- name: Custom Build Step
  run: npm run custom-script
```

### Modifying Performance Thresholds

To modify performance thresholds:

1. Edit the `.lighthouserc.js` file
2. Update the assertion values

Example:
```javascript
assertions: {
  'categories:performance': ['warn', { minScore: 0.9 }], // Increase from 0.8 to 0.9
}
```

## Troubleshooting

### Common Issues

1. **Missing Secrets**
   - Error: "Missing required Vercel secrets"
   - Solution: Add the required secrets to your GitHub repository

2. **Build Failures**
   - Check the GitHub Actions logs for specific error messages
   - Ensure the build works locally before pushing

3. **Deployment Failures**
   - Verify your Vercel token has the correct permissions
   - Check that your Vercel project is correctly configured

### Viewing Logs

1. Go to your GitHub repository
2. Navigate to Actions tab
3. Click on the failed workflow
4. Expand the job that failed to see detailed logs

## Best Practices

1. **Always run tests locally before pushing**
2. **Keep secrets secure and never commit them to the repository**
3. **Review Lighthouse performance reports to maintain good performance**
4. **Use meaningful commit messages to make the CI/CD history clear**
5. **Regularly update dependencies to keep the pipeline secure**
