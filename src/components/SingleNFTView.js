import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleNFTView = () => {
  const { tokenId } = useParams();
  const [nft, setNft] = useState(null);

  // Hardcoded contract address
  const CONTRACT_ADDRESS = "0xc276ce57ecdb87d6123b4d968f329ebbd2b0b13c";

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

  // Generate links with the hardcoded contract address and tokenId from the NFT metadata
  const foundationLink = `https://foundation.app/mint/eth/${CONTRACT_ADDRESS}/${tokenId}`;
  const raribleLink = `https://rarible.com/token/${CONTRACT_ADDRESS}:${tokenId}`;
  const manifoldLink = `https://gallery.manifold.xyz/${CONTRACT_ADDRESS}/${tokenId}`;

  return (
    <div className="nft-display">
      <h1 className="nft-title">{nft.title}</h1> {/* Make sure this is properly styled */}
      <img src={nft.image} alt={nft.title} />
      <p>{nft.description}</p>
      <div className="market-links">
        <a href={foundationLink}>Foundation</a>
        <a href={raribleLink}>Rarible</a>
        <a href={manifoldLink}>Manifold</a>
      </div>
      <div className="attributes">
        {nft.attributes.map((attr, index) => (
          <div key={index} className="attribute-item">
            <img src={`/traits/${attr.trait_type}.webp`} alt={attr.trait_type} />
            <span>{attr.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default SingleNFTView;
