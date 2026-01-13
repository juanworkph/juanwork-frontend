"use client";

import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

interface SocialSharingCardProps {
  projectId: string;
  projectTitle: string;
  projectDescription: string;
}

/**
 * SocialSharingCard Component
 *
 * Provides social sharing buttons for Facebook, Twitter, LinkedIn, and Email.
 * Optimized with React.memo and useCallback for stable function references.
 *
 * Requirements:
 * - 7.1: Provide social sharing buttons
 * - 7.2: Open platform share dialogs
 * - 7.3: Include project title and description
 * - Performance: Optimized with React.memo and useCallback
 */
const SocialSharingCardComponent: React.FC<SocialSharingCardProps> = ({
  projectId,
  projectTitle,
  projectDescription,
}) => {
  /**
   * Generate the full project URL
   */
  const getProjectUrl = useCallback((): string => {
    if (typeof window === "undefined") return "";
    const baseUrl = window.location.origin;
    return `${baseUrl}/client/projects/${projectId}`;
  }, [projectId]);

  /**
   * Share project on Facebook
   * Opens Facebook share dialog in a popup window
   */
  const handleShareOnFacebook = useCallback((): void => {
    const url = encodeURIComponent(getProjectUrl());
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    
    const width = 600;
    const height = 400;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      facebookUrl,
      "facebook-share-dialog",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  }, [getProjectUrl]);

  /**
   * Share project on Twitter
   * Opens Twitter intent URL in a popup window
   */
  const handleShareOnTwitter = useCallback((): void => {
    const url = encodeURIComponent(getProjectUrl());
    const text = encodeURIComponent(
      `${projectTitle} - ${projectDescription.substring(0, 100)}${
        projectDescription.length > 100 ? "..." : ""
      }`
    );
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    
    const width = 600;
    const height = 400;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      twitterUrl,
      "twitter-share-dialog",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  }, [getProjectUrl, projectTitle, projectDescription]);

  /**
   * Share project on LinkedIn
   * Opens LinkedIn share dialog in a popup window
   */
  const handleShareOnLinkedIn = useCallback((): void => {
    const url = encodeURIComponent(getProjectUrl());
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    const width = 600;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      linkedInUrl,
      "linkedin-share-dialog",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  }, [getProjectUrl]);

  /**
   * Share project via Email
   * Opens default email client with pre-filled subject and body
   */
  const handleShareViaEmail = useCallback((): void => {
    const subject = encodeURIComponent(`Check out this project: ${projectTitle}`);
    const body = encodeURIComponent(
      `I thought you might be interested in this project:\n\n${projectTitle}\n\n${projectDescription}\n\nView project: ${getProjectUrl()}`
    );
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoUrl;
  }, [getProjectUrl, projectTitle, projectDescription]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#F45A0B]">Share on Social Media</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleShareOnFacebook}
          aria-label={`Share ${projectTitle} on Facebook`}
        >
          <Facebook className="h-4 w-4 mr-2" aria-hidden="true" />
          Share on Facebook
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleShareOnTwitter}
          aria-label={`Share ${projectTitle} on Twitter`}
        >
          <Twitter className="h-4 w-4 mr-2" aria-hidden="true" />
          Share on Twitter
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleShareOnLinkedIn}
          aria-label={`Share ${projectTitle} on LinkedIn`}
        >
          <Linkedin className="h-4 w-4 mr-2" aria-hidden="true" />
          Share on LinkedIn
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleShareViaEmail}
          aria-label={`Share ${projectTitle} via email`}
        >
          <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
          Share via Email
        </Button>
      </CardContent>
    </Card>
  );
};

/**
 * Memoized SocialSharingCard component
 * Prevents unnecessary re-renders when parent updates
 */
export const SocialSharingCard = React.memo(SocialSharingCardComponent);
