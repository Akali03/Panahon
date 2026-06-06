import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../Context/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-muted transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
export default ThemeToggle;