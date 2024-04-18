import React, { useState, useEffect } from 'react';

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
          data.imageLoaded = false; // Flag to check if image has loaded
          loadedNFTs.push(data);
        } catch (error) {
          console.error(`Error fetching metadata for NFT #${i}:`, error);
        }
      }
      setNfts(loadedNFTs);
    };

    loadNFTs();
  }, []);

  const handleImageLoad = (nft) => {
    nft.imageLoaded = true;
    setNfts([...nfts]); // Trigger re-render by updating state
  };

  return (
    <div className="container">
      {nfts.map((nft, index) => (
        <div key={index} className="flipcard">
          <div className="flipcard-inner">
            <div className="front">
              {/* Ensure image loads before setting dimensions */}
              <img src={nft.image} alt={nft.title} onLoad={() => handleImageLoad(nft)} style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className="back">
              {nft.attributes.map((attr, attrIndex) => (
                <div key={attrIndex}>
                  <p>{`${attr.trait_type}: ${attr.value}`}</p>
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
