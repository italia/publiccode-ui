import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

const SoftwareIndex = () => {
  const { allSoftwareYaml: software } = useStaticQuery(graphql`
    query {
      allSoftwareYaml {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  return (
    <>
      <ul>
        {software.edges.map((edge, i) => (
          <li key={i}>
            <Link to={`/${edge.node.slug}`}>{edge.node.slug}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SoftwareIndex;
