import React from 'react';
import { useAccount } from 'wagmi';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';

const EthIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22.75L3.25 12L12 1.25L20.75 12L12 22.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 17.75V1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17.75L3.25 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17.75L20.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.25 12L12 22.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.75 12L12 22.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const CopyIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ShareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6-4-4-4 4m4-4v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const QNSProfile = () => {
  const currentUser = useCurrentUser();
    const navigate = useNavigate();

  const copyItem = async (item: string) => {
    try {
      await navigator.clipboard.writeText(item);
      console.log("Copied to clipboard:", item);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const ownership_records = [
    {
        id:1,
        manager:currentUser.name,
        owner_address:currentUser.short_address,
        expiry:'1 February, 2025',
        parent:'QNS'

    }
  ]

    return (
        <div>
          <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-space-grotesk text-5xl flex items-center gap-4 font-extrabold">
                    {currentUser.username}
                    <button className="text-text-secondary" onClick={() => copyItem(currentUser.username)}><CopyIcon /></button>
                </h1>
                <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg border border-border hover:bg-surface text-sm">
                    <ShareIcon />
                    Share
                </button>
            </div>
            {/*
            <nav className="qns-profile-nav">
              <NavLink to={`/qns/${qnsName}/profile`}>Profile</NavLink>
              <NavLink to={`/qns/${qnsName}/records`}>Records</NavLink>
              <NavLink to={`/qns/${qnsName}/ownership`}>Ownership</NavLink>
              <NavLink to={`/qns/${qnsName}/subnames`}>Subnames</NavLink>
            </nav>
            */}
          </div>
          <main className="min-h-[400px] mb-10">
            <div className="flex flex-col gap-6">
                <div className="bg-black rounded-lg overflow-hidden p-4">
                    {/* Banner section */}
                    <div className="h-52 bg-white rounded-t-lg overflow-hidden">
                        <img src={currentUser.coverImg} className="w-full h-auto transform translate-y-[-40%]" alt="Your Cover Image" />
                    </div>

                    {/* Profile + Buttons row */}
                    <div className="relative px-6 py-6">
                        {/* Avatar */}
                        <div className="absolute -top-20 left-6 w-36 h-36 rounded-full bg-purple-700 border-4 border-background shadow-md overflow-hidden">
                            <img src={currentUser.profileImg} className="w-auto h-full" alt="Your Profile Image" />
                        </div>

                        <div className="flex items-center justify-between mt-16">
                        {/* Left button */}
                        <button className="flex items-center gap-2 px-4 py-2 mx-3 bg-[#2a0e19] text-[#b64664] text-sm font-medium rounded-md hover:bg-[#3a1223]" onClick={() => navigate('/qns/namesearch')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.64z" />
                            </svg>
                            Extend
                        </button>
                        </div>
                    </div>
                </div>

                <div className=" gap-6 bg-black rounded-lg">
                    <div className="p-6">
                        <h3 className="text-xl mb-6">Addresses</h3>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="flex items-center gap-3 bg-surface p-3 rounded-lg font-mono ">
                                <EthIcon />
                                <span className="flex-grow">{currentUser.short_address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl mb-6">Ownership</h3>
                        {ownership_records.map(item => (
                        <div className="grid grid-cols-4 gap-4" key={item.id}>
                            <div className="text-text-secondary flex items-center bg-surface p-3 rounded-lg"><span>Manager:</span><span className="mr-2 text-white mx-2">{item.manager}</span></div>
                            <div className="text-text-secondary flex items-center bg-surface p-3 rounded-lg"><span>Owner:</span> <span className="mr-2 text-white mx-2">{item.owner_address}</span></div>
                            <div className="text-text-secondary flex items-center bg-surface p-3 rounded-lg"><span>Expiry:</span> <span className="mr-2 text-white mx-2">{item.expiry}</span></div>
                            <div className="text-text-secondary flex items-center bg-surface p-3 rounded-lg"><span>Parent:</span> <span className="mr-2 text-white mx-2">{item.parent}</span></div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
          </main>
        </div>
    );
};

export default QNSProfile;