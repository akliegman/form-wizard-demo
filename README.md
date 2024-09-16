# Form Wizard Demo

- [Form Wizard Demo](#form-wizard-demo)
  - [Getting Started](#getting-started)
  - [Notes](#notes)
  - [Future Optimization](#future-optimization)

Stack: NextJS, TypeScript, SCSS, React-Aria-Components, PostgreSQL, Vercel

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This file requires a `.env.local` file to be created in the root of the project. Contact @akliegman for the contents of this file.

## Notes

- This project uses TypeScript, with simple type definitions found in the `/lib/definitions` file.
- This project uses ESLint and Prettier for code linting and Prettier for formatting. I have configured these tools to work together in a way that is consistent with my personal style.
- This project uses SCSS modules for styling. This means that you can import SCSS files directly into your components and they will be scoped to that component. I chose this approach to exemplify my command over CSS and SCSS, but I am also comfortable using CSS-in-JS libraries (although I am a strong believer in the separation of concerns between styles and components).
- I used `react-aria-components` for simple out-of-the-box and accessible components, particularly for the DatePicker and the wizards. I would preferably use a component library that might have more out-of-the-box styling, like Material-UI or Chakra-UI, but I wanted to demonstrate my ability to style components from scratch.
- For the sake of simplicity and due to time constraints, I have not included any tests in this project. I am comfortable writing tests in Jest and React Testing Library, and I would be happy to add tests to this project if you would like to see them.
- I have used Vercel and PostgreSQL for the backend with simple SQL (located in `/lib/sql`) helpers to insert and update data. Normally, I would use a more robust typed approach, like Prisma, but I wanted to keep this project simple. I am comfortable with Prisma, TypeORM, and Sequelize, and I would be happy to use any of these tools in a production project.
- Data for this project is seeded at the `/seed` endpoint. This endpoint is not protected by any authentication.
- I have used NextJS's API routes to create a simple backend for this project (fetch library in `lib/api`), and used simple JWT authentication to store user session data. I am comfortable with more robust authentication strategies, like OAuth. This project has purpose-built endpoints, meaning that they are not necessarily RESTful for the sake of brevity.
- Due to time constraints and a fairly ambitious scope, I have not implemented a full user authentication system. I instead use the `/api/users/create` endpoint to create a user and store their session data in a cookie.
- I did not design a view for the completion of the wizard, since it was not specified in the prompt. I would be happy to add this view if you would like to see it.

## Future Optimization

- Test coverage
- More robust error handling
- Authentication and authorization
- Data validation outside of out-of-the-box form validation and type checking
- Further abstraction of styling and components into smaller and more reusable components
- More robust and complex SQL queries that normalize data in way that it doesn't need further hydration on the frontend
- Utilize NextJS's built-in server-side rendering in certain cases to improve performance, rather than relying strictly on client-side API calls
