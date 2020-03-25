import {Table} from "./Table"
import { MetricTypes, ObjectTypes } from "../types";

describe("Table", () => {
    const table = new Table();
    window.document.body.appendChild(table.nativeElement);
  
    it("must be montained", () => {
      expect(window.document.getElementsByTagName("tr").length).toEqual(1);
    });

    it("must contains ", () => {
      table.add({
          metricName: MetricTypes[0],
          objectName: ObjectTypes[0],
          value: 0
      })
        expect(table.nativeElement.innerHTML).toBe("<td>Performance</td><td>Network interface 001</td><td>0</td>")
      });
  });
