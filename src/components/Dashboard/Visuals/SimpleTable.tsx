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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SimpleTable<T extends Record<string, any>>({
  data,
  columns,
  className,
  title,
}: Props<T>) {
  const columnLabels = columns?.map((column) => column.label);

  return (
    <div className={`${className ?? ""} card w-full bg-base-100 p-6 shadow`}>
      <Subtitle className="mt-2">{title}</Subtitle>
      <div className="divider mt-2"></div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {columnLabels?.map((label, index) => (
                <th key={index}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {_.map(data, (item, index) => (
              <tr key={index}>
                {_.map(columns, (column, index) => {
                  console.log(column);
                  return (
                    <td key={index}>
                      {column.key === "createdAt"
                        ? moment(item[column?.key] as string).format(
                            "DD.MM.YYYY HH:mm"
                          )
                        : item[column.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
