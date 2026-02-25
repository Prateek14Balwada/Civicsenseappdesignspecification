import { useParams, useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { StatusBadge } from "../components/status-badge";
import { SeverityBadge } from "../components/severity-badge";
import { getIssueById, getCommentsByIssueId, getStatusUpdatesByIssueId } from "../data/mock-data";
import {
  ThumbsUp,
  MessageSquare,
  MapPin,
  ArrowLeft,
  Eye,
  Send,
  Calendar,
  User,
  CheckCircle2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/auth-context";

export default function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const issue = getIssueById(id || "");
  const comments = getCommentsByIssueId(id || "");
  const statusUpdates = getStatusUpdatesByIssueId(id || "");

  if (!issue) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">Issue not found</h2>
        <Button onClick={() => navigate("/dashboard/explore")}>Back to Explore</Button>
      </div>
    );
  }

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted);
    toast.success(isUpvoted ? "Upvote removed" : "Issue upvoted!");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed issue" : "Following issue");
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    toast.success("Comment added!");
    setNewComment("");
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="size-4 mr-2" />
        Back
      </Button>

      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{issue.title}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={issue.status} />
              <SeverityBadge severity={issue.severity} />
              <span className="text-sm text-gray-600 capitalize">{issue.category}</span>
              {issue.department && (
                <span className="text-sm text-gray-600">• {issue.department}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant={isUpvoted ? "default" : "outline"}
            onClick={handleUpvote}
            className="gap-2"
          >
            <ThumbsUp className={`size-4 ${isUpvoted ? "fill-current" : ""}`} />
            <span>{issue.upvotes + (isUpvoted ? 1 : 0)}</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageSquare className="size-4" />
            <span>{issue.commentCount}</span>
          </Button>
          <Button
            variant={isFollowing ? "default" : "outline"}
            onClick={handleFollow}
            className="gap-2"
          >
            <Eye className="size-4" />
            <span>{isFollowing ? "Following" : "Follow"}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          {issue.images.length > 0 && (
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                  {issue.images.map((image, idx) => (
                    <div
                      key={idx}
                      className={`${
                        issue.images.length === 1 ? "md:col-span-2" : ""
                      } aspect-video rounded-lg overflow-hidden`}
                    >
                      <img src={image} alt={`Issue ${idx + 1}`} className="size-full object-cover" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="updates">Updates ({statusUpdates.length})</TabsTrigger>
              <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{issue.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Impact</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{issue.upvotes}</div>
                      <div className="text-sm text-gray-600">Upvotes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{issue.followers}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{issue.commentCount}</div>
                      <div className="text-sm text-gray-600">Comments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates" className="space-y-3">
              {statusUpdates.length > 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {statusUpdates.map((update, idx) => (
                        <div key={update.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`size-10 rounded-full flex items-center justify-center ${
                              update.status === "resolved" ? "bg-green-100" :
                              update.status === "in_progress" ? "bg-yellow-100" :
                              update.status === "acknowledged" ? "bg-blue-100" :
                              "bg-gray-100"
                            }`}>
                              <CheckCircle2 className={`size-5 ${
                                update.status === "resolved" ? "text-green-600" :
                                update.status === "in_progress" ? "text-yellow-600" :
                                update.status === "acknowledged" ? "text-blue-600" :
                                "text-gray-600"
                              }`} />
                            </div>
                            {idx < statusUpdates.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200 my-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center gap-2 mb-1">
                              <StatusBadge status={update.status} />
                              <span className="text-sm text-gray-500">{timeAgo(update.createdAt)}</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{update.note}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              by {update.updatedByName}
                              {update.isAdmin && " (Admin)"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-16 text-center">
                    <Calendar className="size-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No updates yet</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              {/* Add Comment */}
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleCommentSubmit} className="space-y-3">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={!newComment.trim()}>
                        <Send className="size-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-3">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback className={comment.isAdminReply ? "bg-blue-100 text-blue-900" : "bg-gray-100"}>
                            {comment.userName.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{comment.userName}</span>
                            {comment.isAdminReply && (
                              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                                Admin
                              </span>
                            )}
                            <span className="text-sm text-gray-500">{timeAgo(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {comments.length === 0 && (
                  <Card>
                    <CardContent className="py-16 text-center">
                      <MessageSquare className="size-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No comments yet</p>
                      <p className="text-sm text-gray-500 mt-1">Be the first to comment</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Location */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Location</h3>
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <MapPin className="size-4 mt-0.5 flex-shrink-0" />
                <span>{issue.location.address}</span>
              </div>
              <div className="mt-4 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="size-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Map View</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporter Info */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Reported By</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-900">
                    {issue.userName.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{issue.userName}</div>
                  <div className="text-sm text-gray-500">{timeAgo(issue.createdAt)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">{new Date(issue.updatedAt).toLocaleDateString()}</span>
                </div>
                {issue.resolvedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resolved</span>
                    <span className="font-medium text-green-600">
                      {new Date(issue.resolvedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {issue.department && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department</span>
                    <span className="font-medium">{issue.department}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}