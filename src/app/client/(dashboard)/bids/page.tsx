"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BidsHeader, BidsList } from "@/features/bids/components";
import { BidsState, Bid } from "@/features/bids/schema";
import { getUserProjects } from "@/features/projects/actions/my-projects.actions";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ClientBidsPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  // State for bids data
  const [bidsState, setBidsState] = useState<BidsState>({
    bids: [],
    filters: {
      status: "all",
      sortBy: "date",
      sortDirection: "desc",
      search: "",
    },
    stats: {
      total: 0,
      pending: 0,
      accepted: 0,
      rejected: 0,
      withdrawn: 0,
      expired: 0,
      totalBidsReceived: 0,
      activeProjects: 0,
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      totalItems: 0,
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch projects and transform to bids view
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const projects = await getUserProjects();
      
      // Filter for projects that are active or pending (and have bids potentially)
      const relevantProjects = projects.filter(p => 
        p.status === "active" || p.status === "pending"
      );

      // Transform MyProject to Bid schema expected by features/bids components
      const transformedBids: Bid[] = relevantProjects.map(project => {
        // Calculate a virtual deadline if not present (createdAt + 30 days)
        const createdAt = new Date(project.createdAt);
        const deadlineDate = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
        const deadline = deadlineDate.toISOString();

        return {
          id: `bid-proj-${project.id}`, // Virtual ID since a project is the "bid" container here
          projectId: project.id,
          project: {
            id: project.id,
            title: project.name,
            description: project.description,
            category: project.category.name,
            skills: project.skills.map(s => s.name),
            budget: {
              min: project.budgetMin,
              max: project.budgetMax,
              type: project.paymentType as "fixed" | "hourly",
            },
            postedAt: project.createdAt.toISOString(),
            deadline: deadline,
            projectUrl: `/client/projects/${project.id}`,
          },
          client: {
            id: user?.id || "",
            name: user?.name || "Client",
            avatar: user?.avatar || "",
            verified: true,
          },
          amount: project.budgetMax, // Using max budget as reference
          bidType: project.paymentType as "fixed" | "hourly",
          coverLetter: "",
          bidDate: project.createdAt.toISOString(),
          status: (new Date(deadline).getTime() < new Date().getTime() ? "expired" : project.status) as any,
          bidderCount: project.biddersCount || 0,
          lowestBidAmount: project.lowestBidAmount || 0,
          clientViewed: true,
          expiresAt: deadline,
        };
      });

      // Calculate stats
      const total = transformedBids.length;
      const totalBidsReceived = transformedBids.reduce((sum, b) => sum + b.bidderCount, 0);
      
      const stats = {
        total,
        totalBidsReceived,
        activeProjects: relevantProjects.filter(p => p.status === "active").length,
        pending: transformedBids.filter(b => b.status === "pending").length,
        accepted: transformedBids.filter(b => b.status === "accepted").length,
        rejected: transformedBids.filter(b => b.status === "rejected").length,
        withdrawn: transformedBids.filter(b => b.status === "withdrawn").length,
        expired: transformedBids.filter(b => b.status === "expired").length,
      };
      
      setBidsState(prev => ({
        ...prev,
        bids: transformedBids,
        stats: {
          ...prev.stats,
          ...stats
        }
      }));
    } catch (error) {
      console.error("Failed to fetch client projects:", error);
      toast.error("Failed to load projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter and Sort Logic
  const filteredBids = useMemo(() => {
    let result = [...bidsState.bids];

    // Status filter
    if (bidsState.filters.status !== "all") {
      result = result.filter(b => b.status === bidsState.filters.status);
    }

    // Search filter
    if (bidsState.filters.search.trim()) {
      const q = bidsState.filters.search.toLowerCase();
      result = result.filter(b => 
        b.project.title.toLowerCase().includes(q) || 
        b.project.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      const dir = bidsState.filters.sortDirection === "asc" ? 1 : -1;
      if (bidsState.filters.sortBy === "date") {
        return (new Date(b.bidDate).getTime() - new Date(a.bidDate).getTime()) * dir;
      }
      if (bidsState.filters.sortBy === "amount") {
        return (b.amount - a.amount) * dir;
      }
      return 0;
    });

    return result;
  }, [bidsState.bids, bidsState.filters]);

  const handleFilterChange = (filters: Partial<BidsState["filters"]>) => {
    setBidsState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
  };


  if (isLoading && bidsState.bids.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <BidsHeader
        stats={bidsState.stats}
        filters={bidsState.filters}
        onFilterChange={handleFilterChange}
        onRefresh={fetchProjects}
        isLoading={isLoading}
        title="Active Projects"
        subtitle={`${bidsState.stats.totalBidsReceived || 0} total bids received across ${bidsState.stats.total} projects`}
      />

      <BidsList
        bids={filteredBids}
        isLoading={isLoading}
        onPin={() => {}}
        onLoadMore={() => {}}
        hasMoreBids={false}
        loadingMore={loadingMore}
      />
    </div>
  );
}
