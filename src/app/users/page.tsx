export const metadata = {
  title: 'User ',
}
export default function User() {
  return (
    <main className="w-full h-full flex">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          Welcome to <a className="text-blue-500" href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className="text-2xl">
          Get started by editing <code className="text-blue-500">user/page.tsx</code>
        </p>
      </div>
    </main>
  )
}
