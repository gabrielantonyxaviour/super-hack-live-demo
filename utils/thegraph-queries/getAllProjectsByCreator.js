const { request, gql } = require("graphql-request");
import { GRAPHQL_ENDPOINT } from "../constants";

async function getAllProjectsByCreatorQuery(creatorAddress) {
  const endpoint = GRAPHQL_ENDPOINT;
  const query = gql`
    query ProjectsByCreator($creator: Bytes!) {
      dropCollections(where: { creator: $creator }) {
        creator
        dropAddress
        editionSize
        currentTokenId
        vaultAddress
        metadataContractURI
      }
      editionCollections(where: { creator: $creator }) {
        creator
        editionAddress
        editionSize
        metadataContractURI
        vaultAddress
        currentTokenId
      }
    }
  `;

  try {
    const data = await request(endpoint, query, { creator: creatorAddress });
    console.log("Data:", data);
    return data.dropCollections.concat(data.editionCollections);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function getAllProjectsByCreator(creatorAddress) {
  return getAllProjectsByCreatorQuery(creatorAddress)
    .then((projects) => {
      return projects;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
