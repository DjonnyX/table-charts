import { MetricTypes, ObjectTypes } from "../types";

export interface ITableMetricColumn {
    /** строковое поле, нередактируемое */
    metricName: MetricTypes;
    /** строковое поле, нередактируемое */
    objectName: ObjectTypes;
    /** range { -2.0 - 2.0) */
    Value: number;
}