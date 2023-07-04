
Front End : `https://github.com`
### Getting Started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Setup database connection in .env file
```bash
DATABASE_URL="mysql://{username}:{password}@localhost:3306/{database}"
```
and run the migrate to create table
```bash
npx prisma migrate dev
```

Next, run the development server:

```bash
npm start
```

Finally, open `http://localhost:3120` in your browser to view the website.


