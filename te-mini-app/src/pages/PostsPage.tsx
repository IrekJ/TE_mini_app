import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { postsState } from "../state/postsState";
import { authState } from "../state/authState";
import { api } from "../lib/api";
import { jwtDecode } from "jwt-decode";
import PostList from "../components/PostList";
import NewPostForm from "../components/NewPostForm";

type TokenPayload = {
  exp: number;
};

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authorIdFilter, setAuthorIdFilter] = useState<string>("");

  const navigate = useNavigate();

  const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<TokenPayload>(token);
      return Date.now() >= exp * 1000;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true;
    }
  };

  const validateTokens = useCallback(async (): Promise<void> => {
    const { accessToken, refreshToken } = auth.tokens;

    if (!accessToken || !refreshToken) {
      navigate("/login");
      return;
    }

    if (isTokenExpired(accessToken)) {
      if (!isTokenExpired(refreshToken)) {
        try {
          const newTokens = await api.refreshTokens(refreshToken);
          setAuth((prevState) => ({
            ...prevState,
            tokens: {
              accessToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
            },
          }));
        } catch (error) {
          console.error("Failed to refresh tokens:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }
  }, [auth.tokens, navigate, setAuth]);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await validateTokens();

      const { accessToken } = auth.tokens;
      const fetchedPosts = await api.getPosts(accessToken);
      setPosts(fetchedPosts);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [auth.tokens, setPosts, validateTokens]);

  const createPost = useCallback(
    async (title: string, content: string) => {
      try {
        await validateTokens();

        const { accessToken } = auth.tokens;
        const newPost = await api.createPost(accessToken, { title, content });

        setPosts((prevPosts) => [newPost, ...prevPosts]);
      } catch (error) {
        console.error("Failed to create a post:", error);
        setError("Failed to create a post. Please try again later.");
      }
    },
    [auth.tokens, setPosts, validateTokens]
  );

  const filteredPosts = posts.filter((post) =>
    authorIdFilter ? post.authorId.includes(authorIdFilter) : true
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Box sx={{ padding: 2 }}>
      <NewPostForm onSubmit={createPost} />
      <Box sx={{ marginBottom: 4 }}>
        <TextField
          label="Filter by Author ID"
          variant="outlined"
          fullWidth
          value={authorIdFilter}
          onChange={(e) => setAuthorIdFilter(e.target.value)}
          placeholder="Enter author ID to filter posts"
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        Posts List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <PostList posts={filteredPosts} />
      )}
    </Box>
  );
};

export default PostsPage;
