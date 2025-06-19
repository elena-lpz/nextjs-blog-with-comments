import { db } from "@/utils/dbConnection";

export default async function LastPost() {
  const query = await db.query(`SELECT * FROM posts ORDER BY ID DESC LIMIT 1`);
  const lastPost = query.rows[0];
  console.log(LastPost);

  return (
    <section className="px-6">
      <h1 className="text-xl">LATEST</h1>
      <div className="flex gap-4">
        <img
          src={lastPost.cover_img}
          alt="photo of a camera"
          width={600}
          height={200}
          placeholder="blur"
        />
        <div>
          <h2 className=""> {lastPost.title}</h2>
          <p> {lastPost.content}</p>
        </div>
      </div>
    </section>
  );
}
