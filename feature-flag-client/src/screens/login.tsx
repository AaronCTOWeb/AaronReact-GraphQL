import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PageLayout } from '../components/page-layout';

export const LoginScreen = () => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      history.push('/dashboard')
    }
  }

  return (
    <PageLayout className="login">
      <h1>Welcome back 👋</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username</label>
        <input 
          id="username"
          type="text" 
          name="username"
          value={username} 
          onChange={event => setUsername(event.target.value)} 
        />
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          name="password"
          value={password} 
          onChange={event => setPassword(event.target.value)} 
        />
        <button type="submit">Log in</button>
      </form>
    </PageLayout>
  );
}