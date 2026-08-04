import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteClient from "@/app/notes/Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function Notes() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  );
}
