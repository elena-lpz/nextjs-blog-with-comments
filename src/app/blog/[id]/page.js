import avatar1 from "@/../public/avatars/avatar1.png";
import { CommentForm } from "@/components/CommentsForm";
import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { CommentsList } from "@/components/CommentsList";
import { redirect } from "next/navigation";

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
  //if if no post/id redirect to blog
  if (!post) {
    redirect("/blog");
  }

  //delete comments
  async function deleteComment(commentId) {
    "use server";
    await db.query(`DELETE FROM comments WHERE id = $1`, [commentId]);
    revalidatePath(`/blog/${postId}`);
  }

  // https://dev.to/bhanufyi/understanding-on-delete-cascade-and-on-update-cascade-in-sql-foreign-key-relationships-70o
  // https://www.reddit.com/r/nextjs/comments/1c0ybvj/server_actions_deleting_from_db_any_wizards_out/

  //update comments
  async function updateComment(commentId, newText) {
    "use server";
    await db.query(`UPDATE comments SET comment = $1 WHERE id = $2`, [
      newText,
      commentId,
    ]);
    revalidatePath(`/blog/${postId}`);
  }

  return (
    <section className="my-4 mx-4 md:mx-15 md:my-6">
      <h1 className=" text-4xl md:text-6xl pb-6">{post.title}</h1>
      <Image
        src={post.cover_img}
        alt="cover photo"
        width={1200}
        height={500}
        className="w-full h-[400px] object-cover p-4 bg-text"
      />

      <div className="flex my-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between pt-3 md:pt-6">
          <h3 className="text-xl pb-4 font-semibold md:text-2xl">Content</h3>
          <div className="md:w-[60%]">
            <p className="text-xl font-light ">{post.content}</p>
            <div className="flex flex-col md:flex-row gap-2 my-8 items-center justify-center">
              <Image
                src={post.img_one}
                alt="Photography 1"
                width={600}
                height={600}
                className="md:w-[18dvw] md:h-[18dvw] object-cover"
              />
              <Image
                src={post.img_two}
                alt="Photography 2"
                width={600}
                height={600}
                className="md:w-[18dvw] md:h-[18dvw] object-cover"
              />
              <Image
                src={post.img_three}
                alt="Photography 3"
                width={600}
                height={600}
                className="md:w-[18dvw] md:h-[18dvw] object-cover "
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-10">
          <h3 className="text-xl font-semibold md:text-2xl">
            Leave a comment:
          </h3>
          <CommentForm postId={postId} />
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-10">
          <h3 className="text-xl font-semibold md:text-2xl">Comments:</h3>
          <div className="md:w-[60%] flex flex-col gap-6 mb-4 mt-4">
            <CommentsList
              comments={comments}
              postId={postId}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
