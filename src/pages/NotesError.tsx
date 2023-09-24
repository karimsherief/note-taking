import { Button, Container } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";

export default function NotesError() {
  const error = useRouteError() as ErrorEvent;
  return (
    <Container className="my-5 d-flex flex-column justify-content-center align-items-center">
      <h2>Oops! </h2>
      <p>{error.message}</p>
      <Link to="/">
        <Button variant="outline-primary">Go to home page</Button>
      </Link>
    </Container>
  );
}
