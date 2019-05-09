/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Subscribe, Provider } from "unstated";
import CaptainContainer from "store/CaptainContainer";
import OutputDayContainer from "components/captain/OutputDayContainer";

const CaptainView = () => {
  return (
    <main
      css={{
        paddingTop: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Provider>
        <Subscribe to={[CaptainContainer]}>
          {captain => <OutputDayContainer captain={captain} />}
        </Subscribe>
      </Provider>
    </main>
  );
};

export default CaptainView;
