import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"; // Wrapper we created earlier
import { ApiError } from "../utils/ApiError.js";         // Error handler we created earlier
import { Apires} from "../utils/Apires.js";   // Response handler we created earlier

// --- 1. REGISTER (To create a user first) ---
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Basic Validation
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({ 
        $or: [{ username }, { email }] 
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // Create User (Plain text password as requested)
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

// --- 2. LOGIN (The logic you asked for) ---
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // --- DIRECT STRING COMPARISON ---
    if (user.password !== password) {
        throw new ApiError(401, "Invalid user credentials"); // Wrong Password
    }

    // If we reach here, password matches!
    const loggedInUser = await User.findById(user._id).select("-password");

    return res
        .status(200)
        .json(
            new Apires(
                200, 
                {
                    user: loggedInUser,
                    // Frontend checks this flag to navigate
                    redirectTo: "/booking-service" 
                }, 
                "User logged In Successfully"
            )
        );
});

export { registerUser, loginUser };