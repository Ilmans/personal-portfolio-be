import { Article } from "@prisma/client";
import { db } from "./database";
import bcrypt from "bcrypt"

const article = `
Basically, using laravel pipelines you can pass an object between several classes in a fluid way to perform any type of task and finally return the resulting value once all the “tasks” have been executed.

Let's say you want to filter the user by their name, email or phone number. You may have a class that looks like this:
\`\`\`php
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return User::query()
            ->when(
                request()->has('name'),
                fn($query) => $query->where('name', 'REGEXP', $request->name)
            )
            ->get();
    }
}
\`\`\`
With the pipeline, you can do this:
\`\`\`php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Pipeline;
use Illuminate\Database\Eloquent\Builder;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $pipelines = [
            function (Builder $builder, \Closure $next) use ($request) {
                return $next($builder)->when(
                    $request->has('name'),
                    fn ($query) => $query->where('name', 'REGEXP', $request->name)
                );
            },
        ];

        return Pipeline::send(User::query())
            ->through($pipelines)
            ->thenReturn()
            ->get();
    }
}
\`\`\`
Maybe you want to add more filters, you can add more pipelines to the array. The pipeline will be executed in the order of the array. But, we can also use a class to handle the pipeline.
For example, I will make a folder called \`Filters\` in the \`App\` folder. Then, I will make a class called \`ByName\` in the \`Filters\` folder. The class will look like this:
\`\`\`php
namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ByName
{
    public function __construct(protected Request $request)
    {
        //
    }

    public function handle(Builder $builder, \Closure $next)
    {
        return $next($builder)->when(
            $this->request->has('name'),
            fn($query) => $query->where('name', 'REGEXP', $this->request->name)
        );
    }
}
\`\`\`
Then, I will make another class called \`ByEmail\` in the \`Filters\` folder. The class will look like this:
\`\`\`php
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ByEmail
{
    public function __construct(protected Request $request)
    {
        //
    }

    public function handle(Builder $builder, \Closure $next)
    {
        return $next($builder)->when(
            $this->request->has('email'),
            fn($query) => $query->where('email', 'REGEXP', $this->request->email)
        );
    }
}
\`\`\`
And now, I will change the \`UserController\` class to look like this:
\`\`\`php
use App\Filters\ByEmail;
use App\Filters\ByName;
use App\Models\User;
use Illuminate\Support\Facades\Pipeline;

class UserController extends Controller
{
    public function index()
    {
        return Pipeline::send(User::query())
            ->through([
                ByName::class,
                ByEmail::class,
            ])
            ->thenReturn()
            ->get();
    }
}
\`

That's it. I hope this article can help you. Thank you for reading.
`;


const createDummyArticles: () => void = async () => {
  //   await db.category.createMany({
  //     data: [
  //       {
  //         name: "Tutorial",
  //       },
  //       {
  //         name: "Programming",
  //       },
  //       {
  //         name: "Technology",
  //       },
  //     ],
  //   });

  const user = await db.user.create({
    data: {
      full_name: "Ilman S",
      username: "menzcreate",
      email: "Ilmansunannudin2@gmail.com",
      password: bcrypt.hashSync("tes123", 10),
    },
    select: {
      id: true,
    },
  });

  await db.article.createMany({
    data: [
      {
        title: "How to install Node js simply",
        categoryId: 1,
        slug: "how-to-install-node-js-simply",
        body: article,
        published: true,
        authorId: 1,
        createdAt: new Date().toISOString(),
      },
      {
        title: "The Basics of HTML and CSS",
        categoryId: 2,
        slug: "the-basics-of-html-and-css",
        body: article,
        published: true,
        authorId: 1,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Introduction to JavaScript",
        categoryId: 2,
        slug: "introduction-to-javascript",

        body: article,
        published: true,
        authorId: 1,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Python for Data Science",
        categoryId: 2,
        slug: "python-for-data-science",
        body: article,
        published: true,
        authorId: 1,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Getting Started with React",
        categoryId: 3,
        slug: "getting-started-with-react",
        body: article,
        published: true,
        authorId: 1,
        createdAt: new Date().toISOString(),
      },
    ],
  });
};

function string_to_slug(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

export { createDummyArticles, string_to_slug };
