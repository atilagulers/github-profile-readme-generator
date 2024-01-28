import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import {Session} from 'next-auth';

export const metadata = {
  title: 'Home | GitHub Profile Readme Generator',
  description: 'Generate your GitHub profile readme easily with this tool.',
};

type Props = {
  children: React.ReactNode;
  session: Session;
};

const RootLayout = ({children, session}: Props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Provider session={session}>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
