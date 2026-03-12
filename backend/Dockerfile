FROM --platform=linux/amd64 node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build
RUN ls -la dist/

EXPOSE 3001
CMD ["node", "dist/main.js"]