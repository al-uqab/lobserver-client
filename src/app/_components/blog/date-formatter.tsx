import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="text-sm">
      {format(date, "LLLL 	d, yyyy")}
    </time>
  );
};

export default DateFormatter;
