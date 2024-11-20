import React from "react";
import { PostModel } from "../models/PostModel";
import { Box, Typography, Paper } from "@mui/material";

type PostListProps = {
  posts: PostModel[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {posts.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No posts available.
        </Typography>
      ) : (
        posts.map((post) => (
          <Paper
            key={post.id}
            sx={{ padding: 2, marginBottom: 2 }}
            elevation={3}
          >
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {post.content}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: "block", marginTop: 1 }}
            >
              Published: {post.published ? "Yes" : "No"} | Author:{" "}
              {post.authorId}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: "block" }}
            >
              Created At: {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default PostList;
