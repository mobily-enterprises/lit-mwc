import { css } from '../../../node_modules/lit-element/lit-element.js';

const NnInputFile = base => {
  return class Base extends base {
    static get styles() {
      return [...(super.styles || []), css`
        `];
    }

  };
};

var nnInputFile = {
  NnInputFile: NnInputFile
};
export { nnInputFile as $nnInputFile, NnInputFile };