"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { BidsHeader, BidsList } from '@/features/bids/components';
import { BidsState, Bid } from '@/features/bids/schema';
import { getFreelancerBids, withdrawFreelancerBid } from '@/features/bids/actions/freelancer-bids.actions';
import { toast } from 'sonner';

export default function FreelancerBidsPage() {
  // State for bids data
  const [bidsData, setBidsData] = useState<BidsState>({
    bids: [],
    filters: {
      status: 'all',
      sortBy: 'date',
      sortDirection: 'desc',
      search: ''
    },
    stats: {
      total: 0,
      pending: 0,
      accepted: 0,
      rejected: 0,
      withdrawn: 0,
      expired: 0,
      viewRate: 0,
      responseRate: 0,
      successRate: 0
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      totalItems: 0
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch bids from API
  const fetchBids = async () => {
    setIsLoading(true);
    try {
      const bids = await getFreelancerBids();
      
      // Calculate stats
      const total = bids.length;
      const pending = bids.filter(b => b.status === "pending").length;
      const accepted = bids.filter(b => b.status === "accepted").length;
      const rejected = bids.filter(b => b.status === "rejected").length;
      const withdrawn = bids.filter(b => b.status === "withdrawn").length;
      const expired = bids.filter(b => b.status === "expired").length;
      
      const successRate = total > 0 ? Math.round((accepted / total) * 100) : 0;
      
      setBidsData(prev => ({
        ...prev,
        bids,
        stats: {
          ...prev.stats,
          total,
          pending,
          accepted,
          rejected,
          withdrawn,
          expired,
          successRate
        }
      }));
    } catch (error) {
      console.error("Failed to fetch bids:", error);
      toast.error("Failed to load your bids. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBids();
  }, []);

  // Filter bids based on current filters
  const filteredBids = useMemo(() => {
    let result = [...bidsData.bids];
    
    // Filter by status
    if (bidsData.filters.status !== 'all') {
      result = result.filter(bid => bid.status === bidsData.filters.status);
    }
    
    // Filter by search query
    if (bidsData.filters.search.trim()) {
      const query = bidsData.filters.search.toLowerCase();
      result = result.filter(bid => {
        // Search in project title
        if (bid.project.title.toLowerCase().includes(query)) return true;
        
        // Search in project description
        if (bid.project.description.toLowerCase().includes(query)) return true;
        
        // Search in client name
        if (bid.client.name.toLowerCase().includes(query)) return true;
        
        // Search in project category
        if (bid.project.category.toLowerCase().includes(query)) return true;
        
        // Search in skills
        if (bid.project.skills.some(skill => skill.toLowerCase().includes(query))) return true;
        
        return false;
      });
    }
    
    // Sort bids
    result.sort((a, b) => {
      if (bidsData.filters.sortBy === 'date') {
        const dateA = new Date(a.bidDate).getTime();
        const dateB = new Date(b.bidDate).getTime();
        return bidsData.filters.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (bidsData.filters.sortBy === 'amount') {
        return bidsData.filters.sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      
      if (bidsData.filters.sortBy === 'expiry') {
        if (!a.expiresAt && !b.expiresAt) return 0;
        if (!a.expiresAt) return bidsData.filters.sortDirection === 'asc' ? 1 : -1;
        if (!b.expiresAt) return bidsData.filters.sortDirection === 'asc' ? -1 : 1;
        
        const dateA = new Date(a.expiresAt).getTime();
        const dateB = new Date(b.expiresAt).getTime();
        return bidsData.filters.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (bidsData.filters.sortBy === 'activity') {
        const activityA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
        const activityB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
        return bidsData.filters.sortDirection === 'asc' ? activityA - activityB : activityB - activityA;
      }
      
      return 0;
    });
    
    return result;
  }, [bidsData.bids, bidsData.filters]);

  // Handle filter changes
  const handleFilterChange = (filters: Partial<BidsState['filters']>) => {
    setBidsData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters
      }
    }));
  };

  // Handle refreshing bids
  const handleRefresh = () => {
    fetchBids();
  };

  // Handle withdrawing a bid
  const handleWithdrawBid = async (id: string) => {
    try {
      // Find the bid to get its projectId for the API call
      const bidToWithdraw = bidsData.bids.find(b => b.id === id);
      if (!bidToWithdraw) return;

      await withdrawFreelancerBid(bidToWithdraw.projectId);
      toast.success("Bid withdrawn successfully");
      
      // Update UI immediately
      setBidsData(prev => {
        const updatedBids = prev.bids.map(bid => 
          bid.id === id ? { ...bid, status: 'withdrawn' as const, lastUpdated: new Date().toISOString() } : bid
        );
        
        // Update stats
        const pending = updatedBids.filter(bid => bid.status === 'pending').length;
        const withdrawn = updatedBids.filter(bid => bid.status === 'withdrawn').length;
        
        return {
          ...prev,
          bids: updatedBids,
          stats: {
            ...prev.stats,
            pending,
            withdrawn
          }
        };
      });
    } catch (error) {
      toast.error("Failed to withdraw bid. Please try again.");
    }
  };

  // Handle pinning/unpinning a bid (client-side only for now)
  const handlePinBid = (id: string, isPinned: boolean) => {
    setBidsData(prev => {
      const updatedBids = prev.bids.map(bid => 
        bid.id === id ? { ...bid, isPinned, lastUpdated: new Date().toISOString() } : bid
      );
      
      return {
        ...prev,
        bids: updatedBids
      };
    });
  };

  // Handle loading more bids
  const handleLoadMore = () => {
    setLoadingMore(true);
    
    // To be implemented: API pagination support
    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      <BidsHeader 
        stats={bidsData.stats}
        filters={bidsData.filters}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />
      
      <BidsList 
        bids={filteredBids}
        isLoading={isLoading}
        onWithdraw={handleWithdrawBid}
        onPin={handlePinBid}
        onLoadMore={handleLoadMore}
        hasMoreBids={false} // Would be driven by API pagination in the future
        loadingMore={loadingMore}
      />
    </div>
  );
}
