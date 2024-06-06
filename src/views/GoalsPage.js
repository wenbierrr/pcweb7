import { Container } from "react-bootstrap";
import BBnavbar from "./components/navbar";

export default function GoalsPage() {
  return (
    <>
        <BBnavbar/>
        <Container><h1 className="my-3">This is Goals Page</h1></Container>
    </>
  );
}
