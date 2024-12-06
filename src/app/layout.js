
import DockDemo from "./components/dock";
import "./globals.css";

export const metadata = {
  title: "Portfolio | Sachin Parihar",
  description: "Sachin Parihar's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
        <div className="sticky bottom-5 left-0 w-full flex justify-center items-center">
        <DockDemo/>
      </div>
      </body>
    </html>
  );
}
