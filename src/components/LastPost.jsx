import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function LastPost() {
  const query = await db.query(`SELECT * FROM posts ORDER BY ID DESC LIMIT 1`);
  const lastPost = query.rows[0];
  // console.log(LastPost);

  return (
    <section>
      <div className="flex flex-col md:flex-row p-6 bg-text text-background gap-6">
        <div className="md:w-3/5">
          <img
            src={lastPost.cover_img}
            alt="photo of a camera"
            width={600}
            height={200}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="md:w-2/5 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold pb-1"> {lastPost.title}</h3>
          <p className="text-neutral-500 mb-6">
            {new Date(lastPost.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="h-[150px] w-[90%] overflow-hidden">
            {" "}
            {lastPost.content}
          </p>
          <Link
            href={`/blog/${lastPost.id}`}
            className=" w-fit mt-6 rounded bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-700"
          >
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
}
