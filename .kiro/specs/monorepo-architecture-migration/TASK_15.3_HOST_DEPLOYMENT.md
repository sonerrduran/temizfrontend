# Task 15.3: Host App Deployment Configuration

## Overview
Configure production deployment for host applications (web, admin, teacher).

## Deployment Targets

### Apps to Deploy
1. **apps/web** (Student App) - Main application
2. **apps/admin** (Admin Dashboard) - School administration
3. **apps/teacher** (Teacher Dashboard) - Teacher tools

## Environment-Specific Configuration

### Development Environment
```env
# apps/web/.env.development
VITE_API_URL=http://localhost:3000/api
VITE_MATH_GAMES_URL=http://localhost:5001/remoteEntry.js
VITE_LOGIC_GAMES_URL=http://localhost:5002/remoteEntry.js
VITE_LANGUAGE_GAMES_URL=http://localhost:5003/remoteEntry.js
VITE_ENV=development
```

### Staging Environment
```env
# apps/web/.env.staging
VITE_API_URL=https://api-staging.egitimgalaksisi.com/api
VITE_MATH_GAMES_URL=https://cdn-staging.egitimgalaksisi.com/math-games/latest/remoteEntry.js
VITE_LOGIC_GAMES_URL=https://cdn-staging.egitimgalaksisi.com/logic-games/latest/remoteEntry.js
VITE_LANGUAGE_GAMES_URL=https://cdn-staging.egitimgalaksisi.com/language-games/latest/remoteEntry.js
VITE_ENV=staging
```

### Production Environment
```env
# apps/web/.env.production
VITE_API_URL=https://api.egitimgalaksisi.com/api
VITE_MATH_GAMES_URL=https://cdn.egitimgalaksisi.com/math-games/latest/remoteEntry.js
VITE_LOGIC_GAMES_URL=https://cdn.egitimgalaksisi.com/logic-games/latest/remoteEntry.js
VITE_LANGUAGE_GAMES_URL=https://cdn.egitimgalaksisi.com/language-games/latest/remoteEntry.js

# Fallback URLs
VITE_MATH_GAMES_FALLBACK=https://cdn.egitimgalaksisi.com/math-games/v1.0.0/remoteEntry.js
VITE_LOGIC_GAMES_FALLBACK=https://cdn.egitimgalaksisi.com/logic-games/v1.0.0/remoteEntry.js
VITE_LANGUAGE_GAMES_FALLBACK=https://cdn.egitimgalaksisi.com/language-games/v1.0.0/remoteEntry.js

VITE_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
```

## Module Federation Remote Configuration

### apps/web/vite.config.ts
```typescript
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      federation({
        name: 'host',
        remotes: {
          mathGames: env.VITE_MATH_GAMES_URL,
          logicGames: env.VITE_LOGIC_GAMES_URL,
          languageGames: env.VITE_LANGUAGE_GAMES_URL
        },
        shared: ['react', 'react-dom', 'react-router-dom', 'zustand']
      })
    ],
    build: {
      target: 'esnext',
      minify: mode === 'production',
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@repo/ui'],
            gameEngine: ['@repo/game-engine']
          }
        }
      }
    }
  };
});
```


## Fallback Mechanism

### MicroFrontendLoader Component
```typescript
// apps/web/src/components/MicroFrontendLoader.tsx
import React, { Suspense, lazy, useState, useEffect } from 'react';
import ErrorBoundary from '@repo/ui/components/ErrorBoundary';
import LoadingSpinner from '@repo/ui/components/LoadingSpinner';

interface MicroFrontendLoaderProps {
  name: 'mathGames' | 'logicGames' | 'languageGames';
  module: string;
  fallbackUrl?: string;
}

export const MicroFrontendLoader: React.FC<MicroFrontendLoaderProps> = ({
  name,
  module,
  fallbackUrl
}) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Try primary URL
        const remote = await import(/* @vite-ignore */ `${name}/${module}`);
        setComponent(() => remote.default);
      } catch (primaryError) {
        console.error(`Failed to load ${name}/${module}:`, primaryError);
        
        if (fallbackUrl) {
          try {
            // Try fallback URL
            const fallbackRemote = await import(/* @vite-ignore */ fallbackUrl);
            setComponent(() => fallbackRemote.default);
            console.warn(`Loaded ${name} from fallback URL`);
          } catch (fallbackError) {
            console.error(`Fallback also failed:`, fallbackError);
            setError(fallbackError as Error);
          }
        } else {
          setError(primaryError as Error);
        }
      }
    };

    loadComponent();
  }, [name, module, fallbackUrl]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Failed to load {name}</h2>
        <p>Please refresh the page or contact support.</p>
      </div>
    );
  }

  if (!Component) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};
```

## Production Server Configuration

### Option 1: Static Hosting (Vercel/Netlify)
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "@api-url",
    "VITE_MATH_GAMES_URL": "@math-games-url"
  }
}
```

### Option 2: Docker + Nginx
```dockerfile
# apps/web/Dockerfile.production
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY turbo.json ./
COPY apps/web ./apps/web
COPY packages ./packages

RUN npm ci
RUN npm run build:web

FROM nginx:alpine
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# apps/web/nginx.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

## Deployment Scripts

### package.json
```json
{
  "scripts": {
    "deploy:web:staging": "npm run build:web -- --mode staging && node scripts/deploy-app.js web staging",
    "deploy:web:production": "npm run build:web -- --mode production && node scripts/deploy-app.js web production",
    "deploy:admin:production": "npm run build:admin -- --mode production && node scripts/deploy-app.js admin production",
    "deploy:teacher:production": "npm run build:teacher -- --mode production && node scripts/deploy-app.js teacher production"
  }
}
```

## Health Checks

### Health Check Endpoint
```typescript
// apps/web/src/api/health.ts
export async function healthCheck() {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: import.meta.env.VITE_VERSION,
    environment: import.meta.env.VITE_ENV,
    microFrontends: {
      mathGames: await checkMicroFrontend('mathGames'),
      logicGames: await checkMicroFrontend('logicGames'),
      languageGames: await checkMicroFrontend('languageGames')
    }
  };
}

async function checkMicroFrontend(name: string): Promise<boolean> {
  try {
    const url = import.meta.env[`VITE_${name.toUpperCase()}_URL`];
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
```

## Monitoring & Logging

### Application Logs
```typescript
// apps/web/src/utils/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    if (import.meta.env.VITE_ENV === 'production') {
      // Send to logging service
      console.log(message, meta);
    }
  },
  error: (message: string, error?: Error) => {
    if (import.meta.env.VITE_ENV === 'production') {
      // Send to error tracking service
      console.error(message, error);
    }
  }
};
```

## Requirements Satisfied

✅ **NFR-8.1**: Production server configuration  
✅ **NFR-8.5**: Environment-specific config  
✅ **NFR-8.4**: Fallback mechanism

## Status

✅ **Configuration Documented**
- Environment files structured
- Fallback mechanism designed
- Deployment options provided
- Health checks defined

## Next Steps

1. Create environment files for each environment
2. Implement MicroFrontendLoader with fallback
3. Set up production server (Vercel/Docker)
4. Configure health check endpoints
5. Test deployment pipeline
