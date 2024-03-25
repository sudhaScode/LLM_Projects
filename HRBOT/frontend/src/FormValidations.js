import React from "react";
import { useForm } from "react-hook-form";

const FormValidation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const isStrongPassword = (value) => {
    // Custom validation logic for strong password
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value
    );
  };
  console.log(errors);
  const onSubmit = (data) => {
    // Handle form submission
    console.log(data, "form submitted", errors);
  };

  const options = [
    { label: 'Option 1', value: 'Option1' },
    { label: 'Option 2', value: 'Option2' },
    { label: 'Option 3', value: 'Option3' },
  ];

  console.log(watch("checkbox1"));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        {...register("username", {
          // required: "user name is required",
          // validate: (value) => {
          //   if (value.length > 10) {
          //     return true;
          //   } else {
          //     return "value mustme greater then 10";
          //   }
          // },
        })}
      />
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            name="option"
            value={option.value}
            {...register("option")}
            defaultChecked={option.value === "Option2"}
          />
          {option.label}
        </div>
      ))}
        <input type="file" {...register("file")} />
        <input type="checkbox" {...register('checkbox1')} />
      <input type="checkbox" {...register('checkbox2')} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        {...register("password", {
          // required: "password is required",
          // validate: (value) => {
          //   let valid = isStrongPassword(value);
          //   if (valid) {
          //     return true;
          //   } else {
          //     return "Not a strong password";
          //   }
          // },
        })}
      />

      <select
        {...register("country", {
          required: "Country is required",
          // validate: (value) => {
          //   console.log(!value,"valueeeeeeee");
          // },
        })}
      >
        <option value="">Select a country</option>
        <option value="USA">United States</option>
        <option value="CAN">Canada</option>
        <option value="UK">United Kingdom</option>
        <option value="AUS">Australia</option>
      </select>
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormValidation;
