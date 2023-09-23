import { useState, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Stack, Form, Button, Container } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import useNote from "../hooks/useNote";

export default function NoteEdit() {
  const { id } = useParams() as { id: string };

  const navigate = useNavigate();

  const { allTags, getNote, updateNote } = useNote();

  const note = getNote(id);

  const [title, setTitle] = useState(note.title);
  const [tags, setTags] = useState<string[]>(note.tags);
  const [body, setBody] = useState(note.body);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateNote({
      id: id,
      title: title,
      body: body,
      tags: tags,
    });
    navigate(-1);
  }

  return (
    <Container className="my-4">
      <h2>Edit Note</h2>
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
                    return { label: tag.label, value: tag.label };
                  })}
                  defaultValue={tags.map((tag) => {
                    return { label: tag, value: tag };
                  })}
                  value={tags.map((tag) => {
                    return { label: tag, value: tag };
                  })}
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
            <Link to="..">
              <Button variant="outline-secondary">Cancel</Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </Container>
  );
}
