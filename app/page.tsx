import Image from "next/image";
import Link from "next/link";

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  timestamp: string;
  permalink: string;
}

export default async function Home() {
  let instagramFeed = null;
  let error = null;

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.INSTAGRAM_TOKEN}`;
    const data = await fetch(url);
    console.log("data", data);
    if (!data.ok) {
      throw new Error("Failed to fetch Instagram feed");
    }

    instagramFeed = await data.json();
    console.log("Instagram feed:", instagramFeed);
  } catch (err: any) {
    console.error("Error fetching Instagram feed:", err.message);
    error = err.message;
  }

  return (
    <main className="flex min-h-screen max-w-5xl mx-auto flex-col items-center gap-8 p-24">
      <h1 className="text-4xl font-bold text-center">
        How to Add Instagram Photos to Your NextJS Site
      </h1>
      <p className="text-center">
        Learn how to add Instagram photos to your NextJS site using the Official
        Instagram Basic Display API. You can read the full tutorial on{" "}
        <a
          href="https://www.medium.com"
          className="text-blue-500 underline hover:no-underline hover:text-blue-700"
        >
          Medium
        </a>
        .
      </p>
      {error && <p className="text-red-500">{error}</p>}
      {instagramFeed && (
        <section className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold">Instagram Feed:</h2>
          <div className="grid grid-cols-3 gap-4">
            {instagramFeed.data.map(
              (post: InstagramPost) =>
                post.media_type === "IMAGE" && (
                  <div key={post.id} className="relative group">
                    <Link
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative"
                    >
                      <Image
                        src={post.media_url}
                        alt={post.caption}
                        className="w-full h-auto"
                        width={300}
                        height={300}
                      />

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="text-white text-center">{post.caption}</p>
                      </div>
                    </Link>
                  </div>
                )
            )}
          </div>
        </section>
      )}
    </main>
  );
}
