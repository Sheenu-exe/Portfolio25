
import "./globals.css";

export const metadata = {
  title: "Portfolio | Sachin Parihar",
  description: "Sachin Parihar's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
