import { useEffect, useState } from 'react';

interface User {
  displayName: string;
  emails: { value: string }[];
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/auth/user', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message !== 'Not authenticated') {
          setUser(data);
        } else {
          // Redirect to login if not authenticated
          window.location.href = '/';
        }
      })
      .catch((error) => console.error('Error fetching user:', error));
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user ? (
        <div>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.emails[0].value}</p>
          <button onClick={() => window.location.href = 'http://localhost:5001/api/auth/logout'}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
