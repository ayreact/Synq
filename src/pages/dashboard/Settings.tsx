import React from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';

// SVG Icons
const ProfileIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const OtherIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevronDownIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;


const Settings = () => {
  const { address } = useAccount();

  return (
    <div className="min-h-screen text-gray-200 py-1"> {/* Added basic dark mode background and text color */}
      <h1 className="text-4xl font-extrabold font-space-grotesk mb-8 text-white">Settings</h1> {/* Adjusted font size and color */}
      <div className="flex flex-col gap-8 mx-auto"> {/* Centered and added max-width to container */}
        <div className="border border-gray-700 rounded-lg p-5 px-7"> {/* Darker background, border, rounded corners, shadow */}
          <div className="flex items-center gap-3 mb-6 text-white"> {/* Header styling, gap, margin-bottom */}
            <ProfileIcon className="w-7 h-7" /> {/* SVG size */}
            <h2 className="text-xl font-space-grotesk font-bold">Profile and Identity</h2> {/* Header text size and font */}
          </div>
          <div className="flex flex-col gap-6"> {/* Padding-left, flex column, gap */}
            <div className="pb-6 border-b border-gray-700"> {/* Border-bottom */}
              <Link to="/dashboard/profile" className="">
                <p className="text-gray-400 cursor-pointer py-2 hover:text-white transition-colors duration-200 text-sm">Edit Profile</p>
                <p className="text-gray-400 cursor-pointer py-2 hover:text-white transition-colors duration-200 text-sm">Change profile photo</p>
                <p className="text-gray-400 cursor-pointer py-2 hover:text-white transition-colors duration-200 text-sm">Change cover photo</p>
                <p className="text-gray-400 cursor-pointer py-2 hover:text-white transition-colors duration-200 text-sm">Edit Bio</p>
              </Link>
            </div>
            <div className="pb-6 border-b border-gray-700"> {/* Border-bottom */}
              <h3 className="font-medium text-white font-manrope mb-2">Linked Wallet</h3>
              <p className="text-gray-400 text-sm">{address}</p>
            </div>
            <div className="">
              <h3 className="font-medium text-white font-manrope mb-2">Username/Domain Management</h3>
              <p className="text-gray-400 text-sm">alice.qns</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-700 rounded-lg p-5 px-7"> {/* Darker background, border, rounded corners, shadow */}
          <div className="flex items-center gap-3 mb-6 text-white"> {/* Header styling, gap, margin-bottom */}
            <OtherIcon className="w-7 h-7" /> {/* SVG size */}
            <h2 className="text-xl font-space-grotesk font-bold">Other</h2>
          </div>
          <div className="flex flex-col gap-6"> {/* Padding-left, flex column, gap */}
            <div className="pb-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-white font-manrope">Default Network</h3>
              <div className="relative inline-block w-72">
                <select
                  className="w-full appearance-none px-4 py-3 bg-black rounded-lg text-white text-sm cursor-pointer"
                  defaultValue="quai"
                >
                  <option value="quai" className="bg-transparent">Quai</option>
                  <option value="ethereum">Ethereum</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <ChevronDownIcon />
                </div>
            </div>
            </div>
             <div className=""> {/* Last section no bottom border */}
              <h3 className="font-medium text-white font-manrope">Help and Support</h3>
               <p className="text-gray-400 cursor-pointer py-2 hover:text-white transition-colors duration-200 text-sm">Report a Bug</p>
               <p className="text-gray-400 cursor-pointer py-2 hover:text-white transition-colors duration-200 text-sm">Contact Support</p>
               <p className="text-gray-400 cursor-pointer py-2 hover:text-white transition-colors duration-200 text-sm">Terms of Service/Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;