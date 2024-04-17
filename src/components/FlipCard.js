import React, { useState, useEffect } from 'react';
import './FlipCard.css'; // Ensure this path is correct

function FlipCard() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const loadNFTs = async () => {
      let loadedNFTs = [];
      for (let i = 1; i <= 30; i++) {
        try {
          const response = await fetch(`/data/metadata/${i}.json`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          loadedNFTs.push(data);
        } catch (error) {
          console.error(`Error fetching metadata for NFT #${i}:`, error);
        }
      }
      setNfts(loadedNFTs);
    };

    loadNFTs();
  }, []);

  return (
    <div className="container">
      {nfts.map((nft, index) => (
        <div key={index} className="flipcard">
          <div className="flipcard-inner">
            <div className="front">
              <img src={nft.image} alt={nft.title} />
            </div>
            <div className="back">
              {nft.attributes.map((attr, attrIndex) => (
                <div key={attrIndex}>
                  <img src={`/traits/${attr.trait_type}.webp`} title={`${attr.trait_type}: ${attr.value}`} alt={attr.trait_type} />
                </div>
              ))}
              <button onClick={() => window.location.href = `/nft/${nft.token_id}`}>View NFT</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlipCard;
