const fetch = require('node-fetch');
const yaml = require('js-yaml');

const SOFTWARE_NODE_TYPE = `Software`;

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions;

  let pageAfter = '';

  do {
    const res = await fetch(`https://api.developers.italia.it/v1/software${pageAfter}`);
    if (!res.ok) {
      console.log('TODO: error handling: ');
    }

    const json = await res.json();

    json['data'].forEach((software) => {
      software.publiccodeYml = yaml.load(software.publiccodeYml);

      createNode({
        ...software,
        id: createNodeId(`${SOFTWARE_NODE_TYPE}-${software.id}`),
        parent: null,
        children: [],
        internal: {
          type: SOFTWARE_NODE_TYPE,
          contentDigest: createContentDigest(software),
        },
      });
    });

    pageAfter = json['links']['next'];
  } while (pageAfter !== '' && pageAfter !== null);
};
