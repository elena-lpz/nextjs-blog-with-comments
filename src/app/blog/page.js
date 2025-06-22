import LastPost from "@/components/LastPost";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import blogtitle from "@/../public/titles/blogtitle.svg";
import { IconArrowDown, IconArrowUp, IconArrowdown } from "@tabler/icons-react";

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
    <section className="my-4 mx-4 lg:mx-15 md:my-6">
      <Image src={blogtitle} alt="about section title" className="pb-6" />
      <LastPost />
      <div className="mt-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-4xl text-heading pb-6">All articles</h2>
          <div className="flex gap-1 md:gap-4 mb-4 justify-center items-center">
            <p className="font-semibold">Sort:</p>
            <Link
              href="/blog?sort=asc"
              className="text-heading hover:underline"
            >
              <IconArrowUp size={18} />
            </Link>
            <Link
              href="/blog?sort=desc"
              className="text-heading hover:underline"
            >
              <IconArrowDown size={18} />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex gap-4 items-center border border-neutral-700 p-4 hover:bg-neutral-900 transition-transform duration-600"
            >
              <Image
                src={post.cover_img}
                alt="Photography cover"
                width={1200}
                height={600}
                className="w-[30dvw] h-[30dvh] md:w-[200px] md:h-[200px] object-cover"
              />
              <div>
                <h3 className="text-lg md:text-2xl font-semibold mt-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 py-2">
                  {new Date(post.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

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
