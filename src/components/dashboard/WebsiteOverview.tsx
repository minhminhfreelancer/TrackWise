import React, { useState } from "react";
import MetricsSummary from "./MetricsSummary";
import WebsitesList from "./WebsitesList";
import ComparisonCharts from "./ComparisonCharts";
import RealTimeVisitors from "./RealTimeVisitors";
import EmptyState from "./EmptyState";
import { Button } from "../ui/button";
import { PlusCircle, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

interface WebsiteOverviewProps {
  hasWebsites?: boolean;
  onAddWebsite?: () => void;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

const WebsiteOverview = ({
  hasWebsites = true,
  onAddWebsite = () => console.log("Add website clicked"),
  dateRange = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  },
}: WebsiteOverviewProps) => {
  const [date, setDate] = useState<{ from: Date; to: Date }>(dateRange);
  const [timeframe, setTimeframe] = useState("30days");

  return (
    <div className="w-full h-full bg-slate-50 p-6 space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Monitor and analyze your website performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                {date.from && date.to ? (
                  <>
                    {format(date.from, "MMM d, yyyy")} -{" "}
                    {format(date.to, "MMM d, yyyy")}
                  </>
                ) : (
                  <span>Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{
                  from: date.from,
                  to: date.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDate({ from: range.from, to: range.to });
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasWebsites ? (
        <div className="space-y-6">
          {/* Real-Time Visitors */}
          <RealTimeVisitors />

          {/* Metrics Summary */}
          <MetricsSummary
            period={`Last ${timeframe.replace("days", " days").replace("months", " months")}`}
          />

          {/* Websites List */}
          <WebsitesList />

          {/* Comparison Charts */}
          <ComparisonCharts dateRange={date} />
        </div>
      ) : (
        <EmptyState onAddWebsite={onAddWebsite} />
      )}
    </div>
  );
};

export default WebsiteOverview;
