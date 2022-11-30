import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `EU Public Code`,
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-developers-italia-api",
      options: {
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "pages",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: "speed",

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
        {
          allSoftware {
            edges {
              node {
                id
                publiccodeYml {
                  url
                  name
                  categories
                  logo
                  legal {
                    license
                  }
                  releaseDate
                  developmentStatus
                  intendedAudience {
                    scope
                  }
                  description {
                    it {
                      genericName
                      features
                      longDescription
                      localisedName
                      shortDescription
                      screenshots
                    }
                    en {
                      genericName
                      features
                      longDescription
                      localisedName
                      shortDescription
                      screenshots
                    }
                    fr {
                      genericName
                      features
                      longDescription
                      shortDescription
                      screenshots
                    }
                    nl {
                      genericName
                      features
                      longDescription
                      localisedName
                      shortDescription
                    }
                  }
                }
              }
            }
          }
        }`,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "id",

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: [
          "localisedNames",
          "features",
          "longDescriptions",
          "shortDescriptions",
          "name",
        ],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ["id", "publiccode"],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allSoftware.edges.map((edge) => ({
            id: edge.node.id,
            name: edge.node.publiccodeYml.name,
            publiccode: {
              ...edge.node.publiccodeYml,
              license: edge.node.publiccodeYml.legal.license,
              releaseDate: edge.node.publiccodeYml.releaseDate,
            },
            localisedNames: Object.keys(edge.node.publiccodeYml.description).map(
              (x) => edge.node.publiccodeYml.description[x]?.localisedName
            ),
            features: Object.keys(edge.node.publiccodeYml.description).map(
              (x) => edge.node.publiccodeYml.description[x]?.features
            ),
            longDescriptions: Object.keys(edge.node.publiccodeYml.description).map(
              (x) => edge.node.publiccodeYml.description[x]?.longDescription
            ),
            shortDescriptions: Object.keys(
              edge.node.publiccodeYml.description
            ).map((x) => edge.node.publiccodeYml.description[x]?.shortDescription),
          })),
      },
    },
  ],
};

export default config;
