import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Visitor {
  id: string;
  ip: string;
  browser: string;
  provider: string;
  connectionType: "3G" | "4G" | "WiFi" | "Unknown";
  os: string;
  osVersion: string;
  screenSize: string;
  telClicks: number;
  zaloClicks: number;
  messengerClicks: number;
  visitTime: string;
}

interface VisitorsListProps {
  visitors?: Visitor[];
  onExport?: () => void;
}

const VisitorsList = ({
  visitors = [
    {
      id: "1",
      ip: "192.168.1.1",
      browser: "Chrome 96",
      provider: "Viettel",
      connectionType: "WiFi",
      os: "Windows",
      osVersion: "11",
      screenSize: "1920x1080",
      telClicks: 2,
      zaloClicks: 1,
      messengerClicks: 0,
      visitTime: "2023-06-15 14:32",
    },
    {
      id: "2",
      ip: "203.113.152.5",
      browser: "Safari 15",
      provider: "VNPT",
      connectionType: "4G",
      os: "iOS",
      osVersion: "15.4",
      screenSize: "390x844",
      telClicks: 3,
      zaloClicks: 0,
      messengerClicks: 2,
      visitTime: "2023-06-15 15:47",
    },
    {
      id: "3",
      ip: "118.70.125.22",
      browser: "Firefox 102",
      provider: "FPT",
      connectionType: "WiFi",
      os: "macOS",
      osVersion: "12.4",
      screenSize: "1440x900",
      telClicks: 0,
      zaloClicks: 2,
      messengerClicks: 1,
      visitTime: "2023-06-15 16:03",
    },
    {
      id: "4",
      ip: "27.72.98.55",
      browser: "Edge 103",
      provider: "Mobifone",
      connectionType: "3G",
      os: "Android",
      osVersion: "12",
      screenSize: "412x915",
      telClicks: 1,
      zaloClicks: 3,
      messengerClicks: 0,
      visitTime: "2023-06-15 16:15",
    },
    {
      id: "5",
      ip: "113.161.68.12",
      browser: "Chrome 96",
      provider: "Viettel",
      connectionType: "WiFi",
      os: "Windows",
      osVersion: "10",
      screenSize: "1366x768",
      telClicks: 2,
      zaloClicks: 0,
      messengerClicks: 0,
      visitTime: "2023-06-15 16:30",
    },
  ],
  onExport = () => console.log("Exporting data..."),
}: VisitorsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const getConnectionTypeBadge = (type: Visitor["connectionType"]) => {
    switch (type) {
      case "WiFi":
        return <Badge className="bg-green-500">WiFi</Badge>;
      case "4G":
        return <Badge className="bg-blue-500">4G</Badge>;
      case "3G":
        return <Badge className="bg-yellow-500">3G</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredVisitors = visitors.filter((visitor) => {
    // Apply search term filter
    const matchesSearch =
      searchTerm === "" ||
      visitor.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.browser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.os.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply category filter
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "tel" && visitor.telClicks > 0) return matchesSearch;
    if (filterBy === "zalo" && visitor.zaloClicks > 0) return matchesSearch;
    if (filterBy === "messenger" && visitor.messengerClicks > 0)
      return matchesSearch;
    if (
      filterBy === "mobile" &&
      (visitor.os === "iOS" || visitor.os === "Android")
    )
      return matchesSearch;
    if (
      filterBy === "desktop" &&
      (visitor.os === "Windows" || visitor.os === "macOS")
    )
      return matchesSearch;

    return false;
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-medium">Website Visitors</h3>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search visitors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Visitors</SelectItem>
                <SelectItem value="tel">Tel Clicks</SelectItem>
                <SelectItem value="zalo">Zalo Clicks</SelectItem>
                <SelectItem value="messenger">Messenger Clicks</SelectItem>
                <SelectItem value="mobile">Mobile Devices</SelectItem>
                <SelectItem value="desktop">Desktop Devices</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={onExport}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>
            A list of website visitors and their details.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Browser</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Connection</TableHead>
              <TableHead>OS</TableHead>
              <TableHead>Screen Size</TableHead>
              <TableHead className="text-center">Tel Clicks</TableHead>
              <TableHead className="text-center">Zalo Clicks</TableHead>
              <TableHead className="text-center">Messenger Clicks</TableHead>
              <TableHead className="text-right">Visit Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisitors.length > 0 ? (
              filteredVisitors.map((visitor) => (
                <TableRow key={visitor.id}>
                  <TableCell className="font-medium">{visitor.ip}</TableCell>
                  <TableCell>{visitor.browser}</TableCell>
                  <TableCell>{visitor.provider}</TableCell>
                  <TableCell>
                    {getConnectionTypeBadge(visitor.connectionType)}
                  </TableCell>
                  <TableCell>
                    {visitor.os} {visitor.osVersion}
                  </TableCell>
                  <TableCell>{visitor.screenSize}</TableCell>
                  <TableCell className="text-center">
                    {visitor.telClicks > 0 ? (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {visitor.telClicks}
                      </Badge>
                    ) : (
                      "0"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {visitor.zaloClicks > 0 ? (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {visitor.zaloClicks}
                      </Badge>
                    ) : (
                      "0"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {visitor.messengerClicks > 0 ? (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {visitor.messengerClicks}
                      </Badge>
                    ) : (
                      "0"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {visitor.visitTime}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-6 text-muted-foreground"
                >
                  No visitors found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VisitorsList;
