import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

export function CommentForm({ postId }) {
  async function handleSubmit(formData) {
    "use server";
    console.log("Saving post to the database...");

    const username = formData.get("username");
    const comment = formData.get("comment");

    await db.query(
      `INSERT INTO comments (username, comment, post_id) VALUES ($1, $2, $3)`,
      [username, comment, postId]
    );
    console.log("Comment saved!");
    revalidatePath(`/blog/${postId}`);
  }

  return (
    <form action={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" />
      <label htmlFor="comment">Comment:</label>
      <textarea name="comment" rows={4} />
      <button type="submit">Save</button>
    </form>
  );
}
