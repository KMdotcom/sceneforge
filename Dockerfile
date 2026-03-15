FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx tsc --skipLibCheck --outDir dist --esModuleInterop true --resolveJsonModule true --module commonjs --target es2020 server/index.ts server/lib/supabase.ts server/lib/memory.ts server/lib/sandbox.ts 2>/dev/null || true

EXPOSE 3001

CMD ["node", "dist/server/index.js"]
