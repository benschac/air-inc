import React from "react";
import { Form, Formik, FormikErrors, FormikValues } from "formik";
import InputField from "./InputField";
import debounce from "lodash/debounce";
import { Person as IPerson, mockPersonEndPoint } from "./mockApi";
import { Person } from "./Person";

import "./App.css";

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  let [people, setPeople] = React.useState<any>([]);
  let [loading, setLoading] = React.useState<boolean>(false);

  async function getData(
    values: FormikValues,
    setErrors: (
      errors: FormikErrors<{
        search: string;
      }>
    ) => void
  ) {
    let response;
    setLoading(true);

    try {
      response = await mockPersonEndPoint(200);

      let filtered = await response?.data?.filter((person: IPerson) =>
        person.name.includes(values.search)
      );

      setPeople(filtered);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setPeople([]);
      setLoading(false);
      setErrors({ search: e.error });
    }
  }

  const debouncedGetData = debounce(getData, 1000);

  return (
    <>
      <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
        {({ values, setErrors }) => (
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
                  onKeyDown={async () => debouncedGetData(values, setErrors)}
                  placeholder="Type a name..."
                  name="search"
                  label="Search"
                />
              </Form>
              {loading && <div>loading....</div>}
              <ul>
                {!loading &&
                  people?.map((person: IPerson) => {
                    return (
                      <li key={person.id}>
                        <Person person={person} />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

export default App;
