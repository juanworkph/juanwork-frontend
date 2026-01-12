import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, Eye } from "lucide-react";

interface QuickActionsCardProps {
  onShareProject?: () => void;
  onDownloadReport?: () => void;
  onPreviewAsFreelancer?: () => void;
}

export const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onShareProject,
  onDownloadReport,
  onPreviewAsFreelancer,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#F45A0B]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onShareProject}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Project
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onDownloadReport}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onPreviewAsFreelancer}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview as Freelancer
        </Button>
      </CardContent>
    </Card>
  );
};
