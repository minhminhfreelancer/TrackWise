import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Globe, Code, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AddWebsiteModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: WebsiteFormValues) => void;
}

interface WebsiteFormValues {
  name: string;
  url: string;
  category: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Website name is required" }),
  url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .min(1, { message: "Website URL is required" }),
  category: z.string().optional(),
});

const AddWebsiteModal = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}: AddWebsiteModalProps) => {
  const [currentStep, setCurrentStep] = useState<"form" | "code">("form");
  const [trackingCode, setTrackingCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      category: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would send data to the backend and get a tracking code
    onSubmit(values);

    // Generate a mock tracking code
    const mockTrackingCode = `<!-- TrackWise Tracking Code for ${values.name} -->
<script>
  (function(t,r,a,c,k) {
    t[a]=t[a]||function(){(t[a].q=t[a].q||[]).push(arguments)};
    t[a].l=1*new Date();
    k=r.createElement(c);
    k.async=1;
    k.src="https://analytics.trackwise.io/tracker.js";
    r.getElementsByTagName(c)[0].appendChild(k);
  })(window,document,"tw","script");
  
  tw("init", "TW-${Math.random().toString(36).substring(2, 10)}");
  tw("trackPageview");
</script>`;

    setTrackingCode(mockTrackingCode);
    setCurrentStep("code");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep("form");
    setTrackingCode("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        {currentStep === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Add a new website</DialogTitle>
              <DialogDescription>
                Enter your website details to generate a tracking code.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Awesome Website" {...field} />
                      </FormControl>
                      <FormDescription>
                        A friendly name to identify this website in your
                        dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4 text-gray-400" />
                          <Input placeholder="https://example.com" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The full URL of your website including https://
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E-commerce, Blog, Portfolio, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Categorize your website for better organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Generate Tracking Code</Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Your Tracking Code</DialogTitle>
              <DialogDescription>
                Add this code to your website before the closing &lt;/head&gt;
                tag.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Tabs defaultValue="code" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                </TabsList>
                <TabsContent value="code" className="pt-4">
                  <div className="relative">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>{trackingCode}</pre>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute top-2 right-2 h-8 w-8 bg-gray-800 border-gray-700 hover:bg-gray-700"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-300" />
                      )}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="instructions" className="pt-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">
                        Step 1: Copy the code
                      </h3>
                      <p className="text-sm text-gray-500">
                        Click the copy button in the code tab to copy the
                        tracking code to your clipboard.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">
                        Step 2: Add to your website
                      </h3>
                      <p className="text-sm text-gray-500">
                        Paste the code into your website's HTML, just before the
                        closing &lt;/head&gt; tag.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">
                        Step 3: Verify installation
                      </h3>
                      <p className="text-sm text-gray-500">
                        Return to your dashboard after adding the code to verify
                        that data is being collected.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={resetForm}>
                Add Another Website
              </Button>
              <Button onClick={() => onOpenChange(false)}>
                Return to Dashboard
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddWebsiteModal;
