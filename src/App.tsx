import './App.css';
import { ThemeProvider } from './ThemeProvider';
import { GitRepositories } from './samples/git-repositories';

export const App = () => {
  <ThemeProvider>
    <GitRepositories></GitRepositories>
  </ThemeProvider>;
};
