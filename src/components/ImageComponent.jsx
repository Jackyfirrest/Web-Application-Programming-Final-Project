import React, { useState, useEffect } from "react";
import { usePollinationsImage } from "@pollinations/react";
import { Box, Typography } from "@mui/material";

const ImageComponent = ({ description, setLoading, onImageLoad }) => {
    const [loaded, setLoaded] = useState(false);
    const [dots, setDots] = useState("");
    
    const imageUrl = usePollinationsImage(description, {
        width: 150,
        height: 150,
        seed: 4,
        model: "flux",
        nologo: true,
    });

    const handleImageLoad = () => {
        setLoaded(true);
        setLoading(false);
        if (onImageLoad && imageUrl) {
            onImageLoad(imageUrl); // 傳遞 imageUrl 給父元件
        }
    };

    // 點點動畫
    useEffect(() => {
        if (!loaded) {
            const interval = setInterval(() => {
                setDots((prev) => (prev.length < 3 ? prev + "." : ""));
            }, 500);
            return () => clearInterval(interval);
        }
    }, [loaded]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: loaded ? "200px" : "40px",
                transition: "height 0.3s ease",
                background: loaded
                    ? "#f0f0f0"
                    : "linear-gradient(90deg, #e3f2fd, #e8f5e9)",
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            {!loaded && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "linear-gradient(to right, #42a5f5, #66bb6a)",
                            fontStyle: "italic",
                            fontSize: "14px",
                            fontWeight: "bold",
                            animation: "fade 1.5s infinite",
                            "@keyframes fade": {
                                "0%": { opacity: 0.5 },
                                "50%": { opacity: 1 },
                                "100%": { opacity: 0.5 },
                            },
                        }}
                    >
                        Generating{dots}
                    </Typography>
                </Box>
            )}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Generated image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: loaded ? "block" : "none",
                        borderRadius: "8px",
                    }}
                    onLoad={handleImageLoad}
                />
            )}
        </Box>
    );
};

export default ImageComponent;
