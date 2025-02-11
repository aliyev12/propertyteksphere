"use server";

async function editProperty(formData: FormData) {
  console.log("formData = ", formData.getAll("images"));
}

export default editProperty;
