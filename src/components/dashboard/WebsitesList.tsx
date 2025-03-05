import React from "react";
import { MoreHorizontal, ExternalLink, Edit, Trash2, Copy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Website {
  id: string;
  name: string;
  url: string;
  status: "active" | "inactive" | "pending";
  visitors: number;
  uniqueVisitors: number;
  clickRate: number;
  avgSessionDuration: string;
  lastUpdated: string;
}

interface WebsitesListProps {
  websites?: Website[];
  onViewDetails?: (websiteId: string) => void;
  onEdit?: (websiteId: string) => void;
  onDelete?: (websiteId: string) => void;
  onGenerateCode?: (websiteId: string) => void;
}

const WebsitesList = ({
  websites = [
    {
      id: "1",
      name: "E-commerce Store",
      url: "https://mystore.example.com",
      status: "active",
      visitors: 12453,
      uniqueVisitors: 8721,
      clickRate: 3.2,
      avgSessionDuration: "2m 45s",
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "Company Blog",
      url: "https://blog.example.com",
      status: "active",
      visitors: 5632,
      uniqueVisitors: 4218,
      clickRate: 2.7,
      avgSessionDuration: "3m 12s",
      lastUpdated: "1 day ago",
    },
    {
      id: "3",
      name: "Landing Page",
      url: "https://landing.example.com",
      status: "inactive",
      visitors: 2341,
      uniqueVisitors: 1987,
      clickRate: 1.8,
      avgSessionDuration: "1m 30s",
      lastUpdated: "3 days ago",
    },
    {
      id: "4",
      name: "Support Portal",
      url: "https://support.example.com",
      status: "pending",
      visitors: 876,
      uniqueVisitors: 654,
      clickRate: 4.1,
      avgSessionDuration: "4m 05s",
      lastUpdated: "5 hours ago",
    },
  ],
  onViewDetails = (id) => console.log(`View details for website ${id}`),
  onEdit = (id) => console.log(`Edit website ${id}`),
  onDelete = (id) => console.log(`Delete website ${id}`),
  onGenerateCode = (id) => console.log(`Generate code for website ${id}`),
}: WebsitesListProps) => {
  const getStatusBadge = (status: Website["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Your Websites</h3>
        <p className="text-sm text-gray-500">
          Manage and monitor your tracked websites
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>
            A list of your tracked websites and their metrics.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Website</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Visitors</TableHead>
              <TableHead className="text-right">Unique</TableHead>
              <TableHead className="text-right">Click Rate</TableHead>
              <TableHead className="text-right">Avg. Session</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((website) => (
              <TableRow key={website.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{website.name}</div>
                    <div className="text-xs text-gray-500">{website.url}</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(website.status)}</TableCell>
                <TableCell className="text-right">
                  {website.visitors.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {website.uniqueVisitors.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {website.clickRate}%
                </TableCell>
                <TableCell className="text-right">
                  {website.avgSessionDuration}
                </TableCell>
                <TableCell className="text-right text-sm text-gray-500">
                  {website.lastUpdated}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => onViewDetails(website.id)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(website.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onGenerateCode(website.id)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Generate Code
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(website.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WebsitesList;
