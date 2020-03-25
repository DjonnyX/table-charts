import { MetricTypes, ObjectTypes } from "../types";

export interface ITableMetricColumn {
    /** строковое поле, нередактируемое */
    metricName: string;
    /** строковое поле, нередактируемое */
    objectName: string;
    /** range { -2.0 - 2.0) */
    value: number;
}