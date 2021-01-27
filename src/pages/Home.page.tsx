import { FlexColumn, FlexRow, Paper } from 'layouts';
import React from 'react';

interface HomePageProps {}
export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <>
      <Paper>
        <h2>Documentation</h2>
        <FlexRow>
          <p>
            This is page provides basic documentation regarding the use of this
            template for creating scalable react with redux applications.
          </p>
        </FlexRow>
        <h2>Dependencies:</h2>
        <FlexRow>
          <FlexColumn>
            <ul>
              <li>React (obviously)</li>
              <li>React Router</li>
              <li>React Helmet</li>
              <li>Redux</li>
              <li>SASS (node-sass)</li>
              <li>De-formed Validations (AmplifyCP package)</li>
              <li>Ramda</li>
              <li>fp-tools (AmplifyCP package)</li>
              <li>No Mouse Days</li>
            </ul>
          </FlexColumn>
        </FlexRow>
        <h2>Structure:</h2>
        <FlexRow>
          <FlexColumn>
            <p>
              This template is a redux-centric approach to building a react app.
              All API calls, loaders, and notifications are pre-built to go
              through redux enabling ease of scalability. This reduces both the
              need and ability to hack a solution that may be efficient in the
              short term but will undoubtedly come back to haunt you.
            </p>
            <p>
              You will also find that all utilities are curried to promote as
              much functional programming as you are comfortable with. FP can
              take some getting used to if you are new to it, but over the
              course of a long project will provide extended code coverage,
              fewer test-writing, and easier to maintain code.
            </p>
            <p>
              It is highly discouraged to rely on heavy package dependencies as
              these have not only caused issues with versioning in the past but
              also can come with heavy performance costs. Packages that Google
              has already vocally warned developers against include Lodash and
              Moment.js due to their huge size creating slower loading speeds on
              slower / older devices.
            </p>
            <p>
              While CSS in JS is quite popular, SASS with BEM is recommended to
              enhance separation of concerns in the code base and encourage more
              abstraction and less specialization, reducing a common source of
              redundancy.
            </p>
          </FlexColumn>
        </FlexRow>
        <h2>Redux:</h2>
        <FlexRow>
          <FlexColumn>
            <p>
              All API services are handled through redux, therefore, to add new
              endpoints from the API, 3 files will handle the loading,
              normalization, and selecting of the data:
            </p>
            <ul>
              <li>Action (handles loading)</li>
              <li>Middleware (handles transformations / dependent actions)</li>
              <li>Reducer (handles storing / selecting)</li>
            </ul>
            <h3>Actions</h3>
            <p>
              Actions will dispatch ApiRequest actions containing the feature
              name (the key), a description for loading and error messaging, the
              method, body, and url. No asynchronous code is necessary to handle
              API requests, rather, API middleware will handle every request
              automatically and dispatch ApiSuccess or ApiError actions.
            </p>
            <h3>Middleware</h3>
            <p>
              Middleware in Redux is the most commonly under-utilized but also
              most powerful feature of Redux as a functional messaging loop.
            </p>
          </FlexColumn>
        </FlexRow>
        <h2>Examples:</h2>
        <FlexRow>
          <p>
            Example code are contained within folders titled "examples" and
            easily removed. Feel free to peruse them to get a feeling for the
            general architecture.
          </p>
        </FlexRow>
        <h2>Additional Resources</h2>
        <FlexRow>
          <p>
            The following is a list of available resources to provide additional
            information and techniques that will both aid the use of this
            template as well as better understand why it is laid out in this
            way:
          </p>
        </FlexRow>
      </Paper>
    </>
  );
};
