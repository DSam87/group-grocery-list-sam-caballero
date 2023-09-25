import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Group Grocery List</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          A simple application for your family and roomates to create a insync
          grocery list!
          <br></br>Create a family/group ID and have other family or friends
          join in on the group list!
        </p>

        <br />
        <p>Owner: Sam Salvador Caballero</p>
      </main>
      <footer>
        <Link className="footer__link" to="/login">
          User Login
        </Link>
        <Link className="footer__link" to="/signup">
          Create New User
        </Link>
        <Link className="footer__link" to="/create-group">
          Create a family group ID
        </Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
