# Next.js Music App

## List of commands

### Prisma 

Generate Prisma client:
```
npx prisma generate
```

Create migration:
```
npx prisma migrate dev --name <migration-name>
```

Apply migration:
```
npx prisma migrate deploy
```

Reset database:
```
npx prisma migrate reset
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
