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

export default async function InstaFeed() {
  let instagramFeed = null;
  let error = null;

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.IG_TOKEN}`;
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error("Failed to fetch Instagram feed");
    }

    instagramFeed = await data.json();
  } catch (err: any) {
    console.error("Error fetching Instagram feed:", err.message);
    error = err.message;
  }

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}

      {instagramFeed && (
        <section className="w-full flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold">Instagram Feed:</h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {instagramFeed.data.map((post: InstagramPost) => (
              <div key={post.id} className="relative group w-full h-[300px]">
                <Link
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
                >
                  {post.media_type === "VIDEO" ? (
                    <video
                      src={post.media_url}
                      controls={false}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={post.media_url}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                      priority
                    />
                  )}

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex items-center justify-center p-4 w-full h-[300px]">
                    <p className="text-white text-center text-xs truncate">
                      {post.caption}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
