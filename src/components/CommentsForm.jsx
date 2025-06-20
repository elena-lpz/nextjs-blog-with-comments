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
    <form action={handleSubmit} className=" w-[60%]">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        className="w-full border rounded p-2"
      />
      <label htmlFor="comment">Comment:</label>
      <textarea name="comment" rows={4} className="w-full border rounded p-2" />
      <button
        type="submit"
        className=" mt-2 rounded bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-700"
      >
        Save
      </button>
    </form>
  );
}
