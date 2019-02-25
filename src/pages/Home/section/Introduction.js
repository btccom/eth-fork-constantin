import React from 'react';
import Ts from 'Trans';
import Chunk from '../../../components/ui/Chunk';
const Introduction = () => {
  return (
    <div className="intro-container card" id="introduction">
      <h3>
        <Ts transKey="pages.introduction" />
      </h3>
      <div className="intro-content">
        <h4>
          <Ts transKey="pages.introPrg1Title" />
        </h4>
        <Ts transKey="pages.introPrg1" tagName="p" />
        <h4>
          <Ts transKey="pages.introPrg2Title" />
        </h4>
        <Ts transKey="pages.introPrg2" tagName="p" />
        <Ts transKey="pages.introPrg2eip145" tagName="p" />
        <Ts transKey="pages.introPrg2eip1014" />
        <Ts transKey="pages.introPrg2eip1052" tagName="p" />
        {/* <Ts transKey="pages.introPrg2eip1283" tagName="p" /> */}
        <Ts transKey="pages.introPrg2eip1234" tagName="p" />
        <ul className="eip-info">
          <li>
            <Chunk type="blue">
              <a href="https://eips.ethereum.org/EIPS/eip-145" target="_blank">
                <Ts
                  transKey="pages.eipNum"
                  values={{ num: 145 }}
                  tagName="h3"
                />
                <Ts transKey="pages.eipBrief145" />
              </a>
            </Chunk>
          </li>
          <li>
            <Chunk type="green">
              <a href="https://eips.ethereum.org/EIPS/eip-1014" target="_blank">
                <Ts
                  transKey="pages.eipNum"
                  values={{ num: 1014 }}
                  tagName="h3"
                />
                <Ts transKey="pages.eipBrief1014" />
              </a>
            </Chunk>
          </li>
          <li>
            <Chunk type="yellow">
              <a href="https://eips.ethereum.org/EIPS/eip-1052" target="_blank">
                <Ts
                  transKey="pages.eipNum"
                  values={{ num: 1052 }}
                  tagName="h3"
                />
                <Ts transKey="pages.eipBrief1052" />
              </a>
            </Chunk>
          </li>
          {/* <li>
            <Chunk type="red">
              <a href="https://eips.ethereum.org/EIPS/eip-1283" target="_blank">
                <Ts
                  transKey="pages.eipNum"
                  values={{ num: 1283 }}
                  tagName="h3"
                />
                <Ts transKey="pages.eipBrief1283" />
              </a>
            </Chunk>
          </li> */}
          <li>
            <Chunk type="purple">
              <a href="https://eips.ethereum.org/EIPS/eip-1234" target="_blank">
                <Ts
                  transKey="pages.eipNum"
                  values={{ num: 1234 }}
                  tagName="h3"
                />
                <Ts transKey="pages.eipBrief1234" />
              </a>
            </Chunk>
          </li>
        </ul>
        <p className="remark">
          <Ts transKey="pages.remove1283Tip" />
        </p>
        <h4>
          <Ts transKey="pages.introPrg3Title" />
        </h4>
        <Ts transKey="pages.introPrg3SubTitle" tagName="p" />

        <Ts transKey="pages.introPrg3Item1" tagName="p" />
        <Ts transKey="pages.introPrg3Item2" tagName="p" />
        <Ts transKey="pages.introPrg3Item3" tagName="p" />
        <p className="sub-item">
          <Ts transKey="pages.introPrg3Item3Sub1" />
        </p>
        <p className="sub-item">
          <Ts transKey="pages.introPrg3Item3Sub2" />
        </p>
        <Ts transKey="pages.introPrg3Item4" tagName="p" />
      </div>
    </div>
  );
};

export default Introduction;
