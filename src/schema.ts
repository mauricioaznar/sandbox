import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  cats: Array<Cat>;
};

export type Cat = {
  __typename?: 'Cat';
  _id: Scalars['String'];
  breed: Scalars['String'];
  characteristics: Characteristics;
};

export type Characteristics = {
  __typename?: 'Characteristics';
  coat: Scalars['String'];
  color: Scalars['String'];
  lifespan: Scalars['String'];
  size: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCat: Cat;
  deleteCat: Cat;
  updateCat: Cat;
};


export type MutationCreateCatArgs = {
  catInput: CatInput;
};


export type MutationDeleteCatArgs = {
  _id: Scalars['String'];
};


export type MutationUpdateCatArgs = {
  _id: Scalars['String'];
  catInput: CatInput;
};

export type CatInput = {
  breed: Scalars['String'];
  characteristics: CharacteristicsInput;
};

export type CharacteristicsInput = {
  coat: Scalars['String'];
  color: Scalars['String'];
  lifespan: Scalars['String'];
  size: Scalars['String'];
};


export const GetCatsDocument = gql`
    query GetCats {
  cats {
    _id
    breed
    characteristics {
      color
      coat
      lifespan
      size
    }
  }
}
    `;

/**
 * __useGetCatsQuery__
 *
 * To run a query within a React component, call `useGetCatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCatsQuery(baseOptions?: Apollo.QueryHookOptions<GetCatsQuery, GetCatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCatsQuery, GetCatsQueryVariables>(GetCatsDocument, options);
      }
export function useGetCatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCatsQuery, GetCatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCatsQuery, GetCatsQueryVariables>(GetCatsDocument, options);
        }
export type GetCatsQueryHookResult = ReturnType<typeof useGetCatsQuery>;
export type GetCatsLazyQueryHookResult = ReturnType<typeof useGetCatsLazyQuery>;
export type GetCatsQueryResult = Apollo.QueryResult<GetCatsQuery, GetCatsQueryVariables>;
export const DeleteCatDocument = gql`
    mutation DeleteCat($id: String!) {
  deleteCat(_id: $id) {
    breed
  }
}
    `;
export type DeleteCatMutationFn = Apollo.MutationFunction<DeleteCatMutation, DeleteCatMutationVariables>;

/**
 * __useDeleteCatMutation__
 *
 * To run a mutation, you first call `useDeleteCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCatMutation, { data, loading, error }] = useDeleteCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCatMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCatMutation, DeleteCatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCatMutation, DeleteCatMutationVariables>(DeleteCatDocument, options);
      }
export type DeleteCatMutationHookResult = ReturnType<typeof useDeleteCatMutation>;
export type DeleteCatMutationResult = Apollo.MutationResult<DeleteCatMutation>;
export type DeleteCatMutationOptions = Apollo.BaseMutationOptions<DeleteCatMutation, DeleteCatMutationVariables>;
export type GetCatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCatsQuery = { __typename?: 'Query', cats: Array<{ __typename?: 'Cat', _id: string, breed: string, characteristics: { __typename?: 'Characteristics', color: string, coat: string, lifespan: string, size: string } }> };

export type DeleteCatMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCatMutation = { __typename?: 'Mutation', deleteCat: { __typename?: 'Cat', breed: string } };
