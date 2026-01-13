/**
 * Error Retry Card Component
 * 
 * Displays error messages with specific recovery actions based on error type.
 * Provides retry buttons and alternative actions for different error scenarios.
 */

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  RefreshCw,
  WifiOff,
  Clock,
  ServerCrash,
  Lock,
  FileQuestion,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { NetworkErrorType, classifyNetworkError } from "@/lib/network-utils";

interface ErrorRetryCardProps {
  /**
   * Error object or error message
   */
  error: any | string;
  
  /**
   * Context for the error (e.g., "loading project data")
   */
  context?: string;
  
  /**
   * Callback when retry button is clicked
   */
  onRetry?: () => void | Promise<void>;
  
  /**
   * Callback when back button is clicked
   */
  onBack?: () => void;
  
  /**
   * Whether retry is in progress
   */
  isRetrying?: boolean;
  
  /**
   * Custom title for the card
   */
  title?: string;
  
  /**
   * Show back button
   */
  showBackButton?: boolean;
  
  /**
   * Show refresh page button
   */
  showRefreshButton?: boolean;
  
  /**
   * Custom className for the card
   */
  className?: string;
}

export const ErrorRetryCard: React.FC<ErrorRetryCardProps> = ({
  error,
  context = "loading data",
  onRetry,
  onBack,
  isRetrying: externalIsRetrying,
  title,
  showBackButton = true,
  showRefreshButton = true,
  className = "",
}) => {
  const [internalIsRetrying, setInternalIsRetrying] = useState(false);
  
  // Use external or internal retry state
  const isRetrying = externalIsRetrying ?? internalIsRetrying;
  
  // Classify error type
  const errorType = typeof error === 'string' 
    ? NetworkErrorType.UNKNOWN 
    : classifyNetworkError(error);
  
  // Get error message
  const errorMessage = typeof error === 'string' 
    ? error 
    : error?.message || `Failed to ${context}. Please try again.`;
  
  // Handle retry
  const handleRetry = async () => {
    if (!onRetry || isRetrying) return;
    
    setInternalIsRetrying(true);
    
    try {
      await onRetry();
    } catch (err) {
      console.error('Retry failed:', err);
    } finally {
      setInternalIsRetrying(false);
    }
  };
  
  // Handle refresh page
  const handleRefresh = () => {
    window.location.reload();
  };
  
  // Get icon based on error type
  const getErrorIcon = () => {
    switch (errorType) {
      case NetworkErrorType.TIMEOUT:
        return <Clock className="h-12 w-12 text-yellow-500" />;
      case NetworkErrorType.NO_CONNECTION:
        return <WifiOff className="h-12 w-12 text-red-500" />;
      case NetworkErrorType.SERVER_ERROR:
        return <ServerCrash className="h-12 w-12 text-orange-500" />;
      case NetworkErrorType.UNAUTHORIZED:
      case NetworkErrorType.FORBIDDEN:
        return <Lock className="h-12 w-12 text-purple-500" />;
      case NetworkErrorType.NOT_FOUND:
        return <FileQuestion className="h-12 w-12 text-gray-500" />;
      default:
        return <AlertCircle className="h-12 w-12 text-red-500" />;
    }
  };
  
  // Get title based on error type
  const getErrorTitle = () => {
    if (title) return title;
    
    switch (errorType) {
      case NetworkErrorType.TIMEOUT:
        return "Request Timed Out";
      case NetworkErrorType.NO_CONNECTION:
        return "No Internet Connection";
      case NetworkErrorType.SERVER_ERROR:
        return "Server Error";
      case NetworkErrorType.UNAUTHORIZED:
        return "Authentication Required";
      case NetworkErrorType.FORBIDDEN:
        return "Access Denied";
      case NetworkErrorType.NOT_FOUND:
        return "Not Found";
      default:
        return "Error";
    }
  };
  
  // Get recovery suggestions based on error type
  const getRecoverySuggestions = () => {
    switch (errorType) {
      case NetworkErrorType.TIMEOUT:
        return [
          "Check your internet connection speed",
          "Try again in a few moments",
          "Contact support if the problem persists",
        ];
      case NetworkErrorType.NO_CONNECTION:
        return [
          "Check your internet connection",
          "Make sure you're connected to Wi-Fi or mobile data",
          "Try again once your connection is restored",
        ];
      case NetworkErrorType.SERVER_ERROR:
        return [
          "Our servers are experiencing issues",
          "Please try again in a few minutes",
          "Contact support if the problem persists",
        ];
      case NetworkErrorType.UNAUTHORIZED:
        return [
          "Your session may have expired",
          "Please log in again",
          "Contact support if you continue to have issues",
        ];
      case NetworkErrorType.FORBIDDEN:
        return [
          "You don't have permission to access this resource",
          "Contact the project owner for access",
          "Go back to your projects",
        ];
      case NetworkErrorType.NOT_FOUND:
        return [
          "The resource you're looking for doesn't exist",
          "It may have been deleted or moved",
          "Go back to your projects",
        ];
      default:
        return [
          "Try refreshing the page",
          "Check your internet connection",
          "Contact support if the problem persists",
        ];
    }
  };
  
  // Determine if retry should be shown
  const showRetry = onRetry && errorType !== NetworkErrorType.NOT_FOUND && errorType !== NetworkErrorType.FORBIDDEN;
  
  return (
    <Card className={`border-red-200 dark:border-red-800 ${className}`}>
      <CardHeader>
        <CardTitle className="text-red-600 dark:text-red-400">
          {getErrorTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Error Icon */}
        <div className="flex justify-center">
          {getErrorIcon()}
        </div>
        
        {/* Error Message */}
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {errorMessage}
          </p>
        </div>
        
        {/* Recovery Suggestions */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            What you can do:
          </p>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {getRecoverySuggestions().map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#F45A0B] mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {showRetry && (
            <Button
              onClick={handleRetry}
              disabled={isRetrying}
              className="bg-[#F45A0B] hover:bg-[#F45A0B]/90"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </Button>
          )}
          
          {showRefreshButton && (
            <Button
              onClick={handleRefresh}
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
          )}
          
          {showBackButton && onBack && (
            <Button
              onClick={onBack}
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          )}
        </div>
        
        {/* Support Link */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Need help?{' '}
            <a
              href="/help"
              className="text-[#F45A0B] hover:underline inline-flex items-center gap-1"
            >
              Contact Support
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
