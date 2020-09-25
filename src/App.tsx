import React from "react";
import { Form, Formik, FormikErrors, FormikValues } from "formik";
import InputField from "./InputField";

import "./App.css";
import { Person as IPerson, mockPersonEndPoint } from "./mockApi";
import { Person } from "./Person";

// const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  let [people, setPeople] = React.useState<any>([]);

  async function getData(
    values: FormikValues,
    setErrors: (
      errors: FormikErrors<{
        search: string;
      }>
    ) => void
  ) {
    let response;

    try {
      response = await mockPersonEndPoint(200);

      let filtered = response?.data?.filter((person: IPerson) =>
        person.name.includes(values.search)
      );

      setPeople(filtered);
    } catch (e) {
      console.error(e);
      setPeople([]);
      setErrors({ search: e.error });
    }

    console.log(values, "hello from values");
  }

  return (
    <>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={async (_, { setErrors }) => {}}
      >
        {({ isSubmitting, values, setErrors }) => (
          <>
            <div className="wrapper">
              <header>
                <h1>The Person Finder</h1>
                <h3>
                  If you just can’t find someone and need to know what they look
                  like, you’ve come to the right place! Just type the name of
                  the person you are looking for below into the see
                </h3>
              </header>

              <Form>
                <InputField
                  onKeyPress={() => getData(values, setErrors)}
                  placeholder="Type a name..."
                  name="search"
                  label="Search"
                />

                {isSubmitting && "Loading...."}
              </Form>
              <ul>
                {people?.map((person: IPerson) => {
                  return (
                    <li key={person.id}>
                      <Person person={person} />
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Todo */}
            {/* {people?.length < 1 && values.search && !isSubmitting && (
              <div>No Matches</div>
            )} */}
          </>
        )}
      </Formik>
    </>
  );
};

export default App;
