import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CONTRACT_ADDRESS = "0xc276ce57ecdb87d6123b4d968f329ebbd2b0b13c"; // Replace with your contract address

const SingleNFTView = () => {
  const { tokenId } = useParams();
  const [nft, setNft] = useState(null);

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const response = await fetch(`/data/metadata/${tokenId}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const nftData = await response.json();
        setNft(nftData);
      } catch (error) {
        console.error('Error fetching NFT data:', error);
      }
    };

    fetchNFTData();
  }, [tokenId]);

  if (!nft) return <div>Loading...</div>;

  const fndLink = `https://foundation.app/mint/eth/${CONTRACT_ADDRESS}/${tokenId}`;
  const raribleLink = `https://rarible.com/token/${CONTRACT_ADDRESS}:${tokenId}`;
  const manifoldLink = `https://gallery.manifold.xyz/${CONTRACT_ADDRESS}/${tokenId}`;

  // Assuming 'absolute' is the key where the full image path is stored
  const imagePath = nft.absolute;

  return (
    <div>
      <img src={imagePath} alt={nft.title} style={{ maxWidth: '300px' }} />
      <h1>{nft.title}</h1>
      {/* Other NFT details and properties */}
      <a href={fndLink}><img src='/fnd.webp' alt='Foundation' /></a>
      <a href={raribleLink}><img src='/rarible.webp' alt='Rarible' /></a>
      <a href={manifoldLink}><img src='/manifold.webp' alt='Manifold' /></a>
    </div>
  );
};

export default SingleNFTView;
