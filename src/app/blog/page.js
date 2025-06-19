import LastPost from "@/components/LastPost";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function Blog() {
  const query = await db.query(`SELECT * FROM posts`);
  const posts = query.rows;
  console.log(posts);

  return (
    <>
      <h1 className="text-2xl">THIS IS A TITLE</h1>
      <LastPost />
      <div>
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
