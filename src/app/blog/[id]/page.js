import { db } from "@/utils/dbConnection";

export default async function IdPage({ params }) {
  const slug = await params;
  const post = (await db.query(`SELECT * FROM posts WHERE id = ${slug.id};`))
    .rows[0];

  return (
    <>
      <h1>This is the post page</h1>
      <h2>{post.title}</h2>
    </>
  );
}
