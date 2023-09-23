import { useMemo, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Modal,
  Stack,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import useNote from "../hooks/useNote";
import Note from "../components/Note";
import ReactSelect from "react-select";

export default function Home() {
  const { notes, allTags, deleteTag, updateTag } = useNote();

  const [filter, setFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          filter === "" ||
          (note.title.toLowerCase().includes(filter.toLowerCase()) &&
            selectedTags.length === 0) ||
          selectedTags.every((tag) => note.tags.includes(tag))
      ),

    [notes, filter, selectedTags]
  );

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2>Notes</h2>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="new">
              <Button>Create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={() => setShow(true)}>
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={allTags.map((tag) => {
                  return { label: tag.label, value: tag.label };
                })}
                onChange={(e) => setSelectedTags(e.map((l) => l.label))}
                closeMenuOnSelect={false}
                value={selectedTags.map((tag) => {
                  return { label: tag, value: tag };
                })}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <Note {...note} />
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Stack gap={2}>
              {allTags.map((tag) => (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control
                      type="text"
                      value={tag.label}
                      onChange={(e) => updateTag(tag.id, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteTag(tag.id)}
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              ))}
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
