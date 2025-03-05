import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import AddWebsiteModal from "../website/AddWebsiteModal";
import { Button } from "../ui/button";
import { PlusCircle, Filter, Edit, Trash2, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const WebsitesPage = () => {
  const [searchParams] = useSearchParams();
  const [showAddWebsiteModal, setShowAddWebsiteModal] = useState(false);
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [hasWebsite, setHasWebsite] = useState(false);
  const [website, setWebsite] = useState({
    name: "Nội Thất Gia Khánh",
    url: "https://noithatgiakhanh.com",
    status: "active",
    visitors: 12453,
    uniqueVisitors: 8721,
    clickRate: 3.2,
    avgSessionDuration: "2m 45s",
    lastUpdated: "2 hours ago",
    trackingCode:
      '<!-- TrackWise Tracking Code for noithatgiakhanh.com -->\n<script>\n  (function(t,r,a,c,k) {\n    t[a]=t[a]||function(){(t[a].q=t[a].q||[]).push(arguments)};\n    t[a].l=1*new Date();\n    k=r.createElement(c);\n    k.async=1;\n    k.src="https://analytics.trackwise.io/tracker.js";\n    r.getElementsByTagName(c)[0].appendChild(k);\n  })(window,document,"tw","script");\n  \n  tw("init", "TW-NGK7821X");\n  tw("trackPageview");\n  \n  // Special link tracking\n  document.addEventListener("click", function(e) {\n    var target = e.target;\n    while (target && target.tagName !== "A") {\n      target = target.parentNode;\n      if (!target) return;\n    }\n    var href = target.getAttribute("href");\n    if (href && (href.startsWith("tel:") || href.includes("zalo.me") || href.includes("m.me"))) {\n      tw("trackEvent", "link_click", {\n        link_type: href.startsWith("tel:") ? "tel" : href.includes("zalo.me") ? "zalo" : "messenger",\n        link_url: href\n      });\n    }\n  });\n</script>',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Always set hasWebsite to true since website is set during account creation
    setHasWebsite(true);
  }, []);

  // No longer needed as website is set during account creation
  // Keeping the function for compatibility but it's not used
  const handleAddWebsite = () => {};

  // Handle website form submission
  const handleWebsiteSubmit = (data: any) => {
    console.log("Website added:", data);
    setHasWebsite(true);
    setWebsite({
      ...website,
      name: data.name,
      url: data.url,
    });
    setShowAddWebsiteModal(false);
    // In a real app, this would send data to the backend
  };

  // Handle website deletion
  const handleDeleteWebsite = () => {
    setHasWebsite(false);
    // In a real app, this would send a delete request to the backend
  };

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-slate-50 p-6 space-y-6">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Website</h1>
            <p className="text-muted-foreground">
              Manage your website tracking and view analytics.
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

        {/* Website Content */}
        {hasWebsite ? (
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{website.name}</CardTitle>
                <CardDescription className="mt-1">
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    {website.url} <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardDescription>
              </div>
              <Badge
                className={
                  website.status === "active"
                    ? "bg-green-500"
                    : website.status === "inactive"
                      ? "bg-gray-500"
                      : "bg-yellow-500"
                }
              >
                {website.status === "active"
                  ? "Active"
                  : website.status === "inactive"
                    ? "Inactive"
                    : "Pending"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Total Visitors
                  </div>
                  <div className="text-2xl font-bold mt-1">
                    {website.visitors.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Unique Visitors
                  </div>
                  <div className="text-2xl font-bold mt-1">
                    {website.uniqueVisitors.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Click Rate
                  </div>
                  <div className="text-2xl font-bold mt-1">
                    {website.clickRate}%
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Avg. Session
                  </div>
                  <div className="text-2xl font-bold mt-1">
                    {website.avgSessionDuration}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-3">Tracking Code</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Add this code to your website before the closing &lt;/head&gt;
                  tag to start tracking visitors.
                </p>
                <div className="relative">
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{website.trackingCode}</pre>
                  </div>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      navigator.clipboard.writeText(website.trackingCode);
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddWebsiteModal(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Website
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Website
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your website and remove all tracking data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteWebsite}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center text-center max-w-md">
              <div className="w-24 h-24 mb-6 text-gray-300">
                <Globe className="w-full h-full" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No website added yet
              </h3>

              <p className="text-gray-500 mb-6">
                Add your website to start tracking visitor analytics and
                monitoring performance.
              </p>
            </div>
          </div>
        )}

        {/* Add Website Modal */}
        <AddWebsiteModal
          open={showAddWebsiteModal}
          onOpenChange={setShowAddWebsiteModal}
          onSubmit={handleWebsiteSubmit}
        />
      </div>
    </DashboardLayout>
  );
};

export default WebsitesPage;
