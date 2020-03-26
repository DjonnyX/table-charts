import { ITableMetricColumn } from "./ITableMetricColumn";
import { MetricTypes, ObjectTypes } from "../types";

const MAX_VALUE_RANGE = [-2, 2];

export class TableRow {

    private _tblEl: HTMLTableRowElement;
    public get nativeElement() {
        return this._tblEl;
    }

    public get values() {
        return this._data;
    }

    private _changeValueHandler = (e: any) => {
        const value = Number.parseFloat(e.target.value);
        if (value === MAX_VALUE_RANGE[0] || value === MAX_VALUE_RANGE[1]) e.target.style.borderColor = "red";
        else e.target.style.borderColor = "inherit";

        this._data.value = value;

        if (this._onChange) this._onChange(this._data);
    }

    constructor(private _ctxt: HTMLTableElement, private _onChange?: (data: ITableMetricColumn) => void) {
        this._tblEl = document.createElement("tr");
        this._ctxt.appendChild(this._tblEl);

        this._data = {
            metricName: MetricTypes[0],
            objectName: ObjectTypes[0],
            value: 0,
        }
    }

    private _data: ITableMetricColumn;

    private _chengeSelectObjectNameHandlers = (e: any) => {
        this._data.objectName = e.target.value;

        if (this._onChange) this._onChange(this._data);
    }

    private _chengeSelectMetricNameHandlers = (e: any) => {
        this._data.metricName = e.target.value;

        if (this._onChange) this._onChange(this._data);
    }

    /**
     * Добавляет данные метрики в таблицу
     */
    public add(options: ITableMetricColumn) {
        const metricName = document.createElement("td");
        metricName.classList.add("metric")
        metricName.appendChild(this.createSelect(MetricTypes, this._chengeSelectMetricNameHandlers));
        this._tblEl.appendChild(metricName);

        const objectName = document.createElement("td");
        objectName.classList.add("object")
        objectName.appendChild(this.createSelect(ObjectTypes, this._chengeSelectObjectNameHandlers));
        this._tblEl.appendChild(objectName);

        const value = document.createElement("td");
        const input = document.createElement("input");
        input.classList.add("value")
        input.type = "number";
        input.step = "0.1";
        input.min = MAX_VALUE_RANGE[0].toString();
        input.max = MAX_VALUE_RANGE[1].toString();
        input.value = options.value.toString();
        value.appendChild(input);
        this._tblEl.appendChild(value);

        input.addEventListener("change", this._changeValueHandler);

        return this;
    }

    protected createSelect(values: string[], changeSelectHandlers: (e: Event) => void) {
        const select = document.createElement("select")
        values.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.text = value;
            select.appendChild(option);
        });
        select.value = values[0];
        select.addEventListener("change", changeSelectHandlers)
        return select;
    }
}