import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextAuthProvider as AuthProvider } from "./providers";
import Toaster from "@/components/toaster";
import { Raleway } from "next/font/google";
import SideBar from "@/components/sidebar/SideBar";
import { getSession } from "@/services/user";
const lato = Raleway({
  subsets: ["latin"],
});



export const metadata = {
  title: "Dota 2 1x1",
  description: "Dota 2 1x1 web app",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen justify-between overflow-hidden text-sm  bg-gray-50 ${lato.className}`}
      >
        <AuthProvider session={session}>
          <Header />
          <Toaster />
          <main className="w-full md:p-4 mt-[52px]">
            <section
              className="
                  flex 
                  flex-row 
                  w-full
                  md:w-[80%]  
                  md:mx-auto 
                  "
            >
              {session?.user && (
                <div
                  className="
                hidden
                md:flex
                    w-[200px] 
                    max-h-[262px]
                    "
                >
                  <SideBar />
                </div>
              )}
              <div
                className="flex 
                  flex-col  
                  w-full 
                  border-gray-100 
                  md:rounded-xl 
                  border-[1px]
                  overflow-y-scroll
                  bg-white
                  mr-0
                  p-4
                  scrollbar scrollbar-thumb-gray-400 scrollbar-medium scrollbar-white
                  "
              >
                {children}
              </div>
            </section>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
