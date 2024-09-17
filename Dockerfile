FROM node:22.8.0 AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build


FROM node:22.8.0-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/main.js"]
