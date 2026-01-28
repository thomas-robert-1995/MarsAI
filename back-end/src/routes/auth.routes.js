import { Router } from "express";
import { body } from "express-validator";
import {
  register,
  login,
  getProfile,
  sendInvitation,
  getPendingInvitations,
  deleteInvitation,
  verifyInvitation,
  acceptInvitation,
} from "../controllers/auth.controller.js";
import { googleAuth } from "../controllers/googleAuth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

// Validation rules
const registerValidation = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("name").trim().notEmpty().withMessage("Full name is required"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const inviteValidation = [
  body("email").isEmail().withMessage("Email invalide").normalizeEmail(),
  body("role_id").isInt({ min: 1, max: 3 }).withMessage("Role invalide"),
];

const acceptInviteValidation = [
  body("name").trim().notEmpty().withMessage("Nom requis"),
  body("password").isLength({ min: 6 }).withMessage("Mot de passe minimum 6 caracteres"),
];

// ============ PUBLIC ROUTES ============

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/google", googleAuth);

// Invitation verification (public)
router.get("/invite/:token", verifyInvitation);
router.post("/invite/:token/accept", acceptInviteValidation, acceptInvitation);

// ============ PROTECTED ROUTES ============

router.get("/profile", authenticateToken, getProfile);

// ============ ADMIN ROUTES ============

router.post("/invite", authenticateToken, authorize([2]), inviteValidation, sendInvitation);
router.get("/invitations", authenticateToken, authorize([2]), getPendingInvitations);
router.delete("/invitations/:id", authenticateToken, authorize([2]), deleteInvitation);

export default router;
