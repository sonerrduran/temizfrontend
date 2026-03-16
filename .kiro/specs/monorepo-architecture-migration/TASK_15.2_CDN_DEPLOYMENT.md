# Task 15.2: CDN Deployment Configuration

## Overview
Configure CDN deployment for micro frontends to enable independent deployment and scaling.

## CDN Strategy

### Micro Frontends to Deploy
1. **math-games** → CDN URL: `https://cdn.egitimgalaksisi.com/math-games/`
2. **logic-games** → CDN URL: `https://cdn.egitimgalaksisi.com/logic-games/`
3. **language-games** → CDN URL: `https://cdn.egitimgalaksisi.com/language-games/`

## AWS S3 + CloudFront Configuration

### S3 Buckets Structure
```
egitim-galaksisi-math-games/
├── v1.0.0/
│   ├── assets/
│   ├── remoteEntry.js
│   └── index.html
├── v1.0.1/
└── latest/ (symlink to current version)

egitim-galaksisi-logic-games/
├── v1.0.0/
└── latest/

egitim-galaksisi-language-games/
├── v1.0.0/
└── latest/
```

### CloudFront Distributions
- **math-games**: `d1234567890.cloudfront.net`
- **logic-games**: `d0987654321.cloudfront.net`
- **language-games**: `d1122334455.cloudfront.net`

### Custom Domain (Optional)
- `math-games.egitimgalaksisi.com`
- `logic-games.egitimgalaksisi.com`
- `language-games.egitimgalaksisi.com`

## Versioning Strategy

### Semantic Versioning
- **Major**: Breaking changes (v2.0.0)
- **Minor**: New features (v1.1.0)
- **Patch**: Bug fixes (v1.0.1)

### Deployment Paths
```
/v{major}.{minor}.{patch}/remoteEntry.js
/latest/remoteEntry.js (always points to stable)
```

## Environment Variables

### Micro Frontend Build
```env
# .env.production (each micro frontend)
VITE_PUBLIC_PATH=https://cdn.egitimgalaksisi.com/math-games/latest/
VITE_VERSION=1.0.0
```

### Host App Configuration
```env
# apps/web/.env.production
VITE_MATH_GAMES_URL=https://cdn.egitimgalaksisi.com/math-games/latest/remoteEntry.js
VITE_LOGIC_GAMES_URL=https://cdn.egitimgalaksisi.com/logic-games/latest/remoteEntry.js
VITE_LANGUAGE_GAMES_URL=https://cdn.egitimgalaksisi.com/language-games/latest/remoteEntry.js

# Fallback URLs (local or previous version)
VITE_MATH_GAMES_FALLBACK=http://localhost:5001/remoteEntry.js
VITE_LOGIC_GAMES_FALLBACK=http://localhost:5002/remoteEntry.js
VITE_LANGUAGE_GAMES_FALLBACK=http://localhost:5003/remoteEntry.js
```


## Vite Configuration for CDN

### Math Games (micro-frontends/math-games/vite.config.ts)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    federation({
      name: 'mathGames',
      filename: 'remoteEntry.js',
      exposes: {
        './MathGamesRouter': './src/MathGamesRouter',
        './Grade1': './src/games/grade1',
        './Grade2': './src/games/grade2',
        // ... other grades
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  build: {
    target: 'esnext',
    minify: mode === 'production',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  },
  base: mode === 'production' 
    ? process.env.VITE_PUBLIC_PATH || '/math-games/'
    : '/'
}));
```

## Deployment Scripts

### package.json Scripts
```json
{
  "scripts": {
    "build:cdn": "npm run build:mfe -- --mode production",
    "deploy:math-games": "npm run build:math-games && node scripts/deploy-to-cdn.js math-games",
    "deploy:logic-games": "npm run build:logic-games && node scripts/deploy-to-cdn.js logic-games",
    "deploy:language-games": "npm run build:language-games && node scripts/deploy-to-cdn.js language-games",
    "deploy:all-mfe": "npm run build:mfe && node scripts/deploy-all-mfe.js"
  }
}
```

### Deployment Script (scripts/deploy-to-cdn.js)
```javascript
#!/usr/bin/env node
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MFE_NAME = process.argv[2];
const VERSION = process.env.VERSION || '1.0.0';
const BUCKET_NAME = `egitim-galaksisi-${MFE_NAME}`;
const DISTRIBUTION_ID = process.env[`${MFE_NAME.toUpperCase()}_DISTRIBUTION_ID`];

const s3Client = new S3Client({ region: 'eu-central-1' });
const cloudFrontClient = new CloudFrontClient({ region: 'eu-central-1' });

async function uploadToS3(localPath, s3Key) {
  const fileContent = fs.readFileSync(localPath);
  const contentType = getContentType(localPath);
  
  await s3Client.send(new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key,
    Body: fileContent,
    ContentType: contentType,
    CacheControl: s3Key.includes('remoteEntry') 
      ? 'public, max-age=300' // 5 minutes for remoteEntry
      : 'public, max-age=31536000' // 1 year for assets
  }));
}

async function invalidateCloudFront() {
  await cloudFrontClient.send(new CreateInvalidationCommand({
    DistributionId: DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: 2,
        Items: [
          `/latest/*`,
          `/v${VERSION}/*`
        ]
      }
    }
  }));
}

// Main deployment logic
console.log(`Deploying ${MFE_NAME} v${VERSION} to CDN...`);
// ... upload files and invalidate cache
```

## Cache Strategy

### CloudFront Cache Behaviors
```yaml
remoteEntry.js:
  Cache-Control: public, max-age=300 (5 minutes)
  Purpose: Allow quick updates

Assets (JS/CSS):
  Cache-Control: public, max-age=31536000 (1 year)
  Purpose: Long-term caching with versioned filenames

index.html:
  Cache-Control: no-cache
  Purpose: Always fetch latest
```

## Rollback Strategy

### Version Management
```bash
# Deploy new version
npm run deploy:math-games -- --version 1.0.1

# Rollback to previous version
node scripts/rollback-mfe.js math-games 1.0.0
```

### Rollback Script
```javascript
// Update 'latest' symlink to point to previous version
async function rollback(mfeName, version) {
  // Update S3 latest/ to point to v{version}/
  // Invalidate CloudFront cache
}
```

## Monitoring

### CloudWatch Metrics
- Request count per micro frontend
- Error rate (4xx, 5xx)
- Cache hit ratio
- Data transfer

### Alerts
- Error rate > 5%
- Cache hit ratio < 80%
- Unusual traffic patterns

## Security

### S3 Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::egitim-galaksisi-*/*"
  }]
}
```

### CloudFront Security
- HTTPS only
- Origin Access Identity (OAI)
- Custom headers for origin verification
- WAF rules (optional)

## Cost Optimization

### Strategies
1. Enable compression (gzip/brotli)
2. Use CloudFront edge locations
3. Optimize asset sizes
4. Monitor data transfer costs

### Estimated Costs (Monthly)
- S3 Storage: ~$5
- CloudFront Data Transfer: ~$50-100
- CloudFront Requests: ~$10
- **Total**: ~$65-115/month

## Requirements Satisfied

✅ **NFR-8.6**: CDN deployment configuration  
✅ **NFR-8.7**: Versioning strategy  
✅ **NFR-8.4**: Rollback mechanism

## Status

⏳ **Configuration Documented**
- AWS setup pending
- Deployment scripts to be created
- Environment variables to be configured
