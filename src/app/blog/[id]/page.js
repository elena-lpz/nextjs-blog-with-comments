import avatar1 from "@/../public/avatars/avatar1.png";
import { CommentForm } from "@/components/CommentsForm";
import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { revalidatePath } from "next/cache";

export default async function IdPage({ params }) {
  const slug = await params;
  const postId = slug.id;
  const post = (await db.query(`SELECT * FROM posts WHERE id = ${postId};`))
    .rows[0];

  //get the comments
  const commentQuery = await db.query(
    `SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC`,
    [postId]
  );
  const comments = commentQuery.rows;

  //delete comments
  async function deleteComment(commentId) {
    "use server";
    await db.query(`DELETE FROM comments WHERE id = $1`, [commentId]);
    revalidatePath(`/blog/${postId}`);
  }

  // https://dev.to/bhanufyi/understanding-on-delete-cascade-and-on-update-cascade-in-sql-foreign-key-relationships-70o
  // https://www.reddit.com/r/nextjs/comments/1c0ybvj/server_actions_deleting_from_db_any_wizards_out/

  return (
    <section className="my-4 mx-4 md:mx-15 md:my-6">
      <h1 className="text-4xl pb-6">{post.title}</h1>
      <img
        src={post.cover_img}
        alt="photo of a camera"
        width={600}
        height={200}
        className="w-full h-[400px] object-cover p-4 bg-text"
      />

      <div className="flex flex-col">
        <div className="flex justify-between pt-6">
          <h3 className="text-2xl">Content</h3>
          <div className="w-[60%]">
            <p className="text-xl font-light ">{post.content}</p>
            <div className="flex gap-2 mt-6">
              <img
                src={post.img_one}
                alt="photo of a camera"
                width={600}
                height={200}
                className="w-[15dvw] h-[15dvw] object-cover"
              />
              <img
                src={post.img_two}
                alt="photo of a camera"
                width={600}
                height={200}
                className="w-[15dvw] h-[15dvw] object-cover"
              />
              <img
                src={post.img_three}
                alt="photo of a camera"
                width={600}
                height={200}
                className="w-[15dvw] h-[15dvw] object-cover "
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <h3 className="text-2xl">Leave a comment:</h3>
          <CommentForm postId={postId} />
        </div>
        <div className="flex justify-between mt-6">
          <h3 className="text-2xl">Comments:</h3>
          <div className=" w-[60%] flex flex-col gap-6 mb-4">
            {comments.length > 0 ? (
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id} className="mb-6">
                    <div className="flex justify-between pb-4">
                      <div className="flex gap-4">
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
                          <p className="text-sm text-neutral-500">
                            {new Date(comment.created_at).toLocaleString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                      </div>

                      <form action={deleteComment.bind(null, comment.id)}>
                        <button>Delete</button>
                      </form>
                    </div>

                    <p>{comment.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
