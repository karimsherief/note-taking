import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Stack, Row, Col, Container } from "react-bootstrap";
import { FormEvent, useState } from "react";
import CreatableSelect from "react-select/creatable";
import useNote from "../hooks/useNote";

export default function NewNote() {
  const navigate = useNavigate();
  const { addNote, allTags } = useNote();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    addNote(title, tags, body);
    navigate("/");
  }

  return (
    <Container className="my-4">
      <h1>New Note</h1>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group id="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id="tags">
                <Form.Label>Title</Form.Label>
                <CreatableSelect
                  isMulti
                  onChange={(e) => setTags(e.map((tag) => tag.label))}
                  options={allTags.map((tag) => {
                    return { value: tag.label, label: tag.label };
                  })}
                  value={tags.map((tag) => {
                    return { label: tag, value: tag };
                  })}
                  onCreateOption={(label) =>
                    setTags((prev) => [...prev, label])
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group id="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={15}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Cancel</Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </Container>
  );
}
