import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"; 
import { ApiError } from "../utils/ApiError.js";         
import { Apires} from "../utils/Apires.js";   

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields (username, email, password) are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({ 
        $or: [{ username }, { email }] 
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // Create User
    const user = await User.create({
        username,
        email,
        password 
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new Apires(200, createdUser, "User registered Successfully")
    );
});

// --- 2. LOGIN ---
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // [FIXED] Basic validation for Login
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Verify Password
    if (user.password !== password) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const loggedInUser = await User.findById(user._id).select("-password");

    return res
        .status(200)
        .json(
            new Apires(
                200, 
                {
                    user: loggedInUser,
                    redirectTo: "/booking-service" 
                }, 
                "User logged In Successfully"
            )
        );
});

export { registerUser, loginUser };