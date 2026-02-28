"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";
import {
  signupSchema,
  type SignupFormData,
  type RegisterRequest,
} from "../schema/auth";
import { registerUser } from "@/features/auth/actions/auth";
import { User } from "@/types/user";
import { SocialLoginButton } from "./social-login-button";
import { Eye, EyeOff, ArrowLeft, CheckCircle2, Chromium } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { logError } from "@/utils/logger";

// Simple icons for social login
const GmailIcon = () => <Chromium />;
const FacebookIcon = () => <SiFacebook />;

export function ClientSignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
    sendHelpfulEmails: false,
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const [generalError, setGeneralError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (
    field: keyof SignupFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (generalError) {
      setGeneralError("");
    }
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError("");
    setSuccessMessage("");
    setErrors({});

    try {
      // HACK: Bypass confirmPassword UI requirement by auto-syncing password
      // The Zod schema requires confirmPassword to exist, but the new UI mockup removed it.
      const dataToValidate = {
        ...formData,
        confirmPassword: formData.password,
      };

      const validationResult = signupSchema.safeParse(dataToValidate);

      if (!validationResult.success) {
        const fieldErrors: Partial<SignupFormData> = {};
        validationResult.error.issues.forEach((err) => {
          if (err.path && err.path[0]) {
            const fieldName = err.path[0] as keyof SignupFormData;
            (fieldErrors as Record<string, string>)[fieldName] = err.message;
          }
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return;
      }

      const registerData: RegisterRequest = {
        firstName: validationResult.data.firstName,
        lastName: validationResult.data.lastName,
        email: validationResult.data.email,
        password: validationResult.data.password,
        role: "client",
      };

      const authResponse = await registerUser(registerData);

      setSuccessMessage(
        authResponse.message ||
          "Registration successful! Please check your email to verify your account.",
      );

      const firstName =
        authResponse.user.firstName ||
        (authResponse.user as any).first_name ||
        "";
      const lastName =
        authResponse.user.lastName ||
        (authResponse.user as any).last_name ||
        "";
      const name = `${firstName} ${lastName}`.trim() || "User";

      const user: User = {
        id: authResponse.user.id,
        email: authResponse.user.email,
        name,
        role: authResponse.user.role || "client",
        avatar: null,
        balance: 0,
        createdAt: authResponse.user.createdAt,
        updatedAt: authResponse.user.updatedAt,
      };

      login(user);

      setTimeout(() => {
        router.push("/client");
      }, 1500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = error.message;

        logError("Registration error:", {
          message: errorMessage,
          error: error,
        });

        if (errorMessage.includes("already exists")) {
          setErrors({ email: "An account with this email already exists" });
        } else if (
          errorMessage.toLowerCase().includes("password") &&
          (errorMessage.toLowerCase().includes("must") ||
            errorMessage.toLowerCase().includes("require") ||
            errorMessage.toLowerCase().includes("character") ||
            errorMessage.toLowerCase().includes("uppercase") ||
            errorMessage.toLowerCase().includes("lowercase") ||
            errorMessage.toLowerCase().includes("number"))
        ) {
          setErrors({ password: errorMessage });
        } else if (errorMessage.includes("Unable to connect")) {
          setGeneralError(
            "Unable to connect to server. Please check your internet connection.",
          );
        } else if (errorMessage.includes("Something went wrong")) {
          setGeneralError("Something went wrong. Please try again later.");
        } else if (
          errorMessage.toLowerCase().includes("email") ||
          errorMessage.toLowerCase().includes("first") ||
          errorMessage.toLowerCase().includes("last") ||
          errorMessage.toLowerCase().includes("name")
        ) {
          if (errorMessage.toLowerCase().includes("email")) {
            setErrors({ email: errorMessage });
          } else if (errorMessage.toLowerCase().includes("first")) {
            setErrors({ firstName: errorMessage });
          } else if (errorMessage.toLowerCase().includes("last")) {
            setErrors({ lastName: errorMessage });
          } else {
            setGeneralError(errorMessage);
          }
        } else {
          setGeneralError(errorMessage);
        }
      } else {
        logError("Unexpected error during client signup:", error);
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="mb-2">
        <Link
          href="/auth/signup"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Role Selection
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create your client account
        </h1>
        <p className="text-muted-foreground">
          Start hiring amazing talent today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {generalError && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{generalError}</p>
          </div>
        )}

        {successMessage && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-200">
              {successMessage}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={errors.password ? "border-destructive pr-10" : "pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="space-y-4 pt-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="pt-0.5">
              <Checkbox
                id="sendHelpfulEmails"
                checked={formData.sendHelpfulEmails || false}
                onCheckedChange={(checked) =>
                  handleInputChange("sendHelpfulEmails", checked as boolean)
                }
              />
            </div>
            <span className="text-sm text-muted-foreground leading-snug">
              Send me helpful emails to hire talent and platform updates.
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="pt-0.5">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeToTerms", checked as boolean)
                }
              />
            </div>
            <span className="text-sm text-muted-foreground leading-snug">
              Yes I understand and agree to the{" "}
              <Link
                href="/legal/terms"
                className="text-primary hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-sm text-destructive mt-1">
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-3.5 px-4 h-auto font-semibold rounded-md shadow-lg shadow-orange-950/20 transition-all active:scale-[0.99] mt-2 group relative overflow-hidden"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Client Account"}
        </Button>
      </form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-border-dark"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-slate-500 font-medium">
            Or continue with email
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SocialLoginButton
          provider="Google"
          icon={<GmailIcon />}
          className="transition-all duration-200 hover:bg-accent border border-slate-200 dark:border-border-dark rounded-lg"
        />
        <SocialLoginButton
          provider="Facebook"
          icon={<FacebookIcon />}
          className="transition-all duration-200 hover:bg-accent border border-slate-200 dark:border-border-dark rounded-lg"
        />
      </div>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4">
        Already have an account?{" "}
        <Link
          href="/auth"
          className="text-primary font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>

      <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 tracking-widest pt-4">
        Protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </div>
  );
}
