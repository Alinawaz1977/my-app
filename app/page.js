import "./globals.css";
import AppContextProvider from "@/context/AppContext";

export const metadata = {
  title: "My Next.js App",
  description: "Using Context API with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
