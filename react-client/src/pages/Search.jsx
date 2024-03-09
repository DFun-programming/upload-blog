import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostBySearchParam } from '../services/operations/postOperation';
import PostCard from '../components/core/postPage/PostCard';
import { categories } from '../assets/data/categories';


export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    // Extracting search parameters from the current URL
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    // Updating the sidebar data state if any of the parameters are present in the URL
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData, // Preserve existing sidebar data
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    // Asynchronously fetching posts based on the search parameters
    const fetchPosts = async () => {
      setLoading(true); // Indicates that a fetch operation is in progress
      const searchQuery = urlParams.toString(); // Constructing the search query string
      const res = await getPostBySearchParam(searchQuery); // Fetching posts using the constructed query
      
      // Handling the response from the fetch operation
      if (!res.success) {
        setLoading(false); // Reset loading state if the fetch was unsuccessful
        return; // Exit early if there was an error
      }
      if (res.success) {
        // Updating the posts state with the fetched posts
        setPosts(res.posts);
        setLoading(false); // Reset loading state as the fetch operation is complete
        
        // Determining whether to display the "Show More" button based on the number of fetched posts
        if (res.posts.length === 9) {
          setShowMore(true); // Display the "Show More" button if there are more than 9 posts
        } else {
          setShowMore(false); // Hide the "Show More" button if there are 9 or fewer posts
        }
      }
    };

    fetchPosts(); // Initiating the post-fetching process

  }, [location.search]); // Re-run this effect whenever the location.search parameter changes


  const handleChange = (e) => {
    setSidebarData((prev)=>(
      {
        ...prev,
        [e.target.id]:e.target.value
      }
    ))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    // Determine the number of posts currently fetched
    const numberOfPosts = posts.length;

    // Calculate the starting index for the next set of posts to fetch
    const startIndex = numberOfPosts;

    // Construct the URL search parameters with the updated starting index
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    // Fetch posts based on the updated search query
    const res = await getPostBySearchParam(searchQuery);

    // Handle fetch response
    if (!res.success) {
      return; // Exit early if the fetch was unsuccessful
    }
    if (res.success) {
      // Update the posts state with the newly fetched posts
      setPosts([...posts, ...res.posts]);

      // Determine whether to display the "Show More" button based on the number of newly fetched posts
      if (res.posts.length === 9) {
        setShowMore(true); // Display the "Show More" button if there are more posts to fetch
      } else {
        setShowMore(false); // Hide the "Show More" button if there are no more posts to fetch
      }
    }
};

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
           {
              categories.map((category)=>(
                <option key={category.id} value={category.title.toLowerCase()}>{category.id === 0? "Select a Category":category.title}</option>
              ))
            }
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Posts results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
