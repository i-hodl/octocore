import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleNFTView = () => {
  const { tokenId } = useParams();
  const [nft, setNft] = useState(null);
  const [contractAddress, setContractAddress] = useState('');

  useEffect(() => {
    // Fetch the contract address
    const fetchContractAddress = async () => {
      try {
        const response = await fetch('/data/contract.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContractAddress(data.address);
      } catch (error) {
        console.error('Error fetching contract address:', error);
      }
    };

    // Fetch the NFT data
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

    fetchContractAddress();
    fetchNFTData();
  }, [tokenId]);

  if (!nft || !contractAddress) return <div>Loading...</div>;

  const foundationLink = `https://foundation.app/mint/eth/${contractAddress}/${tokenId}`;
  const raribleLink = `https://rarible.com/token/${contractAddress}:${tokenId}`;
  const manifoldLink = `https://gallery.manifold.xyz/${contractAddress}/${tokenId}`;

  return (
    <div className="nft-display">
      <img src={nft.image} alt={nft.title} />
      <h1>{nft.title}</h1>
      <p>{nft.description}</p>
      <div>
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
