import { Link } from "react-router-dom";
import { Card, Badge, Stack } from "react-bootstrap";
import { NotesProps } from "../context/NoteContext";

export default function Note({ id, title, tags }: NotesProps) {
  return (
    <Card as={Link} to={id} className="h-100 text-reset text-decoration-none">
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <Card.Title className="fs-5">{title}</Card.Title>
          <Stack
            gap={1}
            direction="horizontal"
            className="justify-content-center flex-wrap"
          >
            {tags.map((tag) => (
              <Badge className="text-truncate" key={tag}>
                {tag}
              </Badge>
            ))}
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}
