import { useState } from "react";
import { validateField } from "./validateField";

/* Hook para manejar el state onChange de los inputs*/
export function useField({type, field}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState('')
  const onChange = (e) => {
    setValue(e.target.value);
    setError(validateField(e.target.value, field))
  }

  return {
    type,
    value,
    error,
    onChange,
    setError
  }
}


