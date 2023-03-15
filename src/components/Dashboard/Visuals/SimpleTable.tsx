import _ from "lodash";
import moment from "moment";
import Subtitle from "~/components/Typography/Subtitle";

type Column = {
  label: string;
  key: string;
};

type Props<T> = {
  data: T[];
  columns?: Column[];
  className?: string;
  title: string;
};

export default function SimpleTable<T extends Record<string, any>>({
  data,
  columns,
  className,
  title,
}: Props<T>) {
  const keys = columns ?? _.keys(data[0]);
  const columnLabels = columns?.map((column) => column.label) ?? keys;
  console.log(data);
  return (
    <div className={`${className ?? ""} card w-full bg-base-100 p-6 shadow`}>
      <Subtitle className="mt-2">{title}</Subtitle>{" "}
      <div className="divider mt-2"></div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {columnLabels.map((label, index) => (
                <th key={index}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {_.map(data, (item, index) => (
              <tr key={index}>
                {_.map(keys, (key, index) => (
                  <td key={index}>
                    {key.key === "createdAt"
                      ? moment(item[key.key]).format("DD.MM.YYYY HH:mm")
                      : item[key.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
