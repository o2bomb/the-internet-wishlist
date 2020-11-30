import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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
  heartedEntries: Array<Entry>;
  searchEntries: SearchedEntries;
  entry?: Maybe<Entry>;
  entries: PaginatedEntries;
  hello: Scalars['String'];
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  verifyCaptcha: Scalars['Boolean'];
  me?: Maybe<User>;
};


export type QuerySearchEntriesArgs = {
  sortBy?: Maybe<SortBy>;
  tagFilters?: Maybe<Array<Scalars['Int']>>;
  searchTerm: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryEntryArgs = {
  id: Scalars['Int'];
};


export type QueryEntriesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryTagArgs = {
  id: Scalars['Int'];
};


export type QueryVerifyCaptchaArgs = {
  token: Scalars['String'];
};

export type Entry = {
  __typename?: 'Entry';
  id: Scalars['Float'];
  creatorId?: Maybe<Scalars['Float']>;
  creator?: Maybe<User>;
  title: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  points: Scalars['Float'];
  reportCount: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  reports: Array<Report>;
  tags: Array<Tag>;
  isHearted: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  displayName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  reason?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float'];
  creator?: Maybe<User>;
  displayName: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
};

export type SearchedEntries = {
  __typename?: 'SearchedEntries';
  entries: Array<Entry>;
  searchTerm: Scalars['String'];
};

/** Options to sort search results */
export enum SortBy {
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
  MostHearts = 'MOST_HEARTS',
  LeastHearts = 'LEAST_HEARTS'
}

export type PaginatedEntries = {
  __typename?: 'PaginatedEntries';
  entries: Array<Entry>;
  hasMore: Scalars['Boolean'];
  cursor: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  reportEntry: Scalars['Boolean'];
  tagEntry?: Maybe<Entry>;
  heartEntry?: Maybe<Entry>;
  createEntry: EntryResponse;
  updateEntry?: Maybe<Entry>;
  deleteEntry: Scalars['Boolean'];
  createTag: TagResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationReportEntryArgs = {
  reason?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationTagEntryArgs = {
  tagIds: Array<Scalars['Int']>;
  id: Scalars['Int'];
};


export type MutationHeartEntryArgs = {
  deleteHeart: Scalars['Boolean'];
  id: Scalars['Int'];
};


export type MutationCreateEntryArgs = {
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationUpdateEntryArgs = {
  text: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteEntryArgs = {
  id: Scalars['Int'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type EntryResponse = {
  __typename?: 'EntryResponse';
  errors?: Maybe<Array<FieldError>>;
  entry?: Maybe<Entry>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type TagResponse = {
  __typename?: 'TagResponse';
  errors?: Maybe<Array<FieldError>>;
  tag?: Maybe<Tag>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type PartialTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'id' | 'displayName'>
);

export type RegularEntryFragment = (
  { __typename?: 'Entry' }
  & Pick<Entry, 'id' | 'creatorId' | 'title' | 'text' | 'points' | 'isHearted' | 'createdAt' | 'updatedAt'>
  & { creator?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, tags: Array<(
    { __typename?: 'Tag' }
    & PartialTagFragment
  )> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'id' | 'displayName' | 'name' | 'createdAt'>
  & { creator?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'displayName' | 'username' | 'email'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type CreateEntryMutationVariables = Exact<{
  title: Scalars['String'];
  text?: Maybe<Scalars['String']>;
}>;


export type CreateEntryMutation = (
  { __typename?: 'Mutation' }
  & { createEntry: (
    { __typename?: 'EntryResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, entry?: Maybe<(
      { __typename?: 'Entry' }
      & RegularEntryFragment
    )> }
  ) }
);

export type CreateTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTagMutation = (
  { __typename?: 'Mutation' }
  & { createTag: (
    { __typename?: 'TagResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, tag?: Maybe<(
      { __typename?: 'Tag' }
      & RegularTagFragment
    )> }
  ) }
);

export type DeleteEntryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEntryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteEntry'>
);

export type HeartEntryMutationVariables = Exact<{
  id: Scalars['Int'];
  deleteHeart: Scalars['Boolean'];
}>;


export type HeartEntryMutation = (
  { __typename?: 'Mutation' }
  & { heartEntry?: Maybe<(
    { __typename?: 'Entry' }
    & Pick<Entry, 'id' | 'points' | 'isHearted'>
  )> }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type TagEntryMutationVariables = Exact<{
  id: Scalars['Int'];
  tagIds: Array<Scalars['Int']>;
}>;


export type TagEntryMutation = (
  { __typename?: 'Mutation' }
  & { tagEntry?: Maybe<(
    { __typename?: 'Entry' }
    & Pick<Entry, 'id'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & PartialTagFragment
    )> }
  )> }
);

export type UpdateEntryMutationVariables = Exact<{
  id: Scalars['Int'];
  text: Scalars['String'];
}>;


export type UpdateEntryMutation = (
  { __typename?: 'Mutation' }
  & { updateEntry?: Maybe<(
    { __typename?: 'Entry' }
    & RegularEntryFragment
  )> }
);

export type GetEntriesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetEntriesQuery = (
  { __typename?: 'Query' }
  & { entries: (
    { __typename?: 'PaginatedEntries' }
    & Pick<PaginatedEntries, 'hasMore' | 'cursor'>
    & { entries: Array<(
      { __typename?: 'Entry' }
      & RegularEntryFragment
    )> }
  ) }
);

export type GetEntryQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetEntryQuery = (
  { __typename?: 'Query' }
  & { entry?: Maybe<(
    { __typename?: 'Entry' }
    & RegularEntryFragment
  )> }
);

export type GetHeartedEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHeartedEntriesQuery = (
  { __typename?: 'Query' }
  & { heartedEntries: Array<(
    { __typename?: 'Entry' }
    & RegularEntryFragment
  )> }
);

export type GetTagQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetTagQuery = (
  { __typename?: 'Query' }
  & { tag?: Maybe<(
    { __typename?: 'Tag' }
    & RegularTagFragment
  )> }
);

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = (
  { __typename?: 'Query' }
  & { tags: Array<(
    { __typename?: 'Tag' }
    & PartialTagFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type SearchEntriesQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  searchTerm: Scalars['String'];
  tagFilters?: Maybe<Array<Scalars['Int']>>;
  sortBy?: Maybe<SortBy>;
}>;


export type SearchEntriesQuery = (
  { __typename?: 'Query' }
  & { searchEntries: (
    { __typename?: 'SearchedEntries' }
    & Pick<SearchedEntries, 'searchTerm'>
    & { entries: Array<(
      { __typename?: 'Entry' }
      & RegularEntryFragment
    )> }
  ) }
);

export type VerifyCaptchaQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyCaptchaQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'verifyCaptcha'>
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  displayName
  username
  email
}
    `;
export const PartialTagFragmentDoc = gql`
    fragment PartialTag on Tag {
  id
  displayName
}
    `;
export const RegularEntryFragmentDoc = gql`
    fragment RegularEntry on Entry {
  id
  creatorId
  creator {
    ...RegularUser
  }
  tags {
    ...PartialTag
  }
  title
  text
  points
  isHearted
  createdAt
  updatedAt
}
    ${RegularUserFragmentDoc}
${PartialTagFragmentDoc}`;
export const RegularTagFragmentDoc = gql`
    fragment RegularTag on Tag {
  id
  creator {
    ...RegularUser
  }
  displayName
  name
  createdAt
}
    ${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const CreateEntryDocument = gql`
    mutation CreateEntry($title: String!, $text: String) {
  createEntry(title: $title, text: $text) {
    errors {
      ...RegularError
    }
    entry {
      ...RegularEntry
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularEntryFragmentDoc}`;
export type CreateEntryMutationFn = Apollo.MutationFunction<CreateEntryMutation, CreateEntryMutationVariables>;

/**
 * __useCreateEntryMutation__
 *
 * To run a mutation, you first call `useCreateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntryMutation, { data, loading, error }] = useCreateEntryMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>) {
        return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, baseOptions);
      }
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>;
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($name: String!) {
  createTag(name: $name) {
    errors {
      ...RegularError
    }
    tag {
      ...RegularTag
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularTagFragmentDoc}`;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, baseOptions);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const DeleteEntryDocument = gql`
    mutation DeleteEntry($id: Int!) {
  deleteEntry(id: $id)
}
    `;
export type DeleteEntryMutationFn = Apollo.MutationFunction<DeleteEntryMutation, DeleteEntryMutationVariables>;

/**
 * __useDeleteEntryMutation__
 *
 * To run a mutation, you first call `useDeleteEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntryMutation, { data, loading, error }] = useDeleteEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>) {
        return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(DeleteEntryDocument, baseOptions);
      }
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>;
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>;
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<DeleteEntryMutation, DeleteEntryMutationVariables>;
export const HeartEntryDocument = gql`
    mutation HeartEntry($id: Int!, $deleteHeart: Boolean!) {
  heartEntry(id: $id, deleteHeart: $deleteHeart) {
    id
    points
    isHearted
  }
}
    `;
export type HeartEntryMutationFn = Apollo.MutationFunction<HeartEntryMutation, HeartEntryMutationVariables>;

/**
 * __useHeartEntryMutation__
 *
 * To run a mutation, you first call `useHeartEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHeartEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [heartEntryMutation, { data, loading, error }] = useHeartEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      deleteHeart: // value for 'deleteHeart'
 *   },
 * });
 */
export function useHeartEntryMutation(baseOptions?: Apollo.MutationHookOptions<HeartEntryMutation, HeartEntryMutationVariables>) {
        return Apollo.useMutation<HeartEntryMutation, HeartEntryMutationVariables>(HeartEntryDocument, baseOptions);
      }
export type HeartEntryMutationHookResult = ReturnType<typeof useHeartEntryMutation>;
export type HeartEntryMutationResult = Apollo.MutationResult<HeartEntryMutation>;
export type HeartEntryMutationOptions = Apollo.BaseMutationOptions<HeartEntryMutation, HeartEntryMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(options: {username: $username, password: $password, email: $email}) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TagEntryDocument = gql`
    mutation TagEntry($id: Int!, $tagIds: [Int!]!) {
  tagEntry(id: $id, tagIds: $tagIds) {
    id
    tags {
      ...PartialTag
    }
  }
}
    ${PartialTagFragmentDoc}`;
export type TagEntryMutationFn = Apollo.MutationFunction<TagEntryMutation, TagEntryMutationVariables>;

/**
 * __useTagEntryMutation__
 *
 * To run a mutation, you first call `useTagEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagEntryMutation, { data, loading, error }] = useTagEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      tagIds: // value for 'tagIds'
 *   },
 * });
 */
export function useTagEntryMutation(baseOptions?: Apollo.MutationHookOptions<TagEntryMutation, TagEntryMutationVariables>) {
        return Apollo.useMutation<TagEntryMutation, TagEntryMutationVariables>(TagEntryDocument, baseOptions);
      }
export type TagEntryMutationHookResult = ReturnType<typeof useTagEntryMutation>;
export type TagEntryMutationResult = Apollo.MutationResult<TagEntryMutation>;
export type TagEntryMutationOptions = Apollo.BaseMutationOptions<TagEntryMutation, TagEntryMutationVariables>;
export const UpdateEntryDocument = gql`
    mutation UpdateEntry($id: Int!, $text: String!) {
  updateEntry(id: $id, text: $text) {
    ...RegularEntry
  }
}
    ${RegularEntryFragmentDoc}`;
export type UpdateEntryMutationFn = Apollo.MutationFunction<UpdateEntryMutation, UpdateEntryMutationVariables>;

/**
 * __useUpdateEntryMutation__
 *
 * To run a mutation, you first call `useUpdateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntryMutation, { data, loading, error }] = useUpdateEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEntryMutation, UpdateEntryMutationVariables>) {
        return Apollo.useMutation<UpdateEntryMutation, UpdateEntryMutationVariables>(UpdateEntryDocument, baseOptions);
      }
export type UpdateEntryMutationHookResult = ReturnType<typeof useUpdateEntryMutation>;
export type UpdateEntryMutationResult = Apollo.MutationResult<UpdateEntryMutation>;
export type UpdateEntryMutationOptions = Apollo.BaseMutationOptions<UpdateEntryMutation, UpdateEntryMutationVariables>;
export const GetEntriesDocument = gql`
    query GetEntries($limit: Int!, $cursor: String) {
  entries(limit: $limit, cursor: $cursor) {
    entries {
      ...RegularEntry
    }
    hasMore
    cursor
  }
}
    ${RegularEntryFragmentDoc}`;

/**
 * __useGetEntriesQuery__
 *
 * To run a query within a React component, call `useGetEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEntriesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetEntriesQuery(baseOptions: Apollo.QueryHookOptions<GetEntriesQuery, GetEntriesQueryVariables>) {
        return Apollo.useQuery<GetEntriesQuery, GetEntriesQueryVariables>(GetEntriesDocument, baseOptions);
      }
export function useGetEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEntriesQuery, GetEntriesQueryVariables>) {
          return Apollo.useLazyQuery<GetEntriesQuery, GetEntriesQueryVariables>(GetEntriesDocument, baseOptions);
        }
export type GetEntriesQueryHookResult = ReturnType<typeof useGetEntriesQuery>;
export type GetEntriesLazyQueryHookResult = ReturnType<typeof useGetEntriesLazyQuery>;
export type GetEntriesQueryResult = Apollo.QueryResult<GetEntriesQuery, GetEntriesQueryVariables>;
export const GetEntryDocument = gql`
    query GetEntry($id: Int!) {
  entry(id: $id) {
    ...RegularEntry
  }
}
    ${RegularEntryFragmentDoc}`;

/**
 * __useGetEntryQuery__
 *
 * To run a query within a React component, call `useGetEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEntryQuery(baseOptions: Apollo.QueryHookOptions<GetEntryQuery, GetEntryQueryVariables>) {
        return Apollo.useQuery<GetEntryQuery, GetEntryQueryVariables>(GetEntryDocument, baseOptions);
      }
export function useGetEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEntryQuery, GetEntryQueryVariables>) {
          return Apollo.useLazyQuery<GetEntryQuery, GetEntryQueryVariables>(GetEntryDocument, baseOptions);
        }
export type GetEntryQueryHookResult = ReturnType<typeof useGetEntryQuery>;
export type GetEntryLazyQueryHookResult = ReturnType<typeof useGetEntryLazyQuery>;
export type GetEntryQueryResult = Apollo.QueryResult<GetEntryQuery, GetEntryQueryVariables>;
export const GetHeartedEntriesDocument = gql`
    query GetHeartedEntries {
  heartedEntries {
    ...RegularEntry
  }
}
    ${RegularEntryFragmentDoc}`;

/**
 * __useGetHeartedEntriesQuery__
 *
 * To run a query within a React component, call `useGetHeartedEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHeartedEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHeartedEntriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHeartedEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GetHeartedEntriesQuery, GetHeartedEntriesQueryVariables>) {
        return Apollo.useQuery<GetHeartedEntriesQuery, GetHeartedEntriesQueryVariables>(GetHeartedEntriesDocument, baseOptions);
      }
export function useGetHeartedEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHeartedEntriesQuery, GetHeartedEntriesQueryVariables>) {
          return Apollo.useLazyQuery<GetHeartedEntriesQuery, GetHeartedEntriesQueryVariables>(GetHeartedEntriesDocument, baseOptions);
        }
export type GetHeartedEntriesQueryHookResult = ReturnType<typeof useGetHeartedEntriesQuery>;
export type GetHeartedEntriesLazyQueryHookResult = ReturnType<typeof useGetHeartedEntriesLazyQuery>;
export type GetHeartedEntriesQueryResult = Apollo.QueryResult<GetHeartedEntriesQuery, GetHeartedEntriesQueryVariables>;
export const GetTagDocument = gql`
    query GetTag($id: Int!) {
  tag(id: $id) {
    ...RegularTag
  }
}
    ${RegularTagFragmentDoc}`;

/**
 * __useGetTagQuery__
 *
 * To run a query within a React component, call `useGetTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTagQuery(baseOptions: Apollo.QueryHookOptions<GetTagQuery, GetTagQueryVariables>) {
        return Apollo.useQuery<GetTagQuery, GetTagQueryVariables>(GetTagDocument, baseOptions);
      }
export function useGetTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagQuery, GetTagQueryVariables>) {
          return Apollo.useLazyQuery<GetTagQuery, GetTagQueryVariables>(GetTagDocument, baseOptions);
        }
export type GetTagQueryHookResult = ReturnType<typeof useGetTagQuery>;
export type GetTagLazyQueryHookResult = ReturnType<typeof useGetTagLazyQuery>;
export type GetTagQueryResult = Apollo.QueryResult<GetTagQuery, GetTagQueryVariables>;
export const GetTagsDocument = gql`
    query GetTags {
  tags {
    ...PartialTag
  }
}
    ${PartialTagFragmentDoc}`;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, baseOptions);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, baseOptions);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchEntriesDocument = gql`
    query SearchEntries($limit: Int!, $offset: Int, $searchTerm: String!, $tagFilters: [Int!], $sortBy: SortBy) {
  searchEntries(
    limit: $limit
    offset: $offset
    searchTerm: $searchTerm
    tagFilters: $tagFilters
    sortBy: $sortBy
  ) {
    entries {
      ...RegularEntry
    }
    searchTerm
  }
}
    ${RegularEntryFragmentDoc}`;

/**
 * __useSearchEntriesQuery__
 *
 * To run a query within a React component, call `useSearchEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchEntriesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      searchTerm: // value for 'searchTerm'
 *      tagFilters: // value for 'tagFilters'
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useSearchEntriesQuery(baseOptions: Apollo.QueryHookOptions<SearchEntriesQuery, SearchEntriesQueryVariables>) {
        return Apollo.useQuery<SearchEntriesQuery, SearchEntriesQueryVariables>(SearchEntriesDocument, baseOptions);
      }
export function useSearchEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchEntriesQuery, SearchEntriesQueryVariables>) {
          return Apollo.useLazyQuery<SearchEntriesQuery, SearchEntriesQueryVariables>(SearchEntriesDocument, baseOptions);
        }
export type SearchEntriesQueryHookResult = ReturnType<typeof useSearchEntriesQuery>;
export type SearchEntriesLazyQueryHookResult = ReturnType<typeof useSearchEntriesLazyQuery>;
export type SearchEntriesQueryResult = Apollo.QueryResult<SearchEntriesQuery, SearchEntriesQueryVariables>;
export const VerifyCaptchaDocument = gql`
    query verifyCaptcha($token: String!) {
  verifyCaptcha(token: $token)
}
    `;

/**
 * __useVerifyCaptchaQuery__
 *
 * To run a query within a React component, call `useVerifyCaptchaQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyCaptchaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyCaptchaQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyCaptchaQuery(baseOptions: Apollo.QueryHookOptions<VerifyCaptchaQuery, VerifyCaptchaQueryVariables>) {
        return Apollo.useQuery<VerifyCaptchaQuery, VerifyCaptchaQueryVariables>(VerifyCaptchaDocument, baseOptions);
      }
export function useVerifyCaptchaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyCaptchaQuery, VerifyCaptchaQueryVariables>) {
          return Apollo.useLazyQuery<VerifyCaptchaQuery, VerifyCaptchaQueryVariables>(VerifyCaptchaDocument, baseOptions);
        }
export type VerifyCaptchaQueryHookResult = ReturnType<typeof useVerifyCaptchaQuery>;
export type VerifyCaptchaLazyQueryHookResult = ReturnType<typeof useVerifyCaptchaLazyQuery>;
export type VerifyCaptchaQueryResult = Apollo.QueryResult<VerifyCaptchaQuery, VerifyCaptchaQueryVariables>;