# Growth Business Development México - Technical Documentation

## System Requirements

- Node.js 18.x or higher
- NPM 9.x or higher
- 2 CPU cores minimum
- 4GB RAM minimum
- 20GB SSD storage minimum

## API Connections & Webhooks

### 1. Newsletter Subscription
**Endpoint:** `/api/newsletter`
```json
{
  "method": "POST",
  "payload": {
    "email": "string"
  },
  "response": {
    "success": "boolean",
    "data": {
      "subscriptionId": "string"
    }
  }
}
```
**Implementation Locations:**
- Footer Newsletter
- Blog Sidebar Newsletter
- Blog Post Newsletter

### 2. Contact Form
**Endpoint:** `/api/contact`
```json
{
  "method": "POST",
  "payload": {
    "name": "string",
    "email": "string",
    "company": "string?",
    "message": "string"
  },
  "response": {
    "success": "boolean",
    "data": {
      "ticketId": "string"
    }
  }
}
```
**Implementation Locations:**
- Contact Page Form
- Expansion Strategies Contact Form

### 3. Chat Agent (BD Agent)
**Endpoint:** `/api/chat`
```json
{
  "method": "POST",
  "payload": {
    "message": "string",
    "sessionId": "string"
  },
  "response": {
    "success": "boolean",
    "data": {
      "reply": "string",
      "sessionId": "string"
    }
  }
}
```
**Implementation Locations:**
- Floating Chat Widget (present on all pages)
- Meeting Scheduling Interactions

### 4. Expansion Request
**Endpoint:** `/api/expansion`
```json
{
  "method": "POST",
  "payload": {
    "serviceType": "string",
    "industry": "string",
    "budget": "number",
    "details": "string?"
  },
  "response": {
    "success": "boolean",
    "data": {
      "requestId": "string"
    }
  }
}
```
**Implementation Locations:**
- Expansion Strategies Page
- Services Section

### 5. Growth Intelligence Demo
**Endpoint:** `/api/growth-intelligence`
```json
{
  "method": "POST",
  "payload": {
    "requestType": "'demo' | 'trial' | 'consultation'",
    "email": "string",
    "company": "string?",
    "details": "string?"
  },
  "response": {
    "success": "boolean",
    "data": {
      "demoId": "string"
    }
  }
}
```
**Implementation Locations:**
- Growth Intelligence Page
- AI Solutions Section

## Webhook Integration with n8n

### Configuration Steps

1. Create n8n workflows for each endpoint:
```bash
# Example n8n workflow structure
workflows/
  ├── newsletter.json
  ├── contact.json
  ├── chat.json
  ├── expansion.json
  └── growth-intelligence.json
```

2. Set up environment variables:
```env
NEXT_PUBLIC_API_URL=https://api.growthbdm.com
N8N_WEBHOOK_BASE_URL=https://n8n.growthbdm.com
```

3. Configure CORS in n8n:
```json
{
  "headers": {
    "Access-Control-Allow-Origin": "https://growthbdm.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  }
}
```

### Error Handling

All API responses follow this structure:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

Error codes and meanings:
- 400: Invalid request data
- 401: Unauthorized
- 429: Rate limit exceeded
- 500: Internal server error

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Start development server:
```bash
npm run dev
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Security Considerations

1. API Rate Limiting:
```nginx
# Nginx configuration
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

location /api/ {
    limit_req zone=api_limit burst=20 nodelay;
    proxy_pass http://localhost:3000;
}
```

2. Input Validation:
- All forms use client-side validation
- Server-side validation implemented in API routes
- Sanitization of user inputs

3. CORS Configuration:
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://growthbdm.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
}
```

## Monitoring & Analytics

1. API Monitoring:
```typescript
// Implement request logging
const logRequest = (req: NextApiRequest) => {
  console.log({
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });
};
```

2. Error Tracking:
```typescript
// Error reporting setup
const reportError = (error: Error, context: any) => {
  // Implement error reporting logic
  console.error({
    error: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
};
```

## Testing

1. API Integration Tests:
```bash
# Run integration tests
npm run test:integration
```

2. Form Validation Tests:
```bash
# Run unit tests
npm run test:unit
```

## Support Contacts

- Technical Issues: tech@growthbdm.com
- API Integration: api@growthbdm.com
- Emergency: +XX XXX XXX XXXX