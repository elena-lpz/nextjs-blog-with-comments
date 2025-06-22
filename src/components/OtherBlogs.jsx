import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function OtherBlogs({ currentPostId }) {
  const query = await db.query(
    `SELECT * FROM posts WHERE id != $1 ORDER BY RANDOM() LIMIT 4`,
    [currentPostId]
  );
  const posts = query.rows;

  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl md:text-4xl font-semibold mb-3 md:mb-6">
        Continue reading...
      </h2>
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-text text-background ">
        {posts.map((post) => (
          <div key={post.id} className="md:w-1/4 flex flex-col">
            <img
              src={post.cover_img}
              alt={post.title}
              width={600}
              height={200}
              className="w-full h-[200px] object-cover mb-2"
            />
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-neutral-500 mb-2">
              {new Date(post.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <Link
              href={`/blog/${post.id}`}
              className="mt-auto w-fit rounded bg-neutral-900 text-white px-3 py-1 hover:bg-neutral-700"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
