import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';

// SVG Icons (re-used from SocialActivity)
const CommentIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const RepostIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const LikeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ShareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6-4-4-4 4m4-4v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowLeftIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

// Temporary Post Data (In a real app, this would come from an API call)
const allPosts = [
    { 
        id: '1', // Changed to string for useParams
        name: 'alice.quai', 
        time: '3h', 
        content: 'In 2019, this guy tricked 4 US companies into sending him $18M.\n\nThen he spent it on a Rolls Royce Cullinan, a Lamborghini Urus, and one Mercedes Benz G-Class AMG G55.\n\nFor months, he didn\'t get caught.\n\nUntil one tiny detail brought him down',
        images: [
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
        ],
        likes: 300,
        comments: 22,
        reposts: 150,
        profileImg: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=A' // Placeholder
    },
    { 
        id: '2', 
        name: 'alex.quai', 
        time: '2m', 
        content: 'just.minted the @alex.qns domain.....rate it 1-10!!',
        images: [
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
        ],
        likes: 300,
        comments: 22,
        reposts: 150,
        profileImg: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=X' // Placeholder
    },
    {
        id: '3',
        name: 'bob.quai',
        time: '1h',
        content: 'Loving these new views!',
        images: [
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
        ],
        likes: 50,
        comments: 5,
        reposts: 2,
        profileImg: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=B' // Placeholder
    },
    {
        id: '4',
        name: 'charlie.quai',
        time: '5m',
        content: 'A beautiful sunset.',
        images: [
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
        ],
        likes: 120,
        comments: 10,
        reposts: 8,
        profileImg: 'https://via.placeholder.com/150/FFFF00/000000?text=C' // Placeholder
    },
];

