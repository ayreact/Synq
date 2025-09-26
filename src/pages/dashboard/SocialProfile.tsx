import React, { useState, useEffect } from 'react';
import CreatePostModal from '../../components/CreatePostModal';
import EditProfileModal from '../../components/EditProfileModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar as faCalendarRegular } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';

const CommentIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const RepostIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const LikeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ShareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6-4-4-4 4m4-4v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const AddIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const initialPosts = [
    {
        id: 1,
        time: '2m',
        content: 'just.minted the @alex.quai domain.....rate it 1-10!!',
        images: [],
        likes: 300,
        comments: 22,
        reposts: 150,
    },
    {
        id: 2,
        time: '3h',
        content: 'In 2019, this guy tricked 4 US companies into sending him $18M.\n\nThen he spent it on a Rolls Royce Cullinan, a Lamborghini Urus, and one Mercedes Benz G-Class AMG G55.\n\nFor months, he didn\'t get caught.\n\nUntil one tiny detail brought him down',
        images: [
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
            'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
        ],
        likes: 300,
        comments: 22,
        reposts: 150,
    },
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

const SocialProfile = () => {
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [posts, setPosts] = useState(initialPosts);
    const [activeTab, setActiveTab] = useState('Posts');

    // Directly use the data from the hook
    const currentUser = useCurrentUser();
    const navigate = useNavigate();

    const handleCreatePost = (content: string, imageUrl?: string) => {
        const newPost = {
            id: posts.length + 1,
            time: 'Just now',
            content,
            images: imageUrl ? [imageUrl] : [],
            likes: 0,
            comments: 0,
            reposts: 0,
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
        setIsCreatePostModalOpen(false);
    };

    const handleSaveProfile = (updatedProfile: {
        name: string;
        username: string;
        about: string;
        profileImg: string;
        coverImg: string;
    }) => {
        // In a real application, you would send this data to your backend/API.
        // For now, if currentUser is coming from a global state/context,
        // you'd typically dispatch an action to update that global state,
        // and the useCurrentUser hook would then reflect those changes.
        // You generally wouldn't update local state here if currentUser is the source of truth.
        // For demonstration, let's assume `useCurrentUser` would eventually reflect this update.
        console.log("Saving profile:", updatedProfile);
        setIsEditProfileModalOpen(false); // Close the modal after saving (or attempting to save)
        // If useCurrentUser is backed by context, you might dispatch an action here:
        // dispatch(updateUserAction(updatedProfile));
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

    return(
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 mt-[-20px]">
            <main className="flex flex-col gap-4 pr-6 lg:pr-0 relative">
                <div className="bg-black rounded-lg overflow-hidden relative">
                    {/* Cover Image section */}
                    <div className="h-28 bg-white rounded-t-lg overflow-hidden">
                        <img src={currentUser.coverImg} className="w-full h-auto transform translate-y-[-40%]" alt="Your Cover Image" />
                    </div>

                    {/* Profile + Buttons row */}
                    <div className="relative px-6 py-6">
                        {/* Avatar */}
                        <div className="absolute -top-10 left-6 w-20 h-20 rounded-full bg-purple-700 border-2 border-background shadow-md overflow-hidden">
                            <img src={currentUser.profileImg} className="w-auto h-full" alt="Your Profile Image" />
                        </div>

                        <div className="mt-6">
                            <h3 className="font-bold text-xl">{currentUser.name}</h3>
                            <p className="text-sm text-gray-400">{currentUser.username}</p>
                            <p className="text-sm mt-5">{currentUser.about}</p>
                            <p className="text-xs text-gray-400 mt-2"><FontAwesomeIcon icon={faCalendarRegular} className="text-white font-bold"/><span className="mx-1">{currentUser.date_joined}</span></p>
                            <div className="flex gap-3">
                                <p className="text-xs text-gray-400 mt-2"><span className="font-extrabold text-white">{currentUser.followers}</span><span className="mx-1">Followers</span></p>
                                <p className="text-xs text-gray-400 mt-2"><span className="font-extrabold text-white">{currentUser.following}</span><span className="mx-1">Following</span></p>
                            </div>

                        </div>
                        <button
                            className="bg-primary bg-opacity-20 border border-white absolute top-5 right-5 rounded-full py-1.5 px-4 text-sm"
                            onClick={() => setIsEditProfileModalOpen(true)}
                        >
                            <FontAwesomeIcon icon={faPen} className="text-xs mr-2" />
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* ... (tabs and posts rendering, using currentUser for profileImg and username) */}
                <div className="flex flex-col gap-px bg-gray-700 rounded-lg overflow-y-scroll scrollbar-hide">
                    {posts.map(post => (
                        <div className="flex gap-4 bg-black p-6 cursor-pointer" key={post.id} onClick={() => navigate(`/dashboard/post/${post.id}`)}>
                            <div className="w-12 h-12 rounded-full bg-gray-600 flex-shrink-0 overflow-hidden">
                                <img src={currentUser.profileImg} className="w-auto h-full" alt="Your Profile Image" />
                            </div>
                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-bold">{currentUser.username}</span>
                                    <span className="text-gray-400 text-sm">{post.time}</span>
                                </div>
                                <p className="leading-relaxed mb-4">{post.content}</p>
                                {/* ... (rest of post content) */}
                                {post.images.length > 0 && (
                                    <div className={`grid ${getImageGridClasses(post.images.length)} gap-2 rounded-xl overflow-hidden mb-4`}>
                                        {post.images.map((imageUrl, index) => (
                                            <img
                                                key={index}
                                                src={imageUrl}
                                                alt={`Post image ${index + 1}`}
                                                className={`w-full object-cover ${getImageHeightClass(post.images.length)}
                                                ${post.images.length === 3 && index === 0 ? 'h-[calc(2*52px+)]' : ''}
                                                `}
                                            />
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-6 text-gray-400">
                                    <button className="flex items-center gap-2 hover:text-red-500"><LikeIcon /> {post.likes}</button>
                                    <button className="flex items-center gap-2 hover:text-green-500"><RepostIcon /> {post.reposts}</button>
                                    <button className="flex items-center gap-2 hover:text-blue-500"><CommentIcon /> {post.comments}</button>
                                    <button className="flex items-center hover:text-blue-500"><ShareIcon /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <aside className="fixed top-4 right-5 h-[94vh]  w-[calc(100vw-1170px)] hidden lg:flex flex-col gap-6 overflow-y-auto h-full scrollbar-hide bg-black rounded-xl">
                {/* ... (leaderboard and trending remain the same) */}
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

            <div className="fixed bottom-6 right-12 flex flex-col-reverse items-center gap-4">
                <button className="w-14 h-14 rounded-full bg-gradient-to-r from-[#8B1E3F] to-[#6C3B9E] text-white flex items-center justify-center shadow-xl transition-transform duration-200 ease-in-out" onClick={() => { setIsCreatePostModalOpen(true)}}>
                    <AddIcon />
                </button>
            </div>

            {isCreatePostModalOpen && <CreatePostModal onClose={() => setIsCreatePostModalOpen(false)} onCreatePost={handleCreatePost} />}

            {isEditProfileModalOpen && (
                <EditProfileModal
                    onClose={() => setIsEditProfileModalOpen(false)}
                    // Pass the current user data to the edit modal
                    initialData={currentUser}
                    onSave={handleSaveProfile}
                />
            )}
        </div>
    );
}

export default SocialProfile;