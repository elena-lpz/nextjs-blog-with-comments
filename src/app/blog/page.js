import LastPost from "@/components/LastPost";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function Blog({ searchParams }) {
  const query = await db.query(`SELECT * FROM posts`);
  const posts = query.rows;
  //   console.log(posts);

  //sorting data by id
  const sort = searchParams?.sort || "asc";

  if (sort === "asc") {
    posts.sort((a, b) => a.id - b.id);
  } else if (sort === "desc") {
    posts.sort((a, b) => b.id - a.id);
  }

  //https://stackoverflow.com/questions/23661115/sort-a-list-by-id-by-using-javascript
  //https://www.timsanteford.com/posts/client-side-sorting-with-server-side-search-parameters-in-next-js-14/

  return (
    <>
      <h1 className="text-2xl">THIS IS A TITLE</h1>
      <LastPost />
      <div>
        <Link href="/blog?sort=asc">Older first</Link> -{" "}
        <Link href="/blog?sort=desc">Newer first</Link>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <Link href={`/blog/${post.id}`}>Read more</Link>
          </div>
        ))}
      </div>
    </>
  );
}
