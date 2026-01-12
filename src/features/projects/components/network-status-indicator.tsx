/**
 * Network Status Indicator Component
 * 
 * Displays the current network connection status and quality.
 * Shows notifications for offline/online state changes and slow connections.
 */

"use client";

import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff, Wifi, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  isOnline,
  getNetworkQuality,
  addConnectionListeners,
} from "@/lib/network-utils";

interface NetworkStatusIndicatorProps {
  /**
   * Show reconnection attempts count
   */
  retryCount?: number;
  
  /**
   * Maximum retry attempts before showing error
   */
  maxRetries?: number;
  
  /**
   * Callback when user dismisses the indicator
   */
  onDismiss?: () => void;
  
  /**
   * Whether the indicator can be dismissed
   */
  dismissible?: boolean;
}

export const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({
  retryCount = 0,
  maxRetries = 5,
  onDismiss,
  dismissible = true,
}) => {
  const [online, setOnline] = useState<boolean>(true);
  const [networkQuality, setNetworkQuality] = useState<'fast' | 'slow' | 'offline'>('fast');
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  // Initialize network status
  useEffect(() => {
    const currentOnline = isOnline();
    const currentQuality = getNetworkQuality();
    
    setOnline(currentOnline);
    setNetworkQuality(currentQuality);
    
    // Show indicator if offline or slow
    if (!currentOnline || currentQuality === 'slow') {
      setShowIndicator(true);
    }
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      setNetworkQuality(getNetworkQuality());
      setShowIndicator(true); // Show "Connection restored" message
      setIsDismissed(false); // Reset dismissed state
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setShowIndicator(false);
      }, 5000);
    };

    const handleOffline = () => {
      setOnline(false);
      setNetworkQuality('offline');
      setShowIndicator(true);
      setIsDismissed(false); // Reset dismissed state
    };

    const cleanup = addConnectionListeners(handleOnline, handleOffline);

    return cleanup;
  }, []);

  // Update network quality periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const quality = getNetworkQuality();
      setNetworkQuality(quality);
      
      // Show indicator if quality changes to slow
      if (quality === 'slow' && !isDismissed) {
        setShowIndicator(true);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [isDismissed]);

  // Handle dismiss
  const handleDismiss = () => {
    setIsDismissed(true);
    setShowIndicator(false);
    onDismiss?.();
  };

  // Don't show if dismissed or not needed
  if (!showIndicator || isDismissed) {
    return null;
  }

  // Offline state
  if (!online || networkQuality === 'offline') {
    const isMaxRetriesReached = retryCount >= maxRetries;
    
    return (
      <Alert
        className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 mb-4"
        role="alert"
        aria-live="assertive"
      >
        <WifiOff className="h-4 w-4 text-red-600 dark:text-red-400" />
        <AlertDescription className="text-red-800 dark:text-red-200 flex items-center justify-between">
          <div className="flex-1">
            <strong className="font-semibold">No internet connection</strong>
            <p className="text-sm mt-1">
              {isMaxRetriesReached
                ? `Failed to reconnect after ${maxRetries} attempts. Please check your connection and refresh the page.`
                : retryCount > 0
                ? `Attempting to reconnect... (Attempt ${retryCount}/${maxRetries})`
                : 'Please check your internet connection. We\'ll automatically reconnect when your connection is restored.'}
            </p>
          </div>
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="ml-4 h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // Slow connection state
  if (networkQuality === 'slow') {
    return (
      <Alert
        className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10 mb-4"
        role="alert"
        aria-live="polite"
      >
        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        <AlertDescription className="text-yellow-800 dark:text-yellow-200 flex items-center justify-between">
          <div className="flex-1">
            <strong className="font-semibold">Slow connection detected</strong>
            <p className="text-sm mt-1">
              Your internet connection is slow. Some features may take longer to load.
            </p>
          </div>
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="ml-4 h-6 w-6 p-0 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // Connection restored state (auto-hides after 5 seconds)
  if (online && networkQuality === 'fast') {
    return (
      <Alert
        className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 mb-4"
        role="alert"
        aria-live="polite"
      >
        <Wifi className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-green-800 dark:text-green-200 flex items-center justify-between">
          <div className="flex-1">
            <strong className="font-semibold">Connection restored</strong>
            <p className="text-sm mt-1">
              Your internet connection has been restored. Data will be updated automatically.
            </p>
          </div>
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="ml-4 h-6 w-6 p-0 hover:bg-green-100 dark:hover:bg-green-900/20"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};
