"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import Masthead from "@/components/Masthead";
import { seedEvents } from "@/lib/events-data";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  CheckCircle2,
  Download,
  Search,
  ArrowLeft,
  Image as ImageIcon,
  Save,
  Trash2,
  Eye
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("events"); // "events" | "registrations"
  const [events, setEvents] = useState(seedEvents);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEventSlug, setSelectedEventSlug] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State for editing/creating an event
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tagline: "",
    shortDescription: "",
    description: "",
    date: "",
    time: "",
    venue: "VIT Mumbai",
    teamSize: "Teams of 2–3 / Solo",
    image: "",
    poster: "",
    registrationOpen: true,
    features: "",
    rules: ""
  });

  // Fetch events & registrations from API
  useEffect(() => {
    async function loadData() {
      try {
        const evRes = await fetch("/api/admin/events");
        const evData = await evRes.json();
        if (evData?.events?.length) {
          setEvents(evData.events);
        }
      } catch {}

      try {
        const regRes = await fetch("/api/admin/registrations");
        const regData = await regRes.json();
        if (regData?.registrations) {
          setRegistrations(regData.registrations);
        }
      } catch {}
    }
    loadData();
  }, []);

  const handleEditClick = (ev) => {
    setEditingEvent(ev.slug);
    setFormData({
      title: ev.title || "",
      slug: ev.slug || "",
      category: ev.category || "",
      tagline: ev.tagline || "",
      shortDescription: ev.shortDescription || "",
      description: ev.description || "",
      date: ev.date || "",
      time: ev.time || "",
      venue: ev.venue || "VIT Mumbai",
      teamSize: ev.teamSize || "Solo",
      image: ev.image || "",
      poster: ev.poster || "",
      registrationOpen: ev.registrationOpen !== false,
      features: (ev.features || []).join("\n"),
      rules: (ev.rules || []).join("\n")
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleNewEvent = () => {
    setEditingEvent("new");
    setFormData({
      title: "",
      slug: "",
      category: "Workshop / Competition",
      tagline: "",
      shortDescription: "",
      description: "",
      date: "2026-10-20",
      time: "16:00 IST",
      venue: "VIT Mumbai, Lab Wing",
      teamSize: "Teams of 2–3",
      image: "/images/choasbyDesign.jpeg",
      poster: "",
      registrationOpen: true,
      features: "Interactive hands-on session\nMentorship from CSI seniors\nCertificates for all participants",
      rules: "Individual or Team entry.\nDecision of judges is final."
    });
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const payload = {
      ...formData,
      features: formData.features.split("\n").map((s) => s.trim()).filter(Boolean),
      rules: formData.rules.split("\n").map((s) => s.trim()).filter(Boolean)
    };

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.ok) {
        setEvents((prev) => {
          const idx = prev.findIndex((ev) => ev.slug === payload.slug);
          if (idx >= 0) {
            const updated = [...prev];
            updated[idx] = payload;
            return updated;
          }
          return [payload, ...prev];
        });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {
      // Local fallback
      setEvents((prev) => [payload, ...prev.filter((ev) => ev.slug !== payload.slug)]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter((r) => {
    const matchesEvent = selectedEventSlug === "all" || r.eventSlug === selectedEventSlug;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      (r.name && r.name.toLowerCase().includes(query)) ||
      (r.email && r.email.toLowerCase().includes(query)) ||
      (r.teamName && r.teamName.toLowerCase().includes(query)) ||
      (r.eventSlug && r.eventSlug.toLowerCase().includes(query));
    return matchesEvent && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Event", "Type", "Team Name", "Team Members", "Date"];
    const rows = filteredRegistrations.map((r) => [
      `"${r.name || ""}"`,
      `"${r.email || ""}"`,
      `"${r.phone || ""}"`,
      `"${r.eventSlug || ""}"`,
      `"${r.type || "individual"}"`,
      `"${r.teamName || ""}"`,
      `"${(r.teamMembers || []).join(", ")}"`,
      `"${r.createdAt || ""}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `csi_registrations_${selectedEventSlug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageTransition>
      <Masthead />

      <div className="container-editorial mt-8 pb-20">
        {/* Header Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-b-2 border-ink pb-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rust" />
              <p className="kicker text-rust font-bold">CSI VIT · ADMINISTRATIVE DISPATCH DESK</p>
            </div>
            <h1 className="mt-1 font-display text-4xl font-bold text-ink sm:text-5xl">
              Society Operations & Ledger
            </h1>
            <p className="mt-2 font-body text-sm text-sepia">
              Manage event posters, schedules, rulebooks, and review individual & team registrations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 border border-sepia/50 bg-cream px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-sepia hover:border-rust hover:text-rust transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Public Events Page</span>
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 border border-sepia/50 bg-cream px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-sepia hover:border-rust hover:text-rust transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Passenger Profile</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex items-center gap-4 border-b border-sepia/40">
          <button
            onClick={() => setActiveTab("events")}
            className={`border-b-2 px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all ${
              activeTab === "events"
                ? "border-rust font-bold text-rust"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            1. Event Posters & Programme ({events.length})
          </button>
          <button
            onClick={() => setActiveTab("registrations")}
            className={`border-b-2 px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all ${
              activeTab === "registrations"
                ? "border-rust font-bold text-rust"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            2. Registrations & Team Ledger ({registrations.length})
          </button>
        </div>

        {/* TAB 1: EVENTS MANAGEMENT */}
        {activeTab === "events" && (
          <div className="mt-8 space-y-10">
            {/* Top action row */}
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink">Active Society Events</h2>
              <button
                onClick={handleNewEvent}
                className="btn-ticket inline-flex items-center gap-2 py-2 text-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Event</span>
              </button>
            </div>

            {/* Event Edit / Create Form */}
            {editingEvent && (
              <div className="border-2 border-rust bg-[#f8f4eb] p-6 shadow-ticket sm:p-8">
                <div className="flex items-center justify-between border-b border-sepia/40 pb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-rust">
                      {editingEvent === "new" ? "NEW EVENT ENTRY" : "DISPATCH EDITOR"}
                    </span>
                    <h3 className="font-display text-2xl text-ink">
                      {editingEvent === "new" ? "Draft New Society Event" : `Edit: ${formData.title}`}
                    </h3>
                  </div>
                  <button
                    onClick={() => setEditingEvent(null)}
                    className="font-mono text-xs uppercase text-muted hover:text-rust"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveEvent} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Chaos by Design"
                        className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-sm text-ink outline-none focus:border-rust"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. chaos-by-design"
                        className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-sm text-ink outline-none focus:border-rust"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="UI Challenge / Design"
                        className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-sm text-ink outline-none focus:border-rust"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        placeholder="2026-10-13"
                        className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-sm text-ink outline-none focus:border-rust"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                        Time & Venue
                      </label>
                      <input
                        type="text"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        placeholder="16:00 IST"
                        className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-sm text-ink outline-none focus:border-rust"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                        Poster Image Path / URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="/images/choasbyDesign.jpeg"
                          className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-sm text-ink outline-none focus:border-rust"
                        />
                      </div>
                      <p className="mt-1 font-mono text-[10px] text-muted">
                        Files located in public/images/ like /images/choasbyDesign.jpeg
                      </p>
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                        Team Size Format
                      </label>
                      <input
                        type="text"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        placeholder="Teams of 2–3 / Solo"
                        className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-sm text-ink outline-none focus:border-rust"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Build the worst UI that still works."
                      className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-sm text-ink outline-none focus:border-rust"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                      Full Editorial Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border border-sepia/60 bg-cream p-2.5 font-body text-sm text-ink outline-none focus:border-rust"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                        Key Features (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.features}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-xs text-ink outline-none focus:border-rust"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase text-ink font-bold mb-1">
                        Rules of Engagement (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.rules}
                        onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                        className="w-full border border-sepia/60 bg-cream p-2.5 font-mono text-xs text-ink outline-none focus:border-rust"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 font-mono text-xs uppercase text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.registrationOpen}
                        onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.checked })}
                        className="accent-rust h-4 w-4"
                      />
                      <span>Registration Currently Open</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn-ticket inline-flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isSaving ? "Publishing Dispatch..." : "Save & Publish Event"}</span>
                    </button>
                    {saveSuccess && (
                      <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Dispatch Saved Successfully!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* List of Events Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((ev) => (
                <div
                  key={ev.slug}
                  className="flex flex-col justify-between border-2 border-sepia/50 bg-cream p-5 shadow-sm transition-all hover:border-rust"
                >
                  <div>
                    {/* Poster thumbnail if available */}
                    {ev.image ? (
                      <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded border border-sepia bg-black/5 flex items-center justify-center">
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="mb-3 flex h-24 items-center justify-center border border-dashed border-sepia/60 bg-sepia/10 font-mono text-xs uppercase tracking-widest text-sepia">
                        [ VINTAGE ART THEME: {ev.poster || ev.slug} ]
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-rust">
                        {ev.category}
                      </span>
                      <span
                        className={`font-mono text-[9px] uppercase px-1.5 py-0.2 border ${
                          ev.registrationOpen !== false
                            ? "border-emerald-700 bg-emerald-50 text-emerald-800 font-bold"
                            : "border-muted bg-cream text-muted"
                        }`}
                      >
                        {ev.registrationOpen !== false ? "OPEN" : "CLOSED"}
                      </span>
                    </div>

                    <h3 className="mt-1 font-display text-xl font-bold text-ink">{ev.title}</h3>
                    <p className="mt-1 line-clamp-2 font-body text-xs text-sepia">
                      {ev.shortDescription || ev.description}
                    </p>

                    <div className="mt-4 space-y-1 border-t border-dotted border-sepia/40 pt-2 font-mono text-[11px] text-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-rust" />
                        <span>{ev.date || "TBA"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-rust" />
                        <span>{ev.teamSize || "Individual"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-sepia/30 pt-3">
                    <Link
                      href={`/events/${ev.slug}`}
                      className="font-mono text-xs uppercase text-sepia hover:text-rust"
                    >
                      View Live →
                    </Link>
                    <button
                      onClick={() => handleEditClick(ev)}
                      className="inline-flex items-center gap-1 border border-sepia/60 bg-cream px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-ink hover:bg-rust hover:text-cream transition-colors"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: REGISTRATIONS & TEAM LEDGER */}
        {activeTab === "registrations" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold text-ink">Society Pass Ledger</h2>
                <p className="font-body text-xs text-sepia">
                  All individual and team registration passes recorded across convocations.
                </p>
              </div>

              <button
                onClick={exportCSV}
                className="btn-ticket inline-flex items-center gap-2 py-2 text-xs"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV Ledger</span>
              </button>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col gap-3 rounded border border-sepia/40 bg-cream p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs uppercase text-ink font-bold">Filter Event:</span>
                <select
                  value={selectedEventSlug}
                  onChange={(e) => setSelectedEventSlug(e.target.value)}
                  className="border border-sepia/60 bg-white px-3 py-1.5 font-mono text-xs text-ink outline-none"
                >
                  <option value="all">All Events ({registrations.length})</option>
                  {events.map((e) => (
                    <option key={e.slug} value={e.slug}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, email, team..."
                  className="w-full border border-sepia/60 bg-white pl-8 pr-3 py-1.5 font-mono text-xs text-ink outline-none sm:w-64"
                />
              </div>
            </div>

            {/* Registrations Table */}
            <div className="overflow-x-auto border border-sepia/50 bg-cream">
              <table className="w-full text-left font-mono text-xs">
                <thead className="border-b-2 border-ink bg-sepia/10 uppercase tracking-wider text-ink">
                  <tr>
                    <th className="p-3">Passenger</th>
                    <th className="p-3">Email & Contact</th>
                    <th className="p-3">Convocation / Event</th>
                    <th className="p-3">Format</th>
                    <th className="p-3">Team Details</th>
                    <th className="p-3">Date Dispatched</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sepia/30">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-sepia">
                        No registrations matching current filter on file.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((r, i) => (
                      <tr key={i} className="hover:bg-sepia/5 transition-colors">
                        <td className="p-3 font-bold text-ink">{r.name || "Anonymous Passenger"}</td>
                        <td className="p-3">
                          <div>{r.email}</div>
                          {r.phone && <div className="text-muted">{r.phone}</div>}
                        </td>
                        <td className="p-3 font-semibold text-rust uppercase">{r.eventSlug}</td>
                        <td className="p-3">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] uppercase font-bold ${
                              r.type === "team"
                                ? "border border-rust bg-rust/10 text-rust"
                                : "border border-sepia/60 bg-sepia/10 text-sepia"
                            }`}
                          >
                            {r.type || "individual"}
                          </span>
                        </td>
                        <td className="p-3">
                          {r.type === "team" ? (
                            <div>
                              <div className="font-bold text-ink">Team: {r.teamName || "N/A"}</div>
                              {r.teamMembers && r.teamMembers.length > 0 && (
                                <div className="text-muted text-[10px]">
                                  Members: {r.teamMembers.join(", ")}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td className="p-3 text-muted">
                          {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Active"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
