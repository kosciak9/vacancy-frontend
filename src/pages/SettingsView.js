/** @jsx jsx */
import { MoonLoader } from "react-spinners";
import { jsx } from "@emotion/core";
import theme from "common/theme";
import Login from "store/login";
import { useState } from "react";
import { keys } from "lodash";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormInput as FormInput,
  unstable_FormSubmitButton as FormSubmitButton,
  unstable_FormMessage as FormMessage
} from "reakit/Form";

export default function LoginView() {
  const { changePassword } = Login.useContainer();
  const [spinner, setSpinner] = useState(false);
  const form = useFormState({
    validateOnChange: false,
    validateOnBlur: false,

    resetOnSubmitSucceed: true,
    values: { oldPassword: "", newPassword: "", repeatNewPassword: "" },
    onValidate: values => {
      const errors = {};

      if (values.newPassword !== values.repeatNewPassword) {
        errors.newPassword = "passwords don't match!";
      }

      if (keys(errors).length) {
        throw errors;
      }
    },
    onSubmit: async values => {
      setSpinner(true);
      await changePassword(values.newPassword);
      setSpinner(false);
    }
  });

  return (
    <Form
      {...form}
      css={theme => ({
        marginTop: theme.spacing(6),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
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
        name="oldPassword"
        type="password"
        placeholder="old password"
      />
      <FormMessage
        {...form}
        css={theme => ({
          ...theme.typography.content,
          color: theme.palette.invalid
        })}
        name="newPassword"
      />
      <FormInput
        {...form}
        css={theme => ({
          padding: theme.spacing(1),
          borderRadius: 2,
          border: "1px solid rgba(0, 0, 0, 0.3)",
          marginBottom: theme.spacing(1)
        })}
        name="newPassword"
        type="password"
        placeholder="new password"
      />
      <FormInput
        {...form}
        css={theme => ({
          padding: theme.spacing(1),
          borderRadius: 2,
          border: "1px solid rgba(0, 0, 0, 0.3)",
          marginBottom: theme.spacing(1)
        })}
        name="repeatNewPassword"
        type="password"
        placeholder="repeat new password"
      />
      <FormSubmitButton
        {...form}
        css={theme => ({
          ...theme.typography.content,
          border: "1px solid rgba(0, 0, 0, 0.3)",
          borderRadius: 2,
          backgroundColor: theme.palette.success,
          padding: theme.spacing(1),
          fontWeight: 700
        })}
      >
        Change password
      </FormSubmitButton>
      {spinner && (
        <MoonLoader
          sizeUnit={"px"}
          size={20}
          color={theme.palette.primary}
          css={theme => ({ margin: theme.spacing(4) })}
        />
      )}
    </Form>
  );
}
