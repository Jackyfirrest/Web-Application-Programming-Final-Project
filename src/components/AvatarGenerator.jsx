import React from "react";
import { usePollinationsImage } from "@pollinations/react";
import { Spin } from "antd";
import { useState, useEffect } from "react";

const AvatarGenerator = ({ prompt }) => {
    const contentStyle = {
        padding: 5,
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 4,
    };

    const content = <div style={contentStyle} />;

    const [imageUrl, setImageUrl] = useState(null);

    const image = usePollinationsImage(prompt, {
        width: 1024,
        height: 1024,
        seed: 4,
        model: "flux",
        nologo: true,
    });

    useEffect(() => {
        setImageUrl(image);
    }, [image]);

    return (
        <div>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Avatar"
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                />
            ) : (
                <Spin tip="Loading"><div/></Spin>
            )}
        </div>
    );
};

export default AvatarGenerator;