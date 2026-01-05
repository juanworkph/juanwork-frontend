"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";
import { loginSchema, type LoginFormData } from "../schema/login-schema";
import { SocialLoginButton } from "./social-login-button";
import { authService } from "@/services/auth.service";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { SiGmail, SiFacebook } from "react-icons/si";
import { Alert, AlertDescription } from "@/components/ui/alert";

const GmailIcon = () => <SiGmail />;
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

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
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
      const response = await authService.login({
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
        response.user.role === 'freelancer' ? '/freelancer' :
        response.user.role === 'client' ? '/client' :
        response.user.role === 'admin' ? '/admin' :
        '/';
      
      router.push(redirectPath);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        // Handle validation errors
        const zodError = error as { errors?: Array<{ path: string[]; message: string }> };
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
        const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
        setApiError(errorMessage);
        console.error("Login error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <SocialLoginButton
          provider="Gmail"
          icon={<GmailIcon />}
          className="transition-all duration-200 hover:shadow-md"
        />
        <SocialLoginButton
          provider="Facebook"
          icon={<FacebookIcon />}
          className="transition-all duration-200 hover:shadow-md"
        />
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      {/* API Error Alert */}
      {apiError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe || false}
              onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
            />
            <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
              Remember me
            </Label>
          </div>
          <button
            type="button"
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-medium transition-all duration-200 hover:shadow-md"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            This site is protected by reCAPTCHA and the{" "}
            <button type="button" className="text-primary hover:underline">
              Google Privacy Policy
            </button>{" "}
            and{" "}
            <button type="button" className="text-primary hover:underline">
              Terms of Service
            </button>{" "}
            apply.
          </p>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Need an account?{" "}
          <button
            type="button"
            className="text-primary hover:underline font-medium"
            onClick={() => router.push("/auth/signup")}
          >
            Join Us
          </button>
        </p>
      </div>
    </div>
  );
}
