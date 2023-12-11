import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

interface IUser {
  readonly user_id: string;
  user_name: string;
  user_password: string;
}

const TestDB = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  // const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [usernameCo, setUsernameCo] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCo, setPasswordCo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageCo, setErrorMessageCo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user_id = uuidv4();

    setErrorMessage("");
    const user: IUser = {
      user_id: user_id,
      user_name: username,
      user_password: password,
    };
    console.log(user);
    try {
      const res = await axios.post("http://localhost:8081/users", user);
      console.log(res.data);
      if (res.data.errno === 1062) {
        setErrorMessage("Username already taken, please try another one");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessageCo("");
    console.log("usernameCo", usernameCo);
    console.log("passwordCo", passwordCo);

    try {
      const users: IUser[] = await axios
        .get("http://localhost:8081/users")
        .then((users) => users.data);
      users.some((user) => {
        console.log("user_name", user.user_name === usernameCo);
        if (usernameCo === user.user_name) {
          if (passwordCo === user.user_password) {
            console.log("oui oui baguette");
            navigate("/chat");
          } else {
            setErrorMessageCo("Wrong combinaison of password and username");
            return;
          }
        } else {
          console.log("non non baguette");
          setErrorMessageCo("Account does not exist");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8081/books");
        setBooks(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllBooks();
  }, []);
  return (
    <div>
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      <p>Inscription</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Submit</button>
      </form>
      {errorMessageCo ? <p style={{ color: "red" }}>{errorMessageCo}</p> : null}
      <p>Connexion</p>
      <form onSubmit={handleConnexion}>
        <label htmlFor="usernameCo">UsernameCo</label>
        <input
          type="text"
          id="usernameCo"
          onChange={(e) => setUsernameCo(e.target.value)}
          value={usernameCo}
        />
        <label htmlFor="passwordCo">PasswordCo</label>
        <input
          type="text"
          id="passwordCo"
          onChange={(e) => setPasswordCo(e.target.value)}
          value={passwordCo}
        />
        <button>Submit</button>
      </form>
      <h1>Books</h1>
      <div className="books">
        {books.map(
          (book: {
            title_book: string;
            desc_book: string;
            cover_book: string;
          }) => {
            return (
              <div className="book" key={book.title_book}>
                {book.cover_book ? <img src={book.cover_book} alt="" /> : null}
                <h2>{book.title_book}</h2>
                <p>{book.desc_book}</p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default TestDB;
