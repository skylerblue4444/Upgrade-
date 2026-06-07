# SkyCoin444 v10 - Production Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying SkyCoin444 v10 to a production environment with full monitoring, auto-healing, and CI/CD integration.

---

## 1. Pre-Deployment Checklist

### Infrastructure Requirements
- [ ] Node.js 22.13.0 or higher
- [ ] 8GB RAM minimum (16GB recommended)
- [ ] 20GB disk space
- [ ] MySQL 8.0+ or TiDB cluster
- [ ] S3-compatible storage (AWS S3, MinIO, etc.)
- [ ] Docker & Docker Compose (optional but recommended)

### Environment Configuration
- [ ] Database credentials configured
- [ ] OAuth server URL set
- [ ] S3 bucket and credentials ready
- [ ] SSL/TLS certificates obtained
- [ ] Domain name configured

### Security Verification
- [ ] All secrets externalized to environment variables
- [ ] No hardcoded credentials in codebase
- [ ] Security audit passed (see PRODUCTION_VERIFICATION_REPORT.md)
- [ ] OAuth middleware enabled
- [ ] Rate limiting configured

---

## 2. Quick Start (Local Development)

```bash
# Clone repository
git clone https://github.com/skylerblue4444/Upgrade-.git
cd Upgrade-

# Install dependencies
pnpm install

# Build production
npm run build

# Start server
NODE_ENV=production npm start

# Server runs on http://localhost:3000
```

---

## 3. Docker Deployment (Recommended)

### Single Container Deployment

```bash
# Build Docker image
docker build -f Dockerfile.prod -t skycoin444:v10 .

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL="mysql://user:pass@db:3306/skycoin444" \
  -e OAUTH_SERVER_URL="https://oauth.example.com" \
  skycoin444:v10
```

### Full Stack with Docker Compose

```bash
# Create .env file with production variables
cat > .env.production << 'ENVEOF'
NODE_ENV=production
DATABASE_URL=mysql://user:pass@db:3306/skycoin444
OAUTH_SERVER_URL=https://oauth.example.com
GRAFANA_ADMIN_PASSWORD=secure_password_here
ENVEOF

# Start full stack (app + Prometheus + Grafana)
docker-compose -f docker-compose.prod.yml up -d

# Verify services
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f skycoin444
```

### Access Services
- **SkyCoin444 App:** http://localhost:3000
- **Prometheus Metrics:** http://localhost:9090
- **Grafana Dashboard:** http://localhost:3001 (admin/admin)

---

## 4. Kubernetes Deployment

### Create Kubernetes Manifests

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: skycoin444
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: skycoin444
  template:
    metadata:
      labels:
        app: skycoin444
    spec:
      containers:
      - name: skycoin444
        image: skycoin444:v10
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: skycoin-secrets
              key: database-url
        - name: OAUTH_SERVER_URL
          valueFrom:
            secretKeyRef:
              name: skycoin-secrets
              key: oauth-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: skycoin444-service
  namespace: production
spec:
  type: LoadBalancer
  selector:
    app: skycoin444
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
```

### Deploy to Kubernetes

```bash
# Create namespace
kubectl create namespace production

# Create secrets
kubectl create secret generic skycoin-secrets \
  --from-literal=database-url="mysql://user:pass@db:3306/skycoin444" \
  --from-literal=oauth-url="https://oauth.example.com" \
  -n production

# Deploy
kubectl apply -f k8s/deployment.yaml

# Verify deployment
kubectl get pods -n production
kubectl get svc -n production

# View logs
kubectl logs -f deployment/skycoin444 -n production
```

---

## 5. Environment Variables

Create `.env.production` with the following variables:

```bash
# Server Configuration
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=mysql://username:password@db-host:3306/skycoin444

# OAuth
OAUTH_SERVER_URL=https://oauth.example.com
OAUTH_CLIENT_ID=your_client_id
OAUTH_CLIENT_SECRET=your_client_secret

# S3 Storage
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=skycoin444-prod

# Monitoring
PROMETHEUS_ENABLED=true
GRAFANA_ENABLED=true

# Security
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key
```

---

## 6. CI/CD Pipeline

### GitHub Actions

The project includes a production CI/CD pipeline (`.github/workflows/production-deploy.yml`) that:

1. **Builds** the application on every push to `main`
2. **Tests** the build and runs security audits
3. **Verifies** all 93 routers are registered
4. **Deploys** to production automatically

### Manual Deployment

```bash
# Push to main branch to trigger CI/CD
git add .
git commit -m "Production deployment"
git push origin main

# Monitor deployment in GitHub Actions
# https://github.com/skylerblue4444/Upgrade-/actions
```

---

## 7. Auto-Healing System

The system includes an automatic router health monitoring and repair system that:

- Checks all 93 routers every 30 seconds
- Detects degraded or failed routers
- Automatically attempts repairs
- Logs all health events

### Access Auto-Healing API

```bash
# Get system health status
curl http://localhost:3000/api/trpc/autoHealing.getSystemHealth

# Check specific router
curl -X POST http://localhost:3000/api/trpc/autoHealing.checkRouterHealth \
  -H "Content-Type: application/json" \
  -d '{"routerName":"crypto"}'

# Manually repair router
curl -X POST http://localhost:3000/api/trpc/autoHealing.repairRouter \
  -H "Content-Type: application/json" \
  -d '{"routerName":"crypto"}'
