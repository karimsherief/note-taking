import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import { NewNote, Home, NoteDetails, NoteEdit, NotesError } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="new" element={<NewNote />} />
      <Route path=":id" errorElement={<NotesError />}>
        <Route index element={<NoteDetails />} />
        <Route path="edit" element={<NoteEdit />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  ),
  { basename: "/note-taking/" }
);

export default function App() {
  return <RouterProvider router={router} />;
}
