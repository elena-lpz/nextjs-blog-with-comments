import LastPost from "@/components/LastPost";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import blogtitle from "@/../public/titles/blogtitle.svg";

export default async function Blog({ searchParams }) {
  // nextjs error kindly reminded me searchParams needs to be awaited, so fixed it, I think? Error is not there anymore and everything seems to work fine

  const query = await searchParams;
  const response = await db.query(`SELECT * FROM posts`);
  const posts = response.rows;
  //   console.log(posts);

  //sorting data by id
  const sort = query?.sort || "asc";

  if (sort === "asc") {
    posts.sort((a, b) => a.id - b.id);
  } else if (sort === "desc") {
    posts.sort((a, b) => b.id - a.id);
  }

  //https://stackoverflow.com/questions/23661115/sort-a-list-by-id-by-using-javascript
  //https://www.timsanteford.com/posts/client-side-sorting-with-server-side-search-parameters-in-next-js-14/

  return (
    <section className="my-4 mx-4 md:mx-15 md:my-6">
      <Image src={blogtitle} alt="about section title" className="pb-6" />
      <LastPost />
      <div className="mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-4xl text-heading pb-6">All articles</h2>
          <div className="flex gap-1 md:gap-4 mb-4">
            <p className="font-semibold">Sort by:</p>
            <Link href="/blog?sort=asc">Oldest to Newest</Link>
            <Link href="/blog?sort=desc">Newest to Oldest</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex gap-4 items-center border border-neutral-700 p-4 hover:bg-neutral-900 transition-transform duration-600"
            >
              <img
                src={post.cover_img}
                alt="photo of a camera"
                width={200}
                height={200}
                className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover"
              />
              <div>
                <h3 className="text-md md:text-lg font-semibold mt-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="h-[50px] overflow-hidden">{post.content}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="mt-2 inline-block text-heading hover:underline"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
