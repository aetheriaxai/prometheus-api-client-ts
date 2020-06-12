import { Logger } from '@w3f/logger';


export type Status = 'success' | 'error';

export type RangeResultType = 'matrix';

export type InstantResultType = RangeResultType | 'vector' | 'scalar' | 'string';

export type MetricField = '__name__' | 'job' | 'instance';

export type Metric = {
    [field in MetricField]: string;
}

export type Value = [number, string];

export interface InstantResultItem {
    metric: Metric;
    value: Value;
}

export interface RangeResultItem {
    metric: Metric;
    values: Array<Value>;
}

export interface InstantData {
    resultType: InstantResultType;
    result: Array<InstantResultItem>;
}

export interface RangeData {
    resultType: RangeResultType;
    result: Array<RangeResultItem>;
}

export interface CommonResponse {
    status: Status;

    errorType?: string;
    error?: string;
    warnings?: Array<string>;
}

export interface RangeResponse extends CommonResponse {
    data: RangeData;
}

export interface InstantResponse extends CommonResponse {
    data: InstantData;
}

export interface InstantQueryInput {
    query: string;
    time?: string;
    timeout?: number;
}

export interface RangeQueryInput {
    query: string;
    start: string;
    end: string;
    step: number;
    timeout?: number;
}

export interface PrometheusAPIClientInterface {
    instantQuery(input: InstantQueryInput): Promise<InstantResponse>;
    rangeQuery(input: RangeQueryInput): Promise<RangeResponse>;
}

export interface RequestHeaders {
    [key: string]: string;
}

export interface PrometheusClientConfig {
    url: string;
    headers?: RequestHeaders;
    logger?: Logger;
}