```

---

## 8. Live Monitoring Dashboard

### Access Dashboard

```
http://localhost:3000/monitoring-dashboard.html
```

The dashboard displays:
- Real-time system health status
- All 93 router statuses
- Performance metrics
- Response time trends
- Auto-healing activity

### Prometheus Metrics

```
http://localhost:9090
```

### Grafana Dashboards

```
http://localhost:3001
```

Login with: `admin` / `admin`

---

## 9. Scaling & Load Balancing

### Horizontal Scaling with Docker Compose

```bash
# Scale to 3 instances
docker-compose -f docker-compose.prod.yml up -d --scale skycoin444=3

# Use nginx for load balancing
docker run -d -p 80:80 \
  -v ./nginx.conf:/etc/nginx/nginx.conf \
  nginx:latest
```

### Kubernetes Scaling

```bash
# Scale to 5 replicas
kubectl scale deployment skycoin444 --replicas=5 -n production

# Auto-scaling based on CPU
kubectl autoscale deployment skycoin444 --min=3 --max=10 --cpu-percent=80 -n production
```

---

## 10. Backup & Recovery

### Database Backup

```bash
# Backup MySQL database
mysqldump -u username -p database_name > backup.sql

# Restore from backup
mysql -u username -p database_name < backup.sql
```

### S3 Backup

```bash
# Backup S3 bucket
aws s3 sync s3://skycoin444-prod s3://skycoin444-backup-prod
```

---

## 11. Monitoring & Alerting

### Key Metrics to Monitor

- **API Response Time:** Target < 100ms
- **Router Health:** All 93 routers should be healthy
- **Error Rate:** Target < 0.1%
- **Memory Usage:** Should stay < 2GB
- **Database Connections:** Monitor pool usage
- **Uptime:** Target 99.9%

### Alert Rules

```yaml
# Prometheus alert rules
groups:
  - name: skycoin444
    rules:
    - alert: HighErrorRate
      expr: rate(errors_total[5m]) > 0.001
      for: 5m
      annotations:
        summary: "High error rate detected"
    
    - alert: RouterDown
      expr: router_status == 0
      for: 1m
      annotations:
        summary: "Router is down"
    
    - alert: HighMemoryUsage
      expr: memory_usage_bytes > 2e9
      for: 5m
      annotations:
        summary: "High memory usage"
```

---

## 12. Troubleshooting

### Server Won't Start

```bash
# Check logs
NODE_ENV=production npm start

# Verify port is available
lsof -i :3000

# Check environment variables
env | grep NODE_ENV
env | grep DATABASE_URL
```

### Database Connection Failed

```bash
# Test database connection
mysql -h db-host -u username -p database_name -e "SELECT 1;"

# Verify DATABASE_URL format
echo $DATABASE_URL
```

### Routers Not Responding

```bash
# Check auto-healing system
curl http://localhost:3000/api/trpc/autoHealing.getSystemHealth

# Run manual health check
curl -X POST http://localhost:3000/api/trpc/autoHealing.runHealthCheckCycle
```

### High Memory Usage

```bash
# Check memory usage
docker stats skycoin444

# Restart container
docker restart skycoin444

# Scale to multiple instances
docker-compose -f docker-compose.prod.yml up -d --scale skycoin444=3
```

---

## 13. Security Hardening

### SSL/TLS Configuration

```bash
# Generate self-signed certificate (development only)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Use Let's Encrypt (production)
# Configure with nginx or Kubernetes ingress
```

### Rate Limiting

```bash
# Configure in nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req zone=api burst=20 nodelay;
```

### CORS Configuration

```bash
# Configured in server/_core/index.ts
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));
```

---

## 14. Performance Optimization

### Caching Strategy

- Client-side: Service workers (14 versions)
- Server-side: Redis caching
- CDN: CloudFlare or AWS CloudFront

### Database Optimization

- Connection pooling (MySQL2)
- Query optimization
- Index management
- Regular VACUUM/ANALYZE

### Code Optimization

- Tree-shaking enabled
- Code splitting
- Minification
- Gzip compression (78% reduction)

---

## 15. Support & Documentation

### Key Resources

- **GitHub:** https://github.com/skylerblue4444/Upgrade-
- **Verification Report:** PRODUCTION_VERIFICATION_REPORT.md
- **API Documentation:** See tRPC router definitions
- **Monitoring:** http://localhost:3001 (Grafana)

### Getting Help

1. Check logs: `docker-compose logs -f`
2. Run health check: `/api/trpc/autoHealing.getSystemHealth`
3. Review PRODUCTION_VERIFICATION_REPORT.md
4. Check GitHub issues

---

## 16. Post-Deployment Verification

After deployment, verify:

```bash
# 1. Server is running
curl http://localhost:3000/

# 2. All routers are registered
curl http://localhost:3000/api/trpc/autoHealing.getSystemHealth

# 3. Database is connected
# Check logs for connection success

# 4. Monitoring is active
curl http://localhost:9090/-/healthy

# 5. Dashboard is accessible
curl http://localhost:3000/monitoring-dashboard.html
```

---

## Summary

SkyCoin444 v10 is production-ready with:

✅ Full CI/CD pipeline
✅ Auto-healing router system
✅ Live monitoring dashboard
✅ Docker & Kubernetes support
✅ Security hardening
✅ Scalability ready
✅ 93 integrated routers
✅ Comprehensive documentation

**Status: READY FOR PRODUCTION DEPLOYMENT** 🚀

