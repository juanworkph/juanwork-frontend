import { formatDistanceToNow } from "date-fns";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  History,
  MapPin,
  MoreHorizontal,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { mockServiceProposals } from "../schema/service-proposals-data";

export function SingleViewProposalsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <button className="px-4 py-1.5 text-xs font-semibold bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md shadow-sm">
            All Proposals
          </button>
          <button className="px-4 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">
            Shortlisted
          </button>
          <button className="px-4 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">
            Interviewed
          </button>
        </div>
        <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
            {mockServiceProposals.length} TOTAL PROPOSALS
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {mockServiceProposals.map((proposal) => (
          <div
            key={proposal.id}
            className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <Image
                  src={
                    proposal.client.avatar ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  }
                  alt={proposal.client.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      {proposal.client.name}
                    </h3>
                    {proposal.client.verified && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-[9px] font-bold text-emerald-500 uppercase">
                        <CheckCircle className="h-3 w-3 fill-emerald-500" />{" "}
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />{" "}
                      {proposal.client.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-zinc-900 dark:text-white font-semibold">
                        {proposal.client.rating}
                      </span>{" "}
                      ({proposal.client.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-6 pl-16">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
                {proposal.title}
              </h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                {proposal.coverLetter}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 py-6 border-y border-zinc-100 dark:border-zinc-800/50 mb-6">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">
                  Budget Fee
                </p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-500">
                  {proposal.budget || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">
                  Delivery Time
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-zinc-400" />{" "}
                  {proposal.deliveryTime} days
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">
                  Submitted
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <History className="h-4 w-4 text-zinc-400" />{" "}
                  {formatDistanceToNow(new Date(proposal.submittedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 py-2.5 rounded-lg border-zinc-200 dark:border-zinc-800 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                View Proposal
              </Button>
              <Button className="flex-1 py-2.5 rounded-lg bg-primary hover:bg-orange-600 text-white text-sm font-semibold transition-colors">
                Accept Proposal
              </Button>
            </div>
          </div>
        ))}
      </div>

      {mockServiceProposals.length > 3 && (
        <div className="flex justify-center pt-4">
          <button className="flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors uppercase">
            View All {mockServiceProposals.length} Proposals{" "}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
