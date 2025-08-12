import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { storageGet, storageSet } from "../utils/storage";
import { useAuth } from "./AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import { getSupabase } from "../services/supabase";

const NotesContext = createContext(null);

/**
 * Type
 * Note = { id: string, title: string, content: string, createdAt: number, updatedAt: number, userId?: string }
 */

/**
 * PUBLIC_INTERFACE
 * useNotes
 * Hook to access notes state and actions.
 */
export function useNotes() {
  return useContext(NotesContext);
}

const LOCAL_KEY = "notes:data";

/**
 * PUBLIC_INTERFACE
 * NotesProvider
 * Provides notes state with CRUD operations, search, and selection.
 * Offline mode: persists to localStorage. Supabase mode: TODO operations with PostgREST.
 */
export function NotesProvider({ children }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState(() => storageGet(LOCAL_KEY, []));
  const [search, setSearch] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const debouncedSearch = useDebounce(search, 200);

  // Persist notes in offline mode
  useEffect(() => {
    storageSet(LOCAL_KEY, notes);
  }, [notes]);

  // Load notes from Supabase if available and user is logged in
  useEffect(() => {
    (async () => {
      const supabase = await getSupabase();
      if (!supabase || !user) return; // offline or not signed in; keep local notes
      try {
        // Example placeholder for future integration
        // const { data, error } = await supabase.from("notes").select("*").order("updated_at", { ascending: false });
        // if (error) throw error;
        // setNotes(data.map(mapRowToNote));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("[Notes] Failed to fetch from Supabase, staying offline.", e);
      }
    })();
  }, [user]);

  const filteredNotes = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return notes.sort((a, b) => b.updatedAt - a.updatedAt);
    return notes
      .filter(
        (n) =>
          (n.title && n.title.toLowerCase().includes(q)) ||
          (n.content && n.content.toLowerCase().includes(q))
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, debouncedSearch]);

  /**
   * PUBLIC_INTERFACE
   * selectNote
   * Set the current note selection by id.
   */
  const selectNote = useCallback((id) => setSelectedNoteId(id), []);

  /**
   * PUBLIC_INTERFACE
   * createNote
   * Creates a new note (offline) and selects it. When Supabase is ready, insert there and refresh.
   */
  const createNote = useCallback(async (partial = {}) => {
    const now = Date.now();
    const newNote = {
      id: "local-" + now,
      title: partial.title || "",
      content: partial.content || "",
      createdAt: now,
      updatedAt: now,
      userId: user?.id || null,
    };

    const supabase = await getSupabase();
    if (supabase && user) {
      try {
        // const { data, error } = await supabase.from("notes").insert({
        //   title: newNote.title,
        //   content: newNote.content,
        //   user_id: user.id,
        // }).select().single();
        // if (error) throw error;
        // const mapped = mapRowToNote(data);
        // setNotes((prev) => [mapped, ...prev]);
        // setSelectedNoteId(mapped.id);
        // return mapped;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("[Notes] Supabase insert failed, using offline.", e);
      }
    }

    setNotes((prev) => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    return newNote;
  }, [user]);

  /**
   * PUBLIC_INTERFACE
   * updateNote
   * Updates title/content of a note by id.
   */
  const updateNote = useCallback(async (id, patch) => {
    setNotes((prev) => {
      const idx = prev.findIndex((n) => n.id === id);
      if (idx === -1) return prev;
      const updated = { ...prev[idx], ...patch, updatedAt: Date.now() };
      const next = [...prev];
      next[idx] = updated;
      return next;
    });

    const supabase = await getSupabase();
    if (supabase && user) {
      try {
        // await supabase.from("notes").update({
        //   title: patch.title,
        //   content: patch.content,
        //   updated_at: new Date().toISOString(),
        // }).eq("id", id);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("[Notes] Supabase update failed (non-blocking).", e);
      }
    }
  }, [user]);

  /**
   * PUBLIC_INTERFACE
   * deleteNote
   * Deletes a note by id.
   */
  const deleteNote = useCallback(async (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);

    const supabase = await getSupabase();
    if (supabase && user) {
      try {
        // await supabase.from("notes").delete().eq("id", id);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("[Notes] Supabase delete failed (non-blocking).", e);
      }
    }
  }, [user, selectedNoteId]);

  const value = useMemo(
    () => ({
      notes,
      filteredNotes,
      search,
      setSearch,
      selectedNoteId,
      selectNote,
      createNote,
      updateNote,
      deleteNote,
    }),
    [notes, filteredNotes, search, selectedNoteId, selectNote, createNote, updateNote, deleteNote]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

// Helper for future mapping if needed
// function mapRowToNote(row) {
//   return {
//     id: row.id,
//     title: row.title || "",
//     content: row.content || "",
//     createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
//     updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : Date.now(),
//     userId: row.user_id || null,
//   };
// }
