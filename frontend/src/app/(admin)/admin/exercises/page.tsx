"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Video,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Eye,
  Edit,
  Save,
  Trash2,
  FileText,
  Upload,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { VerifiedExerciseVideoPlayer } from "@/components/ui/VerifiedExerciseVideoPlayer";
import { VERIFIED_EXERCISE_DATABASE } from "@/data/verifiedExerciseDatabase";
import { ExerciseModel, PublicationStatus, LicenseStatus } from "@/types/exerciseVideo";

export default function AdminExerciseVideoManagementPage() {
  const [exercises, setExercises] = useState<ExerciseModel[]>(VERIFIED_EXERCISE_DATABASE);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [editingExercise, setEditingExercise] = useState<ExerciseModel | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const statuses: (PublicationStatus | "ALL")[] = ["ALL", "PUBLISHED", "APPROVED", "IN_REVIEW", "DRAFT", "ARCHIVED"];

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.expertReviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.sourceOrganization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || ex.publicationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: PublicationStatus) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id
          ? {
              ...ex,
              publicationStatus: newStatus,
              reviewDate: new Date().toISOString().split("T")[0],
            }
          : ex
      )
    );
    setToastMessage(`Exercise status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExercise) return;

    setExercises((prev) =>
      prev.map((ex) => (ex.id === editingExercise.id ? editingExercise : ex))
    );
    setEditingExercise(null);
    setToastMessage("Exercise metadata and video review successfully saved.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <AppShell streakDays={4} readinessScore={88}>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-court-border/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/admin" className="text-xs font-mono text-court-orange hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> System Admin
              </Link>
              <span className="text-muted-foreground">•</span>
              <Badge variant="rose" size="sm">Admin Role</Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-athletic uppercase tracking-tight text-white">
              Exercise Video CMS &amp; Verification
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Review, approve, and manage verified demonstration videos, captions, and source licenses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/exercises">
              <Button variant="outline" size="sm" className="text-xs">
                View Public Library
              </Button>
            </Link>
          </div>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center justify-between shadow-glow-emerald">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Summary Metrics Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-court-card border border-court-border">
            <span className="text-[10px] font-athletic uppercase font-bold text-muted-foreground block">
              Total Exercises
            </span>
            <span className="text-2xl font-black font-metric text-white">
              {exercises.length}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-court-card border border-court-border">
            <span className="text-[10px] font-athletic uppercase font-bold text-muted-foreground block">
              Published Videos
            </span>
            <span className="text-2xl font-black font-metric text-emerald-400">
              {exercises.filter((ex) => ex.publicationStatus === "PUBLISHED").length}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-court-card border border-court-border">
            <span className="text-[10px] font-athletic uppercase font-bold text-muted-foreground block">
              In Review
            </span>
            <span className="text-2xl font-black font-metric text-court-gold">
              {exercises.filter((ex) => ex.publicationStatus === "IN_REVIEW" || ex.publicationStatus === "APPROVED").length}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-court-card border border-court-border">
            <span className="text-[10px] font-athletic uppercase font-bold text-muted-foreground block">
              Captions &amp; Transcripts
            </span>
            <span className="text-2xl font-black font-metric text-court-cyan">
              {exercises.filter((ex) => ex.transcript.length > 0).length} / {exercises.length}
            </span>
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by exercise name, reviewer, or license organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {statuses.map((st) => (
              <Button
                key={st}
                variant={statusFilter === st ? "primary" : "secondary"}
                size="sm"
                onClick={() => setStatusFilter(st)}
                className="text-[11px] font-athletic uppercase font-bold"
              >
                {st}
              </Button>
            ))}
          </div>
        </div>

        {/* Coverage Matrix Table */}
        <Card variant="glass" className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Exercise Video Coverage Matrix</CardTitle>
                <CardDescription>All movements with verified source licenses, captions, and publication gates</CardDescription>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                Showing {filteredExercises.length} records
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-muted-foreground">
                <thead className="bg-court-card text-foreground font-athletic uppercase text-[10px] tracking-wider border-y border-court-border">
                  <tr>
                    <th className="py-3 px-4">Exercise Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Video Status</th>
                    <th className="py-3 px-3">Captions</th>
                    <th className="py-3 px-3">License &amp; Source</th>
                    <th className="py-3 px-3">Reviewer</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-court-border/60">
                  {filteredExercises.map((ex) => (
                    <tr key={ex.id} className="hover:bg-court-card/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-xs">{ex.name}</div>
                        <div className="text-[10px] text-muted-foreground">{ex.subcategory}</div>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant="orange" size="sm">{ex.category}</Badge>
                      </td>
                      <td className="py-3 px-3">
                        {ex.videoUrl ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-mono text-[10px]">
                            <Video className="w-3 h-3" /> Ready
                          </span>
                        ) : (
                          <span className="text-amber-400 font-mono text-[10px]">Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        {ex.transcript.length > 0 ? (
                          <span className="text-court-cyan font-mono text-[10px]">VTT ({ex.transcript.length} lines)</span>
                        ) : (
                          <span className="text-muted-foreground font-mono text-[10px]">None</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono text-[10px] text-white block">{ex.licenseStatus}</span>
                        <span className="text-[9px] text-muted-foreground">{ex.sourceOrganization}</span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-white text-[11px] truncate max-w-[120px]">{ex.expertReviewer.split(",")[0]}</div>
                        <div className="text-[9px] font-mono text-muted-foreground">{ex.reviewDate}</div>
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={
                            ex.publicationStatus === "PUBLISHED"
                              ? "emerald"
                              : ex.publicationStatus === "APPROVED"
                              ? "cyan"
                              : ex.publicationStatus === "IN_REVIEW"
                              ? "gold"
                              : "rose"
                          }
                          size="sm"
                        >
                          {ex.publicationStatus}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingExercise(ex);
                              setIsPreviewOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-court-card hover:bg-court-cardHover border border-court-border text-white"
                            title="Preview Video & Review Form"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingExercise(ex);
                              setIsPreviewOpen(false);
                            }}
                            className="p-1.5 rounded-lg bg-court-card hover:bg-court-cardHover border border-court-border text-court-orange"
                            title="Edit Metadata & Video URL"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Video Preview Modal */}
        {editingExercise && isPreviewOpen && (
          <Modal
            open={isPreviewOpen}
            onOpenChange={setIsPreviewOpen}
            title={`Video Quality Review: ${editingExercise.name}`}
            maxWidth="xl"
          >
            <div className="space-y-4 text-xs">
              <VerifiedExerciseVideoPlayer
                exercise={editingExercise}
                aspectRatio="video"
                showTranscriptPanel={true}
              />

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-court-card border border-court-border">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Source &amp; License
                  </span>
                  <span className="font-mono text-white text-xs">{editingExercise.sourceOrganization}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Review Status
                  </span>
                  <span className="font-mono text-emerald-400 text-xs">{editingExercise.publicationStatus}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-court-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(editingExercise.id, "IN_REVIEW")}
                >
                  Mark In Review
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleUpdateStatus(editingExercise.id, "PUBLISHED");
                    setIsPreviewOpen(false);
                  }}
                  className="shadow-glow-orange"
                >
                  Approve &amp; Publish Video
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Edit Metadata Modal */}
        {editingExercise && !isPreviewOpen && (
          <Modal
            open={Boolean(editingExercise)}
            onOpenChange={(open) => {
              if (!open) setEditingExercise(null);
            }}
            title={`Edit Exercise Media: ${editingExercise.name}`}
            maxWidth="lg"
          >
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <Input
                label="Verified Video URL (.mp4 / stream)"
                value={editingExercise.videoUrl || ""}
                onChange={(e) => setEditingExercise({ ...editingExercise, videoUrl: e.target.value })}
                placeholder="https://..."
                required
              />

              <Input
                label="Poster Image URL"
                value={editingExercise.posterUrl || ""}
                onChange={(e) => setEditingExercise({ ...editingExercise, posterUrl: e.target.value })}
                placeholder="https://..."
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Expert Reviewer"
                  value={editingExercise.expertReviewer}
                  onChange={(e) => setEditingExercise({ ...editingExercise, expertReviewer: e.target.value })}
                  required
                />
                <Input
                  label="Review Date (YYYY-MM-DD)"
                  value={editingExercise.reviewDate}
                  onChange={(e) => setEditingExercise({ ...editingExercise, reviewDate: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase font-athletic text-muted-foreground block mb-1">
                    License Status
                  </label>
                  <select
                    value={editingExercise.licenseStatus}
                    onChange={(e) => setEditingExercise({ ...editingExercise, licenseStatus: e.target.value as LicenseStatus })}
                    className="w-full rounded-xl bg-court-card border border-court-border p-2.5 text-xs text-white"
                  >
                    <option value="PROPRIETARY_VERTEX">PROPRIETARY_VERTEX</option>
                    <option value="CREATIVE_COMMONS_BY">CREATIVE_COMMONS_BY</option>
                    <option value="EDUCATIONAL_COMMONS">EDUCATIONAL_COMMONS</option>
                    <option value="LICENSED_PARTNER">LICENSED_PARTNER</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase font-athletic text-muted-foreground block mb-1">
                    Publication Status
                  </label>
                  <select
                    value={editingExercise.publicationStatus}
                    onChange={(e) => setEditingExercise({ ...editingExercise, publicationStatus: e.target.value as PublicationStatus })}
                    className="w-full rounded-xl bg-court-card border border-court-border p-2.5 text-xs text-white"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="IN_REVIEW">IN_REVIEW</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-court-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setEditingExercise(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Save className="w-3.5 h-3.5" />}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </AppShell>
  );
}