// Mock comments for the post (you would fetch these from an API)
const initialComments = [
    { id: 1, postId: '1', name: 'user1.quai', time: '2h', content: 'Wow, what a story!', profileImg: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=U1' },
    { id: 2, postId: '1', name: 'user2.quai', time: '1h', content: 'Need more details on that tiny detail!', profileImg: 'https://via.placeholder.com/150/00FFFF/000000?text=U2' },
    { id: 3, postId: '2', name: 'user3.quai', time: '1m', content: '9/10, awesome domain!', profileImg: 'https://via.placeholder.com/150/800000/FFFFFF?text=U3' },
];

const leaderboard = [
    { rank: 1, name: 'alice.quai', score: '300 posts' },
    { rank: 2, name: 'alice.quai', score: '300 posts' },
    { rank: 3, name: 'alice.quai', score: '300 posts' },
    { rank: 4, name: 'alice.quai', score: '300 posts' },
    { rank: 5, name: 'alice.quai', score: '300 posts' },
    { rank: 6, name: 'alice.quai', score: '300 posts' },
    { rank: 7, name: 'alice.quai', score: '300 posts' },
    { rank: 8, name: 'alice.quai', score: '300 posts' },
];

const trending = [
    { tag: '#quai', count: '50 posts' }, 
    { tag: '#qns.domain', count: '10 posts' },
    { tag: '@alice.quai', count: '8 mentions' }, 
    { tag: '#quai', count: '50 posts' },
];


const SocialPostDetail = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    const [post, setPost] = useState<typeof allPosts[0] | undefined>(undefined);
    const [comments, setComments] = useState<typeof initialComments>([]);
    const [newCommentText, setNewCommentText] = useState('');

    useEffect(() => {
        const foundPost = allPosts.find(p => p.id === postId);
        if (foundPost) {
            setPost(foundPost);
            // Also fetch comments related to this postId
            setComments(initialComments.filter(comment => comment.postId === postId));
        } else {
            // Handle post not found, e.g., redirect to 404 or home
            navigate('/dashboard/activity'); 
        }
    }, [postId, navigate]);

    const handleAddComment = () => {
        if (newCommentText.trim() && post) {
            const newComment = {
                id: comments.length + 1, // Simple ID generation
                postId: post.id,
                name: currentUser.username, // Use current user's name
                time: 'Just now',
                content: newCommentText.trim(),
                profileImg: currentUser.profileImg,
            };
            setComments(prevComments => [...prevComments, newComment]);
            setNewCommentText('');
            // In a real app, you would send this comment to your backend
        }
    };

    const getImageGridClasses = (imageCount: number) => {
        switch (imageCount) {
            case 1:
                return "grid-cols-1"; 
            case 2:
                return "grid-cols-2"; 
            case 3:
                return "grid-cols-2 grid-rows-2 [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-1"; 
            case 4:
                return "grid-cols-2 grid-rows-2"; 
            default:
                return "grid-cols-1"; 
        }
    };

    const getImageHeightClass = (imageCount: number) => {
        switch (imageCount) {
            case 1:
                return "h-80";
            case 2:
                return "h-52"; 
            case 3:
                return "h-52";
            case 4:
                return "h-52";
            default:
                return "h-52";
        }
    }

    if (!post) {
        return <div className="text-white text-center py-8">Loading post or post not found...</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 h-[calc(100vh-60px)] mt-[-20px]">
            <main className="flex flex-col gap-4 pr-6 lg:pr-0">
                {/* Back button and Post Title */}
                <div className="flex items-center gap-4 bg-black p-4 rounded-lg top-0 z-10">
                    <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
                        <ArrowLeftIcon />
                    </button>
                    <h2 className="text-xl font-bold">Post</h2>
                </div>

                {/* Main Post Content */}
                <div className="flex flex-col bg-black p-6 rounded-lg gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-600 flex-shrink-0 overflow-hidden"></div>
                        <div>
                            <span className="font-bold block">{post.name}</span>
                            <span className="text-gray-400 text-sm">{post.time}</span>
                        </div>
                    </div>
                    <p className="leading-relaxed whitespace-pre-line text-lg mb-4">{post.content}</p> {/* Use whitespace-pre-line to respect newlines */}
                    
                    {post.images.length > 0 && (
                        <div className={`grid ${getImageGridClasses(post.images.length)} gap-2 rounded-xl overflow-hidden mb-4`}>
                            {post.images.map((imageUrl, index) => (
                                <img 
                                    key={index} 
                                    src={imageUrl} 
                                    alt={`Post image ${index + 1}`} 
                                    className={`w-full object-cover ${getImageHeightClass(post.images.length)}`}
                                />
                            ))}
                        </div>
                    )}

                    <div className="flex justify-around border-y border-gray-700 py-3 text-gray-400 my-4">
                        <span className="flex items-center gap-1"><span className="font-bold text-white">{post.likes}</span> Likes</span>
                        <span className="flex items-center gap-1"><span className="font-bold text-white">{post.reposts}</span> Reposts</span>
                        <span className="flex items-center gap-1"><span className="font-bold text-white">{post.comments}</span> Comments</span>
                    </div>

                    <div className="flex justify-around text-gray-400">
                        <button className="flex items-center gap-2 hover:text-red-500 p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"><LikeIcon /> </button>
                        <button className="flex items-center gap-2 hover:text-green-500 p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"><RepostIcon /> </button>
                        <button className="flex items-center gap-2 hover:text-blue-500 p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"><CommentIcon /> </button>
                        <button className="flex items-center hover:text-blue-500 p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"><ShareIcon /></button>
                    </div>
                </div>

                {/* Comment Input */}
                <div className="flex items-start gap-4 bg-black p-4 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0 overflow-hidden mt-3">
                        <img src={currentUser.profileImg} className="w-auto h-full" alt="Your Profile" />
                    </div>
                    <div className="flex-grow flex flex-col relative">
                        <textarea
                            className="w-[87%] p-2 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none scrollbar-hide"
                            rows={2}
                            placeholder="Post your reply!"
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                        />
                        <div className="absolute top-3 right-2">
                            <button 
                                onClick={handleAddComment}
                                className="bg-gradient-to-r from-[#8B1E3F] to-[#6C3B9E] text-white py-2 px-5 rounded-full font-medium text-sm disabled:opacity-50"
                                disabled={!newCommentText.trim()}
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="flex flex-col gap-px bg-gray-700 rounded-lg overflow-hidden mb-4">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div className="flex gap-4 bg-black p-6" key={comment.id}>
                                <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0 overflow-hidden">
                                    <img src={comment.profileImg} className="w-auto h-full" alt={`${comment.name}'s profile`} />
                                </div>
                                <div className="w-full">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold">{comment.name}</span>
                                        <span className="text-gray-400 text-sm">{comment.time}</span>
                                    </div>
                                    <p className="leading-relaxed text-gray-300">{comment.content}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-black p-6 text-center text-gray-500">No comments yet. Be the first to reply!</div>
                    )}
                </div>

            </main>
            
            <aside className="fixed top-4 right-5 h-[94vh]  w-[calc(100vw-1170px)] hidden lg:flex flex-col gap-6 overflow-y-auto h-full scrollbar-hide bg-black rounded-xl">
                {/* Leaderboard and Trending (unchanged) */}
                <div className="p-6">
                    <h4 className="text-xl mb-6">User Leaderboard</h4>
                    <ul className="list-none">
                        {leaderboard.map((user, i) => (
                            <li key={i} className="flex items-center gap-3 mb-4 last:mb-0">
                                <span className="text-[#BE8200] font-bold w-4 text-sm">#{user.rank}</span>
                                <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                                <span className="flex-grow">{user.name}</span>
                                <span className="text-primary font-medium text-sm">{user.score}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end gap-4 mt-6 text-sm">
                        <button className="text-gray-400 hover:text-white">&lt; Next</button>
                        <button className="text-gray-400 hover:text-white">Prev &gt;</button>
                    </div>
                </div>

                <div className="p-6">
                    <h4 className="text-xl mb-6">Trending</h4>
                    <ul className="list-none border border-gray-700 rounded-xl p-6">
                        {trending.map((item, i) => (
                            <li key={i} className="flex justify-between mb-4 last:mb-0">
                                <span className="font-medium">{item.tag}</span>
                                <span className="text-gray-400">{item.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default SocialPostDetail;