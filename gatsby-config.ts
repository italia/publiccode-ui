import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Publiccode UI`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-transformer-yaml", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }, {
    resolve: "gatsby-source-remote-file",
    options: {
      url: "https://crawler.developers.italia.it/softwares.yml",
      name: "software",
      ext: ".yml",
    },
  }, {
    resolve: 'gatsby-plugin-local-search',
    options: {
      // A unique name for the search index. This should be descriptive of
      // what the index contains. This is required.
      name: 'pages',

      // Set the search engine to create the index. This is required.
      // The following engines are supported: flexsearch, lunr
      engine: 'flexsearch',

      // Provide options to the engine. This is optional and only recommended
      // for advanced users.
      //
      // Note: Only the flexsearch engine supports options.
      engineOptions: 'speed',

      // GraphQL query used to fetch all data for the search index. This is
      // required.
      query: `
        {
          allSoftwareYaml {
            edges {
              node {
                id
                publiccode {
                  name
                }
              }
            }
          }
        }
      `,

      // Field used as the reference value for each document.
      // Default: 'id'.
      ref: 'id',

      // List of keys to index. The values of the keys are taken from the
      // normalizer function below.
      // Default: all fields
      index: ['name'],

      // List of keys to store and make available in your UI. The values of
      // the keys are taken from the normalizer function below.
      // Default: all fields
      store: ['name'],

      // Function used to map the result from the GraphQL query. This should
      // return an array of items to index in the form of flat objects
      // containing properties to index. The objects must contain the `ref`
      // field above (default: 'id'). This is required.
      normalizer: ({ data }) =>
        data.allSoftwareYaml.edges.map((edge) => ({
          id: edge.node.id,
          name: edge.node.publiccode.name,
        })),
      },
    },
  ]
};

export default config;
