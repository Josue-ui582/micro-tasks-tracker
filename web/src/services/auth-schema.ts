import * as yup from "yup";

export const taskFormSchema = yup.object({
  title: yup
    .string()
    .min(25, "Le titre doit contenir au moins 25 caractères")
    .required("Le titre est requis"),
  description: yup
    .string()
    .min(40, "La description doit contenir au moins 40 caractères")
    .required("La description est requise"),
  priority: yup
    .string()
    .required("La priorité est requise"),
});
