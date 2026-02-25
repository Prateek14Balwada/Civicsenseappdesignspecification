import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { IssueSeverity, IssueCategory } from "../types";
import { StatusBadge } from "../components/status-badge";
import { SeverityBadge } from "../components/severity-badge";
import { MapPin, Upload, Loader2, CheckCircle2, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../contexts/auth-context";

export default function ReportIssue() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<IssueCategory>("roads");
  const [severity, setSeverity] = useState<IssueSeverity>("medium");
  const [address, setAddress] = useState("");

  const categories: IssueCategory[] = [
    "roads",
    "streetlights",
    "garbage",
    "water",
    "parks",
    "buildings",
    "traffic",
    "other",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...imageUrls]);
    }
  };

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    // Simulate geolocation
    setTimeout(() => {
      setAddress("123 Main Street, Downtown District");
      setIsDetectingLocation(false);
      toast.success("Location detected!");
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !address) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Issue reported successfully!");
      navigate("/dashboard/my-reports");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
        <p className="text-gray-600 mt-1">Help improve your community by reporting issues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the issue"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={category} onValueChange={(value) => setCategory(value as IssueCategory)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            <span className="capitalize">{cat}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="severity">
                      Severity <span className="text-red-500">*</span>
                    </Label>
                    <Select value={severity} onValueChange={(value) => setSeverity(value as IssueSeverity)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <Upload className="size-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </label>
                  </div>
                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mt-3">
                      {previewImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                          <img src={img} alt={`Preview ${idx + 1}`} className="size-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="address"
                      placeholder="Enter address or use auto-detect"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDetectLocation}
                      disabled={isDetectingLocation}
                    >
                      {isDetectingLocation ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <MapPin className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-5 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {previewImages.length > 0 && (
                  <div className="h-48 rounded-lg overflow-hidden">
                    <img
                      src={previewImages[0]}
                      alt="Preview"
                      className="size-full object-cover"
                    />
                  </div>
                )}
                {previewImages.length === 0 && (
                  <div className="h-48 rounded-lg bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="size-12 text-gray-400" />
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {title || "Issue Title"}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <StatusBadge status="reported" />
                    <SeverityBadge severity={severity} />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {description || "Issue description will appear here..."}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">Category:</span>
                      <span className="capitalize">{category}</span>
                    </div>
                    {address && (
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin className="size-4 mt-0.5 flex-shrink-0" />
                        <span>{address}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">Reporter:</span>
                      <span>{user?.name}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
