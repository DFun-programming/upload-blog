import React, { useEffect, useState } from 'react'
import Hero from '../components/core/homapage/Hero'
import { getPostByLimit } from '../services/operations/postOperation';
import Article from '../components/core/homapage/Article';
import AuthorSection from '../components/core/homapage/AuthorSection';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showMore,setShowMore] = useState(true)
  useEffect(()=>{
    (async()=>{
      try {
        const fetchRecentPosts = async () => {
          const res = await getPostByLimit(0,6);
          if (res.success) {
            setPosts(res.posts);
            if(res.posts.length < 6)
            {
              setShowMore(false);
            }
          }
        };
        fetchRecentPosts();
      } catch (error) {
        console.log(error.message);
      } 
    })()
  },[])
  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await getPostByLimit(startIndex,startIndex+5);
     
      if (res.success) {
        setPosts((prev) => [...prev, ...res.posts]);
        if (res.posts.length < 6) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex flex-col w-full items-center lg:px-10 md:px-5 sm:px-2' >
      <Hero></Hero>
      <Article posts={posts} showMore={showMore} handleShowMore={handleShowMore}></Article>
      <AuthorSection></AuthorSection>
   
    </div>
  )
}

export default Home