// src/hooks/useCurrentUser.ts
import { useAccount } from 'wagmi';

const shortenAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
};

export const useCurrentUser = () => {
  const { address } = useAccount();

  return {
    address,
    short_address: shortenAddress(address),
    name: 'Alice Turner',
    username: 'alice.quai',
    profileImg: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
    coverImg: 'https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg',
    about: 'Techie | Coding | Content Writing ✰ Turning ideas into code ✰',
    date_joined: 'Joined 3 months ago',
    followers: '500',
    following: '200',
  };
};
