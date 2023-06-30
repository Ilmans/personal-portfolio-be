import { Article } from "@prisma/client";
import { db } from "./database";
import bcrypt from "bcrypt"
const article: string = `
  composer require laravel/socialite

  Set up the OAuth application with your provider of choice. This will typically involve registering your application with the provider and obtaining the necessary credentials (client ID, client secret, etc.).

  Configure the provider credentials in your .env file. Add the following lines to your .env file, replacing the placeholders with your actual credentials:

  FACEBOOK_CLIENT_ID=your-facebook-client-id
  FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
  FACEBOOK_REDIRECT_URI=your-facebook-redirect-uri

  In your Laravel application, create a route that will redirect the user to the OAuth provider's authentication page. For example:

  Route::get('/auth/facebook', function () {
      return Socialite::driver('facebook')->redirect();
  });
`;

const createDummyArticles: () => void = async () => {
  // await db.category.createMany({
  //   data: [
  //     {
  //       name: "Tutorial",
  //     },
  //     {
  //       name: "Programming",
  //     },
  //     {
  //       name: "Technology",
  //     },
  //   ],
  // });

  // const user = await db.user.create({
  //   data: {
  //     full_name: "Ilman S",
  //     username: "menzcreate",
  //     email: "Ilmansunannudin2@gmail.com",
  //     password: bcrypt.hashSync("tes123", 10),
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  await db.article.createMany({
    data: [
      {
        title: "How to install Node js simply",
        slug: "how-to-install-node-js-simply",
        body: article,
        published: true,
        authorId: 5,
        createdAt: new Date().toISOString(),
      },
       {
      title: "The Basics of HTML and CSS",
      slug: "the-basics-of-html-and-css",
      body: article,
      published: true,
      authorId: 5,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Introduction to JavaScript",
      slug: "introduction-to-javascript",
      body: article,
      published: true,
      authorId: 5,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Python for Data Science",
      slug: "python-for-data-science",
      body: article,
      published: true,
      authorId: 5,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Getting Started with React",
      slug: "getting-started-with-react",
      body: article,
      published: true,
      authorId: 5,
      createdAt: new Date().toISOString(),
    },
  

    ],
  });


  const articles  = await db.article.findMany();

  ( articles).map(async (article) => {
      await db.articleCategory.createMany({
        data : [
            {
              articleId : article.id,
              categoryId : 16,
            },
            {
              articleId : article.id,
              categoryId : 17,
            },
            {
              articleId : article.id,
              categoryId : 18,
            },
        ]
      })
  })


};

export  {
  createDummyArticles
}
