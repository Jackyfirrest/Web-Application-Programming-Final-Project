// AvatarGenerator.jsx
import React from "react";
import { usePollinationsImage } from "@pollinations/react";

const AvatarGenerator = ({ prompt }) => {
    const imageUrl = usePollinationsImage(prompt, {
        width: 1024,
        height: 1024,
        seed: 4,
        model: "flux",
        nologo: true,
    });

    return (
        <div>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Avatar"
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AvatarGenerator;
