import Head from "next/head";
import { Button, Card, Badge } from "react-bootstrap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import now from "performance-now";

export default function Home({ userInfo, timeTaken }) {
  return (
    <>
      <Head>
        <title>Fetch a User with React.js - Next.js</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Fetch user info with React.js and Next.js"
        />
      </Head>
      <div className="App">
        <div className="title-style">
          <h1>User Details</h1>
          <h6 className="mb-2 text-muted">With React.js (with Next.js)</h6>
          <p>
            Time taken to fetch the user:{" "}
            {timeTaken === null ? <i>calculating</i> : <>{timeTaken}s</>}{" "}
          </p>
        </div>
        <br />
        {userInfo.hasOwnProperty("results") ? (
          userInfo.results.map((user) => (
            <>
              <div className="d-flex justify-content-center">
                <Card style={{ width: "fit-content", textAlign: "justify" }}>
                  <Card.Body>
                    <Card.Header>
                      <Card.Title>
                        <img src={user.picture.medium} alt="user-pic" />
                        &nbsp;
                        {user.name.title} {user.name.first} {user.name.last}
                      </Card.Title>
                    </Card.Header>

                    <br />
                    <p>
                      <b>Gender:</b>{" "}
                      {user.gender.charAt(0).toUpperCase() +
                        user.gender.slice(1)}
                    </p>
                    <p>
                      <b>Date of Birth:</b>{" "}
                      {new Date(user.dob.date).toLocaleString("en-US", {
                        timeZone: "Asia/Jakarta",
                      })}
                    </p>
                    <p>
                      <b>Email:</b> {user.email}
                    </p>
                    <p>
                      <b>Country:</b> {user.location.country}
                    </p>
                  </Card.Body>
                </Card>
              </div>
              <br />
              <Button
                variant="outline-danger"
                onClick={() => window.location.reload()}
              >
                Click here to display different user
              </Button>
            </>
          ))
        ) : (
          <p>
            <AiOutlineLoading3Quarters className="App-logo" />
            &nbsp; Loading user info...
          </p>
        )}
        <br />
        <br />
        <hr />
        <Badge bg="warning">
          Note: The above users are fetched from a random user api.
        </Badge>
        <br />
        <Badge bg="warning">
          Learn more about how to make an API call with react 👉🏻
          <a
            href="https://reactjs.org/docs/faq-ajax.html"
            rel="noreferrer"
            target="_blank"
          >
            https://reactjs.org/docs/faq-ajax.html
          </a>
        </Badge>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const start = now();
  let resp = await fetch("https://api.randomuser.me/");
  let userInfo = await resp.json();
  const end = now();
  let timeTaken = (end - start).toFixed(3) / 1000;
  return { props: { userInfo, timeTaken } };
}
