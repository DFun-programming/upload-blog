import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import CallToAction from '../components/CallToAction';
// import CommentSection from '../components/CommentSection';
import PostCard from '../components/core/postPage/PostCard';
import {  getPostByLimit, getPostByPostSlug } from '../services/operations/postOperation';
import { useSelector } from 'react-redux';
import CommentSection from '../components/core/postPage/CommentSection';
import PageNotFound from './errors/PageNotFound';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [recentPosts, setRecentPosts] = useState(null);
  const {currentPost} = useSelector((state)=>state.post);
  const [post, setPost] = useState(currentPost);
  useEffect(() => {
   
      ( async () => {
        try {
          setLoading(true);
          const res = await getPostByPostSlug(postSlug);
          if (!res.success) {
            setError(true);
            setLoading(false);
            return;
          }
          if (res.success) {
            if(res.posts.length < 1)
            {
              setLoading(false)
              setError(true)
            }
           else{
            setPost(res.posts[0]);
            setLoading(false);
            setError(false);
           }
          }
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      })();
    
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await getPostByLimit(0,3);
        if (res.success) {
          setRecentPosts(res.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  
   if(error)
     return(
      <PageNotFound></PageNotFound>
    )
  
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 500).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
  
      <CommentSection postId={post._id} setPost={setPost}/>

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
