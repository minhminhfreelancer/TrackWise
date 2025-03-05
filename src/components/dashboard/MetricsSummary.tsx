import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  Users,
  Clock,
  MousePointer,
  Percent,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  change = 0,
  icon = <Users className="h-5 w-5" />,
  description = "No data available",
}: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full p-2 bg-muted">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {change !== 0 && (
            <div
              className={`flex items-center text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {isPositive ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground ml-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsSummaryProps {
  metrics?: {
    totalVisitors: number;
    uniqueVisitors: number;
    clickThroughRate: number;
    avgSessionDuration: number;
  };
  period?: string;
  changes?: {
    totalVisitors: number;
    uniqueVisitors: number;
    clickThroughRate: number;
    avgSessionDuration: number;
  };
}

const MetricsSummary = ({
  metrics = {
    totalVisitors: 12458,
    uniqueVisitors: 8753,
    clickThroughRate: 24.5,
    avgSessionDuration: 3.2,
  },
  period = "Last 30 days",
  changes = {
    totalVisitors: 12.3,
    uniqueVisitors: 8.7,
    clickThroughRate: -2.4,
    avgSessionDuration: 5.1,
  },
}: MetricsSummaryProps) => {
  return (
    <div className="bg-slate-50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Summary Metrics</h2>
        <p className="text-sm text-muted-foreground">{period}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Visitors"
          value={metrics.totalVisitors.toLocaleString()}
          change={changes.totalVisitors}
          icon={<Users className="h-5 w-5" />}
          description="vs. previous period"
        />
        <MetricCard
          title="Unique Visitors"
          value={metrics.uniqueVisitors.toLocaleString()}
          change={changes.uniqueVisitors}
          icon={<Users className="h-5 w-5" />}
          description="vs. previous period"
        />
        <MetricCard
          title="Click-Through Rate"
          value={`${metrics.clickThroughRate}%`}
          change={changes.clickThroughRate}
          icon={<MousePointer className="h-5 w-5" />}
          description="vs. previous period"
        />
        <MetricCard
          title="Avg. Session Duration"
          value={`${metrics.avgSessionDuration} min`}
          change={changes.avgSessionDuration}
          icon={<Clock className="h-5 w-5" />}
          description="vs. previous period"
        />
      </div>
    </div>
  );
};

export default MetricsSummary;
