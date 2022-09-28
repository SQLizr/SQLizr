import { createRoot, Root } from 'react-dom/client';
import Main from './Main'

import '../public/styles.scss';
import '../public/signUp.scss';
import '../public/login.scss';


const rootElement: HTMLElement | null = document.getElementById('root');
if (!rootElement) throw new Error('Fail to get root element in index.ts');
const root: Root = createRoot(rootElement);

root.render(
  <Main />
);
