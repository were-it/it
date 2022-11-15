import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from './lib/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  /** Get the currently signed-in user */
  getMe?: Maybe<User>;
  /** Get a user */
  getUser?: Maybe<User>;
};


export type RootQueryTypeGetUserArgs = {
  username: Scalars['String'];
};

/** User */
export type User = {
  __typename?: 'User';
  /** The user's email address. */
  email: Scalars['String'];
  id: Scalars['ID'];
  /** The user's username. */
  username: Scalars['String'];
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'RootQueryType', getMe?: { __typename?: 'User', id: string, email: string, username: string } | null };

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'RootQueryType', getUser?: { __typename?: 'User', id: string, username: string } | null };


export const GetMeDocument = `
    query GetMe {
  getMe {
    id
    email
    username
  }
}
    `;
export const useGetMeQuery = <
      TData = GetMeQuery,
      TError = unknown
    >(
      variables?: GetMeQueryVariables,
      options?: UseQueryOptions<GetMeQuery, TError, TData>
    ) =>
    useQuery<GetMeQuery, TError, TData>(
      variables === undefined ? ['GetMe'] : ['GetMe', variables],
      fetcher<GetMeQuery, GetMeQueryVariables>(GetMeDocument, variables),
      options
    );
export const GetUserDocument = `
    query GetUser($username: String!) {
  getUser(username: $username) {
    id
    username
  }
}
    `;
export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      variables: GetUserQueryVariables,
      options?: UseQueryOptions<GetUserQuery, TError, TData>
    ) =>
    useQuery<GetUserQuery, TError, TData>(
      ['GetUser', variables],
      fetcher<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables),
      options
    );