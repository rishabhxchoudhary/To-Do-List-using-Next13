import prisma from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data:FormData) {
    "use server"
    const title = data.get("title")?.valueOf();
    if (typeof title !== "string"|| title.length === 0) {
        throw new Error("Title is required");
    }
    await prisma.todo.create({
        data: {
            title: title,
            complete: false
        }
    });
    redirect("/");
}

export default function Home() {
  return (
    <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">
        New
      </h1>
    </header> 

    <form action={createTodo} className="flex flex-col gap-2">
        <input type="text" name="title" className="border border-slate-300 bg-transparent rounded px-2 pg-1 outline-none focus-within:border-slate-100" />
        <div className="flex gap-1 justify-end">
            <Link href={"..."} className="border border-slate-600 rounded px-2 py-1 hover:bg-slate-600 hover:text-slate-100 outline-none focus:outline-none">Cancel</Link>
            <button type="submit"
            className="border border-slate-600 rounded px-2 py-1 hover:bg-slate-600 hover:text-slate-100 outline-none focus:outline-none"
            >Submit</button>
        </div>
    </form>

    </>
  );
}