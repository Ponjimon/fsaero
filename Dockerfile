# --- Build container ---
# Includes build tools required for native dependencies
FROM node:16-alpine as builder

WORKDIR /app

# Dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Build
COPY . ./
RUN yarn nx build api --prod

# --- Run container ---
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3333
CMD ["node", "dist/apps/api/main.js"]