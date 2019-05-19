import React from "react";
import formSubmit from "components/common/form/FormSubmit";

describe("test NavigationBar component", () => {
  it("when submit is a success, setProperty to null", async done => {
    const submitMethod = jest.fn(async () => await setTimeout(() => {}, 1000));
    const setProperty = jest.fn();
    const submitForm = formSubmit(submitMethod, setProperty);
    await submitForm("test");
    expect(submitMethod).toHaveBeenCalledWith("test");
    expect(setProperty).toHaveBeenCalledWith(null);
    done();
  });

  it("on failure, after 4000ms clears error", async done => {
    const submitMethod = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject({ response: { data: {} } });
      });
    });
    const setProperty = jest.fn();
    const submitForm = formSubmit(submitMethod, setProperty);
    await submitForm("test");
    expect(submitMethod).toHaveBeenCalledWith("test");
    expect(setProperty).toHaveBeenCalledWith(
      "Unrecognized error happened. Please, contact support."
    );
    setTimeout(() => {
      expect(setProperty).toHaveBeenCalledWith(null);
      done();
    }, 4500);
  });

  it("when submit is a failure (wrong credentials), setProperty to proper error", async done => {
    const submitMethod = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject({
          response: {
            data: {
              non_field_errors: ["Unable to log in with provided credentials."]
            }
          }
        });
      });
    });
    const setProperty = jest.fn();
    const submitForm = formSubmit(submitMethod, setProperty);
    await submitForm("test");
    expect(submitMethod).toHaveBeenCalledWith("test");
    expect(setProperty).toHaveBeenCalledWith("Wrong password or username.");
    done();
  });

  it("when submit is a failure, but not a wrong password, show UNKNOWN_ERROR", async done => {
    const submitMethod = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject({
          response: {
            data: {
              non_field_errors: ["Some other error."]
            }
          }
        });
      });
    });
    const setProperty = jest.fn();
    const submitForm = formSubmit(submitMethod, setProperty);
    await submitForm("test");
    expect(submitMethod).toHaveBeenCalledWith("test");
    expect(setProperty).toHaveBeenCalledWith(
      "Unrecognized error happened. Please, contact support."
    );
    done();
  });
});
