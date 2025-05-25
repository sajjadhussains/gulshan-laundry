# Environment Variables Guide

This document provides detailed information about environment variables used in the Gulshan Laundry application.

## Environment Configuration

The application uses a centralized environment configuration system located in `src/config/env.ts`. This system:

- Detects the current environment (development, preview, production)
- Provides environment-specific configurations
- Validates required environment variables

## Available Environment Variables

| Variable | Description | Required | Default Value |
|----------|-------------|----------|--------------|
| `NEXT_PUBLIC_API_URL` | The URL of the API endpoint | No | Environment-specific defaults |
| `NEXT_PUBLIC_USE_MOCKS` | Whether to use mock data instead of real API calls | No | `undefined` |
| `NEXT_PUBLIC_VERCEL_ENV` | The current Vercel environment | No | Detected from `NODE_ENV` |

## Environment-Specific Defaults

The application uses different default values based on the detected environment:

### Development
```
apiUrl: 'http://localhost:3000/api'
```

### Preview
```
apiUrl: 'https://preview.gulshan-laundry.vercel.app/api'
```

### Production
```
apiUrl: 'https://gulshan-laundry.vercel.app/api'
```

## Setting Up Environment Variables

### Local Development

For local development, create a `.env.local` file in the project root with your environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_USE_MOCKS=true
```

This file is gitignored to prevent sensitive information from being committed to the repository.

### Vercel Deployment

To set up environment variables for Vercel deployments:

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to "Settings" > "Environment Variables"
4. Add your environment variables
5. Specify which environments (Production, Preview, Development) each variable applies to

## Using Environment Variables in Code

### Client-Side

For client-side access, prefix your environment variables with `NEXT_PUBLIC_`:

```typescript
// This will work in the browser
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### Server-Side

All environment variables are available on the server side:

```typescript
// This will only work on the server
const secretKey = process.env.SECRET_KEY;
```

### Using the Environment Configuration

Import the environment configuration to access environment variables:

```typescript
import { env, currentEnv } from '../config/env';

// Use environment-specific configuration
const apiUrl = env.apiUrl;

// Check current environment
if (currentEnv === 'development') {
  console.log('Running in development mode');
}
```

## Adding New Environment Variables

To add new environment variables:

1. Update the `EnvConfig` interface in `src/config/env.ts`:
   ```typescript
   interface EnvConfig {
     apiUrl: string;
     newVariable: string; // Add your new variable here
   }
   ```

2. Add the variable to each environment configuration:
   ```typescript
   const envConfig: Record<Environment, EnvConfig> = {
     development: {
       apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
       newVariable: process.env.NEXT_PUBLIC_NEW_VARIABLE || 'default-dev-value',
     },
     // Add to preview and production as well
   };
   ```

3. If the variable is required, add it to the `requiredVars` array in the `validateEnv` function:
   ```typescript
   const requiredVars: string[] = [
     'NEXT_PUBLIC_NEW_VARIABLE',
   ];
   ```

## Best Practices

1. **Security**: Never expose sensitive information in client-side variables (those with `NEXT_PUBLIC_` prefix)
2. **Defaults**: Always provide sensible defaults for non-required variables
3. **Validation**: Add required variables to the validation function to catch missing variables early
4. **Documentation**: Update this document when adding new environment variables
5. **Types**: Ensure all environment variables have proper TypeScript types
