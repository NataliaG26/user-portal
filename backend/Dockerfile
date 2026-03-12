FROM --platform=linux/amd64 node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
RUN npx nest build --webpack || npx tsc -p tsconfig.build.json --skipLibCheck || true
RUN ls -la /app/dist/

EXPOSE 3001
CMD ["node", "dist/main.js"]