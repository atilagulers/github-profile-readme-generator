import '@styles/globals.css';
import Nav from '@components/Nav';

export const metadata = {
  title: 'Home | GitHub Profile Readme Generator',
  description: 'Generate your GitHub profile readme easily with this tool.',
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({children}: Props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
