import avatar1 from "@/../public/avatars/avatar1.png";
import { db } from "@/utils/dbConnection";
import Image from "next/image";

export default async function IdPage({ params }) {
  const slug = await params;
  const post = (await db.query(`SELECT * FROM posts WHERE id = ${slug.id};`))
    .rows[0];

  //get the comments
  const commentQuery = await db.query(
    `SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC`,
    [slug.id]
  );
  const comments = commentQuery.rows;

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h2 className="mt-6">Comments:</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <Image
                src={avatar1}
                alt="illustration"
                width={50}
                height={50}
                placeholder="blur"
              />
              <div>
                <p>
                  <strong>{comment.username}</strong> says...
                </p>
                <p>({new Date(comment.created_at).toLocaleString("en-GB")})</p>
              </div>
              <p>{comment.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}
    </>
  );
}
