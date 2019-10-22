/** @jsx jsx */
import { jsx } from "@emotion/core";
import Login from "store/login";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton
} from "reakit/Form";

export default function LoginView() {
  const { loginUser } = Login.useContainer();
  const form = useFormState({
    values: { email: "", password: "" },
    onValidate: values => {
      if (!values.password) {
        const errors = {
          password: "Please provide password"
        };
        throw errors;
      }
    },
    onSubmit: values => {
      loginUser(values);
    }
  });

  return (
    <Form
      {...form}
      css={theme => ({
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        width: 300,
        height: 400,
        top: "20%",
        left: "calc(50% - 150px)"
      })}
    >
      <FormInput
        {...form}
        css={theme => ({
          padding: theme.spacing(1),
          borderRadius: 2,
          border: "1px solid rgba(0, 0, 0, 0.3)",
          marginBottom: theme.spacing(1)
        })}
        name="email"
        placeholder="hello@vacancy.com"
      />
      <FormMessage {...form} name="name" />
      <FormInput
        {...form}
        css={theme => ({
          padding: theme.spacing(1),
          borderRadius: 2,
          border: "1px solid rgba(0, 0, 0, 0.3)",
          marginBottom: theme.spacing(1)
        })}
        name="password"
        type="password"
        placeholder="hunter2"
      />
      <FormSubmitButton
        {...form}
        css={theme => ({
          ...theme.typography.content,
          width: "100%",
          border: "1px solid rgba(0, 0, 0, 0.3)",
          borderRadius: 2,
          backgroundColor: theme.palette.success,
          padding: theme.spacing(1),
          fontWeight: 700
        })}
      >
        Login
      </FormSubmitButton>
    </Form>
  );
}
