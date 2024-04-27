import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import styles from "./UserList.module.css";

type User = {
  id: number;
  name: string;
  email: string;
};

const UserList = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "Nathan@yesenia.net",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFullLoaded, setIsFullLoaded] = useState(false);

  const fetchUsers = async (firstLoad = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);
        setUsers(firstLoad ? data.slice(0, 3) : data.slice(3));
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  // Рендер первых трех пользователей
  useEffect(() => {
    fetchUsers(true);
  }, []);

  // Рендер остальных пользователей по клику
  const onLoadClick = () => {
    fetchUsers();
  };

  return (
    <div className={styles.wrapper}>
      <h1>Наши клиенты</h1>
      {isLoading && <LinearProgress />}
      <ul className={styles.userList}>
        {users.map((user: User) => (
          <li className={styles.userListItem} key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
      {!isFullLoaded && (
        <button
          onClick={() => {
            onLoadClick();
            setIsFullLoaded(true);
          }}
        >
          Загрузить еще
        </button>
      )}
    </div>
  );
};

export default UserList;
