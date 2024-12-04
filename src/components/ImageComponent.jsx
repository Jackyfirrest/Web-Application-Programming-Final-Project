import React, { useState, useEffect } from 'react';
import { usePollinationsImage } from "@pollinations/react";
import { Spin } from "antd";

const ImageComponent = ({ description, setLoading }) => {
    const imageUrl = usePollinationsImage(description, {
        width: 150,
        height: 150,
        seed: 4,
        model: "flux",
        nologo: true,
    });

    const [loaded, setLoaded] = useState(false);

    const handleImageLoad = () => {
        setLoaded(true);
        setLoading(false);
    };

    return (
        <div>
            {!loaded && <Spin tip="Loading"><div /></Spin>}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Generated image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: '8px',
                        display: loaded ? 'block' : 'none'
                    }}
                    onLoad={handleImageLoad}
                />
            )}
        </div>
    );
};

export default ImageComponent;