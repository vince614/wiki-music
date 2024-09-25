# Next.js Music App

## List of commands

### Prisma 

Prisma studio:
```
npx prisma studio
```

Create migration:
```
npx prisma migrate dev --name <migration-name>
```

Generate Prisma client:
```
npx prisma generate
```

### Next js

Lint code:
```
npm run lint
```

Run development server:
```
npm run dev
```

Build project:
```
npm run build
```


## Postgres

Connect to database postgres container:
```
docker exec -it db psql -U postgres
```

Show databases:
```
\l
```

Show schemas:
```
\dn
```
