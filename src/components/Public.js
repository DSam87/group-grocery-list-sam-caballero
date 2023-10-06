import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="flex flex-col justify-between bg-emerald-900 p-5 h-screen md:w-[450px]">
      <header>
        <h1>
          Welcome to <span className="nowrap">Group Grocery List</span>
        </h1>
      </header>
      <main className="">
        <p>
          A simple application for your family and roomates to create a insync
          grocery list!
          <br />
          <br></br>Create a family/group ID and have other family or friends
          join in on the group list!
        </p>
      </main>
      <p>Owner: Sam Salvador Caballero</p>

      <footer className="flex flex-col gap-6 ">
        <Link
          className="flex justify-center items-center bg-white py-6 "
          to="/login"
        >
          <p className="text-black font-bold">User Login</p>
        </Link>
        <Link
          className="flex justify-center items-center bg-white py-6"
          to="/signup"
        >
          <p className="text-black font-bold">Create New User</p>
        </Link>
        <Link
          className="flex justify-center items-center bg-white py-6"
          to="/create-group"
        >
          <p className="text-black font-bold">Create Group and User</p>
        </Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
