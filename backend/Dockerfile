FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:20
WORKDIR /var/task
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build

CMD ["dist/lambda.handler"]