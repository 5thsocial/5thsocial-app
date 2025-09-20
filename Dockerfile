FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm i -g pnpm@9 || true && (pnpm i || npm i)
COPY . .
RUN pnpm build || npm run build
ENV PORT=3000
CMD ["node","dist/main.js"]
