"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";
import { loginSchema, type LoginFormData } from "../schema/auth";
import { SocialLoginButton } from "./social-login-button";
import { loginUser } from "@/features/auth/actions/auth";
import { Eye, EyeOff, AlertCircle, ArrowLeft, Chromium } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { logError } from "@/utils/logger";

const GmailIcon = () => <Chromium />;
const FacebookIcon = () => <SiFacebook />;

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (
    field: keyof LoginFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Clear API error
    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError("");

    try {
      // Validate form data
      const validatedData = loginSchema.parse(formData);

      // Call the actual login API
      const response = await loginUser({
        email: validatedData.email,
        password: validatedData.password,
      });

      // Check if 2FA is required
      if (response.requires2FA) {
        // TODO: Redirect to 2FA verification page
        setApiError("2FA verification required. This feature is coming soon.");
        return;
      }

      // Convert AuthUserData to User format for context
      const user = {
        id: response.user.id,
        email: response.user.email,
        name: `${response.user.firstName} ${response.user.lastName}`,
        role: response.user.role,
        avatar: null,
        balance: 0, // Will be fetched separately if needed
        createdAt: response.user.createdAt,
        updatedAt: response.user.updatedAt,
      };

      // Login user
      login(user);

      // Redirect based on user role
      const redirectPath =
        response.user.role === "freelancer"
          ? "/freelancer"
          : response.user.role === "client"
            ? "/client"
            : response.user.role === "admin"
              ? "/admin"
              : "/";

      router.push(redirectPath);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        // Handle validation errors
        const zodError = error as {
          errors?: Array<{ path: string[]; message: string }>;
        };
        const fieldErrors: Partial<LoginFormData> = {};

        zodError.errors?.forEach((err) => {
          if (err.path[0]) {
            const fieldName = err.path[0] as keyof LoginFormData;
            (fieldErrors as Record<string, string>)[fieldName] = err.message;
          }
        });

        setErrors(fieldErrors);
      } else {
        // Handle API errors
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.";
        setApiError(errorMessage);
        logError("Login error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Back to site link */}
      <div>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to site
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
        <p className="text-muted-foreground">
          Sign in to your JuanWorks account to continue.
        </p>
      </div>

      {/* API Error Alert */}
      {apiError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="juan.delacruz@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe || false}
              onCheckedChange={(checked) =>
                handleInputChange("rememberMe", checked as boolean)
              }
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm text-muted-foreground cursor-pointer font-normal"
            >
              Remember me
            </Label>
          </div>
          <div className="text-sm">
            <button
              type="button"
              className="font-medium text-primary hover:text-orange-600 transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground font-medium tracking-wider">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <SocialLoginButton
          provider="Google"
          icon={<GmailIcon />}
          className="transition-all duration-200 hover:shadow-sm"
        />
        <SocialLoginButton
          provider="Facebook"
          icon={<FacebookIcon />}
          className="transition-all duration-200 hover:shadow-sm"
        />
      </div>

      <div className="text-center space-y-4 pt-2">
        <p className="text-sm text-muted-foreground">
          Need an account?{" "}
          <button
            type="button"
            className="text-primary hover:text-orange-600 font-semibold transition-colors"
            onClick={() => router.push("/auth/signup")}
          >
            Join Us
          </button>
        </p>

        <p className="text-[10px] text-muted-foreground px-6 leading-relaxed">
          This site is protected by reCAPTCHA and the Google{" "}
          <button type="button" className="underline hover:text-foreground">
            Privacy Policy
          </button>{" "}
          and{" "}
          <button type="button" className="underline hover:text-foreground">
            Terms of Service
          </button>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}
