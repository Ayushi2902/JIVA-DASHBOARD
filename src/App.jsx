import { useEffect } from 'react';
import AppRouter from './routes/index.jsx';
import { useThemeStore } from './store/index.js';

export default function App() {
  const { dark } = useThemeStore();
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);
  return <AppRouter />;
}
