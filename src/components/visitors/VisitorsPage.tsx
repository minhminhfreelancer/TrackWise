import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import VisitorsList from "../dashboard/VisitorsList";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const VisitorsPage = () => {
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const handleExport = () => {
    console.log("Exporting visitors data...");
    // In a real app, this would trigger a CSV/Excel export
  };

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-slate-50 p-6 space-y-6">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Website Visitors
            </h1>
            <p className="text-muted-foreground">
              View detailed information about visitors to your website.
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
          </div>
        </div>

        {/* Visitors List */}
        <VisitorsList onExport={handleExport} />
      </div>
    </DashboardLayout>
  );
};

export default VisitorsPage;
