import axios from "axios";
import { PostModel } from "../models/PostModel";
import { LoginResponseModel } from "../models/LoginResponseModel";
import { RegisterRequestModel } from "../models/RegisterRequestModel";
import { RegisterResponseModel } from "../models/RegisterResponseModel";
import { LoginRequestModel } from "../models/LoginRequestModel";

// Replace with the actual base URL of your API
const BASE_URL = "https://frontend-test-be.stage.thinkeasy.cz";

export const api = {

    /**
    * Register a new user.
    * @param data User signup details
    */
    authSignup: async (req: RegisterRequestModel) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/signup`, req);
            return response.data as RegisterResponseModel;
        } catch (error) {
            throw error;
        }
    },

    /**
    * Login user and return access and refresh tokens plus user details.
    * @param data Login info details
    */
    authLogin: async (loginModel: LoginRequestModel) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, loginModel);
            return response.data as LoginResponseModel;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Fetch all posts with Bearer token for authorization.
     * @param accessToken The user's access token for authorization
     */
    getPosts: async (accessToken: string): Promise<PostModel[]> => {
        try {
            const response = await axios.get(`${BASE_URL}/posts`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data; // Assuming response.data is an array of PostModel
        } catch (error) {
            throw error;
        }
    },

    /**
     * Create a new post.
     * @param data Post data to be created
     */
    async createPost(
        accessToken: string,
        post: { title: string; content: string }
    ): Promise<PostModel> {
        const response = await axios.post(`${BASE_URL}/posts`, post, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    },

    /**
     * Refresh tokens using the refreshToken.
    * @param refreshToken The refresh token to use
    * @returns New access and refresh tokens
    */
    refreshTokens: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
            return response.data; // Assuming response contains { accessToken, refreshToken }
        } catch (error) {
            throw error;
        }
    },

};
