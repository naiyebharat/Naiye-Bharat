# ---------- Base ----------
FROM node:20-alpine AS base

# ---------- Dependencies ----------
FROM base AS deps
WORKDIR /app
COPY webapp/package*.json ./
RUN npm install

# ---------- Build ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY webapp .
RUN npm run build

# ---------- Run ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=7860
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy ONLY required files (standalone)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 7860

# ✅ CRITICAL LINE
CMD ["node", "server.js"]