import { GRAPHQL_ENDPOINT } from "../constants";

const { request, gql } = require("graphql-request");

async function getAllProjectsQuery() {
  const endpoint = GRAPHQL_ENDPOINT;
  const query = gql`
    query Projects {
      dropCollections {
        editionSize
        currentTokenId
        vault {
          id
          positiveVotes
          nftAddress
          isUnlocked
          editionSize
        }
        metadataContractURI
      }
      editionCollections {
        creator
        editionSize
        metadataContractURI
        vault {
          id
          positiveVotes
          nftAddress
          isUnlocked
          editionSize
        }
        currentTokenId
        imageURI
        id
      }
    }
  `;

  try {
    const data = await request(endpoint, query, {});
    return data.dropCollections.concat(data.editionCollections);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function getAllProjects() {
  return getAllProjectsQuery()
    .then((projects) => {
      return projects;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
