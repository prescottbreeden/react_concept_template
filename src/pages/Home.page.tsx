import { FlexColumn, FlexRow, Paper } from 'layouts';
import React from 'react';

interface HomePageProps {}
export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <>
      <Paper>
        <h2>This Repository:</h2>
        <FlexRow>
          <p>
            This is a react template for creating a scalable react with redux
            application.
          </p>
        </FlexRow>
        <h2>Dependencies:</h2>
        <FlexRow>
          <FlexColumn>
            <p>
              Very few dependencies are baked into this template, however
              notable packages include:
            </p>
            <ul>
              <li>React (obviously)</li>
              <li>React Router</li>
              <li>React Helmet</li>
              <li>Redux</li>
              <li>SASS / node-sass</li>
              <li>De-formed Validations</li>
              <li>Ramda</li>
              <li>fp-tools</li>
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
