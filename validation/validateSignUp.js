export default function validateSignUp(values) {
  let errors = {};

  // Validate name
  if (!values.name) errors.name = "El nombre es obligatorio";

  // Validate email
  if (!values.email) errors.email = "El email es obligatorio";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
    errors.email = "Email inválido";

  // Validate password
  if (!values.password) errors.password = "El password es obligatorio";
  else if (values.password.length < 8)
    errors.password = "El password debe contener al menos 8 caracteres";

  return errors;
}
