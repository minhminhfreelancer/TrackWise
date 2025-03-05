import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Users, Clock, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface RealTimeVisitorsProps {
  websiteId?: string;
  autoRefresh?: boolean;
}

const RealTimeVisitors = ({
  websiteId = "1",
  autoRefresh = true,
}: RealTimeVisitorsProps) => {
  const [activeVisitors, setActiveVisitors] = useState(42);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        refreshData();
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      // Random number between -5 and +5 from current value
      const change = Math.floor(Math.random() * 11) - 5;
      const newValue = Math.max(0, activeVisitors + change);
      setActiveVisitors(newValue);
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          Real-Time Visitors
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshData}
          disabled={isRefreshing}
          className="h-8 w-8 p-0"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <div className="text-3xl font-bold">{activeVisitors}</div>
              <div className="text-sm text-muted-foreground">active users</div>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Updated {formatTime(lastRefreshed)}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeVisitors;
