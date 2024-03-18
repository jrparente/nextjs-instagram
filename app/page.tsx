import InstaFeed from "./_components/InstaFeed";

export default async function Home() {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-center gap-8 p-24">
      <h1 className="text-4xl font-bold text-center">
        How to Add Instagram Photos to Your NextJS Site
      </h1>
      <p className="text-center">
        Learn how to add Instagram photos to your NextJS site using the Official
        Instagram Basic Display API. You can read the full tutorial on{" "}
        <a
          href="https://www.medium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:no-underline hover:text-blue-700"
        >
          Medium
        </a>
        .
      </p>

      <InstaFeed />
    </main>
  );
}
