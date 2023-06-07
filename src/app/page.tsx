import { TodoItem } from "@/components/todoItem";
import prisma  from "@/db";
import Link from "next/link";

async function getTodos () {
  return prisma.todo.findMany();
}

async function toggleTodo(id:string, complete:boolean){
  "use server"
  console.log("Update Requested")
  await prisma.todo.update({where: {id:id} , data: {complete: complete}});
}


export default async function Home() {
  const todos = await getTodos();
  return (
    <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">
        To Dos
      </h1>
        <Link
        className="border border-slate-600 rounded px-2 py-1 hover:bg-slate-600 hover:text-slate-100 outline-none focus:outline-none"
        href="/new">New</Link>
    </header> 

     <ul className="pl-4">
       {todos.map((todo:any) => (
        // <li key={todo.id}>{todo.title}</li>
        <TodoItem key = {todo.id} {...todo} toggleTodo={toggleTodo}/>
       ))}

    </ul>
    </>
  );
}