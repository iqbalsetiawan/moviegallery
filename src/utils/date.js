import { format } from "date-fns";
import { id } from "date-fns/locale";

export const dateWithSec = (date) => {
  return format(new Date(date), "dd/MM/yyyy (HH:mm)", {
    locale: id,
  });
};
