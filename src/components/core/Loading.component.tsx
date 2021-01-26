import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectLoader } from 'redux/reducers/core/loader.reducer';
import { divide } from 'ramda';
import { LoaderAction } from 'types/core/loaderAction.type';
import { add, compose, head, prop } from 'fp-tools';
import { FlexColumn, FlexRow } from 'layouts';

/*  Example Displays:
 *    svg animation
 *    percentComplete
 *    description of current request (if provided)
 */
export const Loading: FC = () => {
  // --[ local state ]---------------------------------------------------------
  const loaders: LoaderAction[] = useSelector(selectLoader);

  // --[ component logic ]-----------------------------------------------------
  const percentComplete = compose(
    Math.floor,
    divide(100),
    add(1),
    prop('length')
  );

  const currentlyLoading = compose(prop('description'), head);

  // --[ render logic ]--------------------------------------------------------
  return loaders.length > 0 ? (
    <div className="loading">
      <div className="loading__content">
        <FlexRow>
          <FlexColumn>
            <p>LOADING</p>
            <div className="loader loader--style8" title="loading">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xlinkHref="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="48px"
                height="60px"
                viewBox="0 0 24 30"
                xmlSpace="preserve"
              >
                <rect
                  x="0"
                  y="10"
                  width="4"
                  height="10"
                  fill="#333"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    attributeType="XML"
                    values="0.2; 1; .2"
                    begin="0s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="height"
                    attributeType="XML"
                    values="10; 20; 10"
                    begin="0s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    attributeType="XML"
                    values="10; 5; 10"
                    begin="0s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="8"
                  y="10"
                  width="4"
                  height="10"
                  fill="#333"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    attributeType="XML"
                    values="0.2; 1; .2"
                    begin="0.15s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="height"
                    attributeType="XML"
                    values="10; 20; 10"
                    begin="0.15s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    attributeType="XML"
                    values="10; 5; 10"
                    begin="0.15s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect
                  x="16"
                  y="10"
                  width="4"
                  height="10"
                  fill="#333"
                  opacity="0.2"
                >
                  <animate
                    attributeName="opacity"
                    attributeType="XML"
                    values="0.2; 1; .2"
                    begin="0.3s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="height"
                    attributeType="XML"
                    values="10; 20; 10"
                    begin="0.3s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    attributeType="XML"
                    values="10; 5; 10"
                    begin="0.3s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </div>
          </FlexColumn>
        </FlexRow>
        <p>{percentComplete(loaders)}%</p>
        <br />
        {currentlyLoading(loaders) && <p>{currentlyLoading(loaders)}</p>}
      </div>
    </div>
  ) : null;
};
