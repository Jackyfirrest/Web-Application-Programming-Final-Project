import React, { useState, useEffect } from "react";
import { usePollinationsImage } from "@pollinations/react";
import { Box, Typography } from "@mui/material";

const ImageComponent = ({ description, setLoading }) => {
    const imageUrl = usePollinationsImage(description, {
        width: 150,
        height: 150,
        seed: 4,
        model: "flux",
        nologo: true,
    });

    const [loaded, setLoaded] = useState(false);
    const [dots, setDots] = useState("");

    const handleImageLoad = () => {
        setLoaded(true);
        setLoading(false);
    };

    // 點點動畫
    useEffect(() => {
        if (!loaded) {
            const interval = setInterval(() => {
                setDots((prev) => (prev.length < 3 ? prev + "." : ""));
            }, 500); // 每500毫秒切換一次
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
                height: loaded ? "200px" : "40px", // 加載時高度為細橫框，完成後展開
                transition: "height 0.3s ease", // 平滑展開動畫
                background: loaded
                    ? "#f0f0f0"
                    : "linear-gradient(90deg, #e3f2fd, #e8f5e9)", // 漸變背景
                borderRadius: 2,
                position: "relative",
                overflow: "hidden", // 防止內容溢出
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



