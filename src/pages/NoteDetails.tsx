import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import useNote from "../hooks/useNote";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NoteDetails() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const { deleteNote, getNote } = useNote();
  const note = getNote(id);

  function handleDelete() {
    deleteNote(id);
    navigate("/");
  }

  return (
    <Container className="my-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h2>{note.title}</h2>
          <Stack gap={1} direction="horizontal" className="flex-wrap">
            {note.tags.map((tag) => (
              <Badge className="text-truncate" key={tag}>
                {tag}
              </Badge>
            ))}
          </Stack>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="edit">
              <Button variant="primary">Edit</Button>
            </Link>
            <Button onClick={handleDelete} variant="outline-danger">
              Delete
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/")}>
              Back
            </Button>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.body}</ReactMarkdown>
    </Container>
  );
}
