import React from 'react'

import { Link } from 'react-router-dom'
import PostCard from '../postPage/PostCard'

const Article = ({posts ,showMore,handleShowMore}) => {
  return (
    <div className='max-w-6x mx-auto p-3 flex flex-col gap-8 py-7 items-center '>
    {posts && posts.length > 0 && (
      <div className='flex flex-col gap-6 items-center '>
        <h2 className='text-4xl font-semibold text-center font-serif text-slate-800'>Recent Posts</h2>
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        {
            showMore && <button
          className='text-lg text-slate-800 bg-gradient-to-br from-blue-400 to-green-400 px-3 py-2 w-fit   hover:bg-gradient-to-tl rounded-lg   text-center '
            onClick={handleShowMore}
        >
          Show more
        </button>}
      </div>
    )}
  </div>
  )
}

export default Article