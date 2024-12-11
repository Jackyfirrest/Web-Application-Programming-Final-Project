import React, { useEffect, useRef } from "react";
import AvatarGenerator from "./AvatarGenerator";
import ImageComponent from "./ImageComponent";
import { Box, List, ListItem, Typography, Paper } from "@mui/material";

const ChatBox = ({ messages, characterImagePrompt, characterImageUrl, isBotTyping }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isBotTyping]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "calc(83vh - 200px)",
                background: "linear-gradient(to bottom, #FFC1CC, #FF9999)", // 粉色漸變背景
                padding: "20px", // 為背景邊緣提供空間
                borderRadius: 2, // 圓角邊框
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    flexGrow: 1,
                    overflowY: "auto",
                    backgroundColor: "rgba(255, 255, 255, 0.9)", // 半透明白色背景讓訊息框更突出
                    borderRadius: 2,
                }}
            >
                <List>
                    {messages.map((msg, index) => {
                        const showAvatar =
                            msg.sender === "bot" &&
                            (index === 0 || messages[index - 1].sender !== "bot");

                        return (
                            <ListItem
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                                    gap: 8,
                                    marginBottom: 2,
                                }}
                            >
                                {msg.sender === "bot" ? (
                                    showAvatar ? (
                                        characterImageUrl ? (
                                            <Box
                                                component="img"
                                                src={characterImageUrl}
                                                alt="Bot Avatar"
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                }}
                                            >
                                                <AvatarGenerator prompt={characterImagePrompt} />
                                            </Box>
                                        )
                                    ) : (
                                        <Box
                                            sx={{
                                                width: 50,
                                                height: 50,
                                            }}
                                        />
                                    )
                                ) : (
                                    <Box
                                        sx={{
                                            width: 50,
                                            height: 50,
                                        }}
                                    />
                                )}

                                <Box
                                    sx={{
                                        maxWidth: "60%",
                                        backgroundColor: msg.sender === "user" ? "#FFE4E1" : "#FFC0CB", // 不同訊息框的背景顏色
                                        padding: 1.5,
                                        borderRadius: 2,
                                        wordBreak: "break-word",
                                        textAlign: msg.sender === "user" ? "right" : "left",
                                        fontFamily: "'Noto Sans TC', sans-serif",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {msg.sender === "image" ? (
                                        <ImageComponent description={msg.text} />
                                    ) : (
                                        <Typography variant="body1" sx={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                                            {msg.text}
                                        </Typography>
                                    )}
                                </Box>
                            </ListItem>
                        );
                    })}

                    {isBotTyping && (
                        <ListItem
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 8,
                                marginBottom: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    marginLeft: "115px",
                                    maxWidth: "60%",
                                    backgroundColor: "#FFC0CB",
                                    padding: 1.5,
                                    borderRadius: 2,
                                    wordBreak: "break-word",
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    fontFamily: "'Noto Sans TC', sans-serif",
                                    fontSize: "1rem",
                                }}
                            >
                                {[...Array(3)].map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            backgroundColor: "gray",
                                            animation: `dot-flash 1.5s infinite`,
                                            animationDelay: `${i * 0.3}s`,
                                            "@keyframes dot-flash": {
                                                "0%": { opacity: 0.3, transform: "scale(1)" },
                                                "50%": { opacity: 1, transform: "scale(1.5)" },
                                                "100%": { opacity: 0.3, transform: "scale(1)" },
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </ListItem>
                    )}

                    <div ref={bottomRef} />
                </List>
            </Paper>
        </Box>
    );
};

export default ChatBox;










