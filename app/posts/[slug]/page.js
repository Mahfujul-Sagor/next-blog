import React from "react";
import Image from "next/image";
import post2 from "@/public/post2.webp"; // Placeholder image for recent posts
import Socialicons from "@/components/Socialicons"; // Component for social media icons
import SideMenuCat from "@/components/SideMenuCat"; // Component for side menu categories
import parse from "html-react-parser"; // Library for parsing HTML strings into React components
import noavatar from "@/public/no-avatar.png"; // Placeholder image for authors without a profile picture
import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import Link from "next/link";
import SinglePostSkeleton from "@/components/Skeletons/SinglePostSkeleton";
import PostMenu from "@/components/PostMenu";

// Function to fetch a single post by its slug
const getPost = async (slug) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/posts/${slug}` || `http://localhost:3000/api/posts/${slug}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post"); // Handle error if post fetching fails
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null if an error occurs
  }
};

const SinglePost = async ({ params }) => {
  const isAuthenticated = await checkIsAuthenticated(); // Check if the user is authenticated

  if (!isAuthenticated) {
    redirect("/auth/sign-in"); // Redirect to sign-in page if not authenticated
  }

  const { slug } = params; // Destructure the slug from the params
  const post = await getPost(slug); // Fetch the post data based on the slug

  if (!post) {
    return <div className="min-h-screen">Post not found</div>; // Display message if post is not found
  }

  return (
    <>
      {post ? (
        <div className="py-[70px] flex flex-col xl:flex-row justify-center gap-7">
          <div className="post w-full xl:max-w-[770px] flex flex-col gap-12">
            {post?.img && (
              <div className="rounded-lg relative">
                {/* Display post image */}
                <Image
                  src={post.img}
                  priority={true}
                  alt=""
                  width={400}
                  height={400}
                  className="min-h-full w-full object-cover rounded-lg"
                />{" "}
                <div className="absolute top-4 right-4">
                  <PostMenu id={post.id} />
                </div>
              </div>
            )}
            {/* Post title */}
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold">
              {post?.title}
            </h1>{" "}
            {post?.user && (
              <div className="flex flex-wrap gap-2 items-center sm:gap-4">
                <div className="text-gray-500 flex flex-wrap gap-2 sm:gap-4 items-center">
                  <div className="flex p-6 rounded-full border">
                    <Link href={`/authors/${post.user.id}`}>
                      <Image
                        src={post?.user?.image || noavatar}
                        alt={"Author Image"}
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                      />
                    </Link>{" "}
                    {/* Display author's profile picture */}
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <span className="text-sm sm:text-base capitalize">
                        <Link href={`/authors/${post.user.id}`}>{post?.user?.name}</Link>
                      </span>{" "}
                      {/* Author name */}
                    </div>
                    <div className="text-sm sm:text-base">|</div>
                    <div>
                      <span className="text-sm sm:text-base">
                        {post?.createdAt}
                      </span>{" "}
                      {/* Post creation date */}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="capitalize rounded-full px-3 py-1 border bg-teal-400/50">
                    {post?.catSlug}
                  </span>{" "}
                  {/* Post category */}
                </div>
              </div>
            )}
            <div className="w-full">
              <p>{post?.subtitle}</p>
            </div>
            <div className="post-desc flex gap-6 flex-col">
              {post.desc ? parse(post.desc) : "Description is not available"}{" "}
              {/* Parse and display post description */}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span>#{post?.catSlug}</span> {/* Post category as a hashtag */}
              </div>
              <div className="flex gap-2 items-center">
                <span>Share this:</span>
                <Socialicons
                  className="flex gap-2 items-center"
                  iconClass="text-2xl"
                />{" "}
                {/* Social media icons */}
              </div>
            </div>
            {post?.user && (
              <div className="flex flex-wrap xl:flex-nowrap gap-8 items-center">
                <div className="max-w-32 w-full min-h-32 flex items-center">
                  <Link href={`/authors/${post.user.id}`}>
                    <Image
                      src={post?.user?.image || noavatar}
                      alt=""
                      className="rounded-full object-cover"
                      width={120}
                      height={120}
                    />{" "}
                    {/* Link to author's profile */}
                  </Link>
                </div>
                <div className="max-w-[617px] w-full flex flex-col gap-2">
                  <h2 className="font-medium text-xl xl:text-2xl capitalize">
                    Author:{" "}
                    <Link href={`/authors/${post.user.id}`}>
                      {post.user.name}
                    </Link>
                  </h2>
                  {post?.user?.bio ? (
                    <p>{post.user.bio}</p>
                  ) : (
                    <p>This author has no bio available.</p> // Fallback if bio is not available
                  )}
                  <Socialicons className="flex items-center gap-4 text-2xl mt-2" />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-8 justify-start">
            <div className="side-menu max-w-[370px] rounded-lg border p-4 sm:p-8 lg:p-10 flex flex-col gap-8">
              <h2 className="capitalize text-2xl font-medium">Recent Posts</h2>{" "}
              {/* Recent posts section */}
              <div className="flex flex-col gap-8">
                {Array(3)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="small-post flex gap-6">
                      <div className="max-w-[70px] w-full min-h-full flex items-center">
                        <Image
                          src={post2}
                          alt=""
                          width={60}
                          height={60}
                          priority={true}
                          className="rounded-full object-cover w-full min-h-full"
                        />{" "}
                        {/* Placeholder recent post image */}
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="font-medium">
                          Culinary Expeditions: Tasting the ...
                        </h3>{" "}
                        {/* Recent post title */}
                        <div className="text-gray-500 flex gap-2 text-xs">
                          <span>Adrio Devid</span> {/* Recent post author */}
                          <span>|</span>
                          <span>Aug 24 2023</span> {/* Recent post date */}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <SideMenuCat /> {/* Categories in side menu */}
          </div>
        </div>
      ) : (
        <SinglePostSkeleton />
      )}
    </>
  );
};

export default SinglePost;
