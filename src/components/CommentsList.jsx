"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";
import avatar04 from "@/../public/avatars/avatar04.png";

export function CommentsList({ comments, deleteComment, updateComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  //prefilled comment
  const startEditing = (comment) => {
    setIsEditing(true);
    setCurrentComment(comment);
    setEditContent(comment.comment);
  };

  const stopEditing = () => {
    setIsEditing(false);
    setCurrentComment(null);
    setEditContent("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (currentComment) {
      await updateComment(currentComment.id, editContent);
      stopEditing();
    }
  };

  if (comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <ul className=" flex flex-col gap-6 mb-4">
      {comments.map((comment) => (
        <li key={comment.id} className="mb-6">
          <div className="flex justify-between pb-4">
            <div className="flex gap-4">
              <Image
                src={avatar04}
                alt="avatar"
                width={50}
                height={50}
                placeholder="blur"
              />
              <div>
                <p>
                  <strong>{comment.username}</strong> says...
                </p>
                <p className="text-sm text-neutral-500">
                  {new Date(comment.created_at).toLocaleString("en-GB")}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => startEditing(comment)}
                className="hover:cursor-pointer  hover:bg-neutral-700 p-2 rounded-4xl"
              >
                <IconEdit color="white" size={18} />
              </button>
              <form action={deleteComment.bind(null, comment.id)}>
                <button
                  type="submit"
                  className="hover:cursor-pointer  hover:bg-neutral-700 p-2 rounded-4xl "
                >
                  <IconTrash color="white" size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* shows the form when editing the correcponding id */}
          {isEditing && currentComment?.id === comment.id ? (
            <form
              onSubmit={(e) => handleUpdate(e)}
              className="flex flex-col gap-2"
            >
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="border rounded p-2"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="hover:cursor-pointer mt-2 rounded bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-700"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <p>{comment.comment}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
