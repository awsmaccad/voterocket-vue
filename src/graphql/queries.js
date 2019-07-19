// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCandidate = `query GetCandidate($id: ID!) {
  getCandidate(id: $id) {
    id
    name
    description
    votes
  }
}
`;
export const listCandidates = `query ListCandidates(
  $filter: ModelCandidateFilterInput
  $limit: Int
  $nextToken: String
) {
  listCandidates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      votes
    }
    nextToken
  }
}
`;
