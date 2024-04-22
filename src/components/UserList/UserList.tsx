import { useEffect, useState } from "react"
import { LinearProgress } from '@mui/material';
import styles from './UserList.module.css';

type User = {
  id: number;
  name: string;
  email: string;
};

const UserList = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net'
    }
  ])
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Рендер первых трех пользователей
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data: User[]) => {
        setUsers(data.slice(0, 3));
      });
  }, []);

  // Рендер остальных пользователей по клику
  const onLoadClick = () => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data: User[]) => {
        setTimeout(() => {
          setIsLoading(false);
          setUsers((prev) => [...prev, ...data.slice(3)])
        }, 2000);
      });
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
      {!isLoaded && <button onClick={() => { onLoadClick(); setIsLoaded(true)}}>Загрузить еще</button>}
    </div>
  )
}

export default UserList