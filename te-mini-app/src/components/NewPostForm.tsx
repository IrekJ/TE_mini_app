import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface NewPostFormProps {
  onSubmit: (title: string, content: string) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(title, content);
      setTitle("");
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create a New Post
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        required
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? "Submitting..." : "Create Post"}
      </Button>
    </Box>
  );
};

export default NewPostForm;
