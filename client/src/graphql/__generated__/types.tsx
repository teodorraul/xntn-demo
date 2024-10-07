import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date | string; output: Date | string; }
};

export type Measurement = {
  __typename?: 'Measurement';
  id: Scalars['ID']['output'];
};

export type Metric = {
  __typename?: 'Metric';
  id: Scalars['ID']['output'];
  measuredAt: Scalars['DateTime']['output'];
  quality: Scalars['String']['output'];
  type: Scalars['String']['output'];
  value?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  measurements?: Maybe<Array<Maybe<Measurement>>>;
  metrics?: Maybe<Array<Maybe<Metric>>>;
};


export type QueryMetricsArgs = {
  measurementId: Scalars['ID']['input'];
};

export type MeasurementsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeasurementsQuery = { __typename?: 'Query', measurements?: Array<{ __typename?: 'Measurement', id: string }> };

export type MetricsQueryVariables = Exact<{
  measurementId: Scalars['ID']['input'];
}>;


export type MetricsQuery = { __typename?: 'Query', metrics?: Array<{ __typename?: 'Metric', id: string, measuredAt: Date | string, quality: string, value?: number }> };


export const MeasurementsDocument = gql`
    query Measurements {
  measurements {
    id
  }
}
    `;

/**
 * __useMeasurementsQuery__
 *
 * To run a query within a React component, call `useMeasurementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeasurementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeasurementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeasurementsQuery(baseOptions?: Apollo.QueryHookOptions<MeasurementsQuery, MeasurementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeasurementsQuery, MeasurementsQueryVariables>(MeasurementsDocument, options);
      }
export function useMeasurementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeasurementsQuery, MeasurementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeasurementsQuery, MeasurementsQueryVariables>(MeasurementsDocument, options);
        }
export function useMeasurementsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeasurementsQuery, MeasurementsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeasurementsQuery, MeasurementsQueryVariables>(MeasurementsDocument, options);
        }
export type MeasurementsQueryHookResult = ReturnType<typeof useMeasurementsQuery>;
export type MeasurementsLazyQueryHookResult = ReturnType<typeof useMeasurementsLazyQuery>;
export type MeasurementsSuspenseQueryHookResult = ReturnType<typeof useMeasurementsSuspenseQuery>;
export type MeasurementsQueryResult = Apollo.QueryResult<MeasurementsQuery, MeasurementsQueryVariables>;
export const MetricsDocument = gql`
    query Metrics($measurementId: ID!) {
  metrics(measurementId: $measurementId) {
    id
    measuredAt
    quality
    value
  }
}
    `;

/**
 * __useMetricsQuery__
 *
 * To run a query within a React component, call `useMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetricsQuery({
 *   variables: {
 *      measurementId: // value for 'measurementId'
 *   },
 * });
 */
export function useMetricsQuery(baseOptions: Apollo.QueryHookOptions<MetricsQuery, MetricsQueryVariables> & ({ variables: MetricsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MetricsQuery, MetricsQueryVariables>(MetricsDocument, options);
      }
export function useMetricsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MetricsQuery, MetricsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MetricsQuery, MetricsQueryVariables>(MetricsDocument, options);
        }
export function useMetricsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MetricsQuery, MetricsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MetricsQuery, MetricsQueryVariables>(MetricsDocument, options);
        }
export type MetricsQueryHookResult = ReturnType<typeof useMetricsQuery>;
export type MetricsLazyQueryHookResult = ReturnType<typeof useMetricsLazyQuery>;
export type MetricsSuspenseQueryHookResult = ReturnType<typeof useMetricsSuspenseQuery>;
export type MetricsQueryResult = Apollo.QueryResult<MetricsQuery, MetricsQueryVariables>;