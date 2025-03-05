import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { BarChart, LineChart, PieChart } from "lucide-react";

interface Website {
  id: string;
  name: string;
  url: string;
  visitors: number;
  pageviews: number;
  clickRate: number;
  avgSessionDuration: number;
}

interface ComparisonChartsProps {
  websites?: Website[];
  dateRange?: {
    from: Date;
    to: Date;
  };
}

const ComparisonCharts = ({
  websites = [
    {
      id: "1",
      name: "E-commerce Store",
      url: "www.mystore.com",
      visitors: 12500,
      pageviews: 45000,
      clickRate: 3.2,
      avgSessionDuration: 145,
    },
    {
      id: "2",
      name: "Company Blog",
      url: "blog.company.com",
      visitors: 8700,
      pageviews: 22000,
      clickRate: 2.1,
      avgSessionDuration: 95,
    },
    {
      id: "3",
      name: "Portfolio Site",
      url: "www.portfolio.com",
      visitors: 3200,
      pageviews: 7800,
      clickRate: 1.8,
      avgSessionDuration: 120,
    },
  ],
  dateRange = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  },
}: ComparisonChartsProps) => {
  const [chartType, setChartType] = useState("bar");
  const [metric, setMetric] = useState("visitors");
  const [date, setDate] = useState<{ from: Date; to: Date }>(dateRange);
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>(
    websites.map((w) => w.id),
  );

  const toggleWebsiteSelection = (websiteId: string) => {
    if (selectedWebsites.includes(websiteId)) {
      setSelectedWebsites(selectedWebsites.filter((id) => id !== websiteId));
    } else {
      setSelectedWebsites([...selectedWebsites, websiteId]);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Website Comparison</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            size="icon"
            onClick={() => setChartType("bar")}
            className="h-8 w-8"
          >
            <BarChart className="h-4 w-4" />
          </Button>
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            size="icon"
            onClick={() => setChartType("line")}
            className="h-8 w-8"
          >
            <LineChart className="h-4 w-4" />
          </Button>
          <Button
            variant={chartType === "pie" ? "default" : "outline"}
            size="icon"
            onClick={() => setChartType("pie")}
            className="h-8 w-8"
          >
            <PieChart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-1 block">Metric</label>
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visitors">Visitors</SelectItem>
                <SelectItem value="pageviews">Pageviews</SelectItem>
                <SelectItem value="clickRate">Click Rate</SelectItem>
                <SelectItem value="avgSessionDuration">
                  Avg. Session Duration
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-1 block">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {date.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
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

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="websites">Websites</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="pt-4">
            <div className="h-[400px] w-full flex items-center justify-center bg-gray-50 rounded-md">
              {chartType === "bar" && (
                <div className="text-center p-4">
                  <div className="flex h-[300px] items-end justify-around gap-2 px-4">
                    {websites
                      .filter((website) =>
                        selectedWebsites.includes(website.id),
                      )
                      .map((website) => {
                        const value = website[metric as keyof Website];
                        const height =
                          typeof value === "number"
                            ? Math.max(
                                30,
                                (value /
                                  Math.max(
                                    ...websites.map((w) =>
                                      Number(w[metric as keyof Website]),
                                    ),
                                  )) *
                                  280,
                              )
                            : 30;

                        return (
                          <div
                            key={website.id}
                            className="flex flex-col items-center"
                          >
                            <div
                              className="w-16 bg-blue-500 rounded-t-md"
                              style={{ height: `${height}px` }}
                            />
                            <div className="text-xs mt-2 w-20 truncate text-center">
                              {website.name}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="mt-4 text-sm font-medium">
                    {metric === "visitors" && "Total Visitors"}
                    {metric === "pageviews" && "Total Pageviews"}
                    {metric === "clickRate" && "Click Rate (%)"}
                    {metric === "avgSessionDuration" &&
                      "Avg. Session Duration (s)"}
                  </div>
                </div>
              )}

              {chartType === "line" && (
                <div className="text-center p-4 w-full">
                  <div className="h-[300px] w-full relative border-b border-l">
                    {/* Simplified line chart visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-400">
                        Line chart visualization for {metric}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {chartType === "pie" && (
                <div className="text-center p-4">
                  <div className="h-[300px] w-[300px] mx-auto relative rounded-full overflow-hidden">
                    {/* Simplified pie chart visualization */}
                    {websites
                      .filter((website) =>
                        selectedWebsites.includes(website.id),
                      )
                      .map((website, index, arr) => {
                        const value = website[metric as keyof Website];
                        const total = arr.reduce(
                          (sum, site) =>
                            sum + Number(site[metric as keyof Website]),
                          0,
                        );
                        const percentage =
                          typeof value === "number" ? (value / total) * 100 : 0;
                        const colors = [
                          "bg-blue-500",
                          "bg-green-500",
                          "bg-yellow-500",
                          "bg-purple-500",
                          "bg-red-500",
                        ];

                        return (
                          <div
                            key={website.id}
                            className={`absolute ${colors[index % colors.length]}`}
                            style={{
                              width: "150px",
                              height: "150px",
                              top: "75px",
                              left: "75px",
                              transformOrigin: "0 0",
                              transform: `rotate(${index * 72}deg)`,
                              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                            }}
                          />
                        );
                      })}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white rounded-full h-[150px] w-[150px] flex items-center justify-center">
                        <p className="text-sm font-medium">{metric}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="websites" className="pt-4">
            <div className="space-y-2">
              {websites.map((website) => (
                <div
                  key={website.id}
                  className={`p-3 rounded-md flex items-center justify-between cursor-pointer ${selectedWebsites.includes(website.id) ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}
                  onClick={() => toggleWebsiteSelection(website.id)}
                >
                  <div>
                    <h3 className="font-medium">{website.name}</h3>
                    <p className="text-sm text-gray-500">{website.url}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {metric === "visitors" &&
                        website.visitors.toLocaleString()}
                      {metric === "pageviews" &&
                        website.pageviews.toLocaleString()}
                      {metric === "clickRate" && `${website.clickRate}%`}
                      {metric === "avgSessionDuration" &&
                        `${website.avgSessionDuration}s`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ComparisonCharts;
