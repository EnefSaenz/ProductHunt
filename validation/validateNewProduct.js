export default function validateSignUp(values) {
  let errors = {};

  // Validate name
  if (!values.name) errors.name = "El nombre es obligatorio";

  // Validate enterprise
  if (!values.enterprise) errors.enterprise = "La empresa es obligatoria";

  // Validate image
  if (!values.image) errors.image = "La imágen es obligatoria";

  // Validate url
  if (!values.url) errors.url = "La URL es obligatoria";
  else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url))
    errors.url = "URL inválida";

  // Validate description
  if (!values.description) errors.description = "Agrega una descripción";

  return errors;
}
