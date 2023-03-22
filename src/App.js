import { useState, useEffect } from 'react';
import { SearchBar } from './components/searchbar/SearchBar';
import { UserInfo } from './components/userinfo/UserInfo';
import './App.css';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
  }, [user])

  return (
    <div className="wrap">
      <h1>Search user</h1>
      <div className="search">
        <SearchBar setUser={setUser} />
      </div>
      <UserInfo user={user} />
    </div>
  );
}

export default App;
