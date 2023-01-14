import React from "react";
import { useFormik } from "formik";
import { FormGrid, FormSelect } from "react-vrw";

const App = ({
  sx,
  defaultSort = "datetime",
  defaultOrder = "asc",
  onSubmit,
  keys = [
    {
      key: "datetime",
      label: "日時",
    },
  ],
  ...props
}) => {
  const formik = useFormik({
    initialValues: {
      sort: defaultSort,
      order: defaultOrder,
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <FormGrid
      xs={6}
      formik={formik}
      sx={{
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 1,
        ...sx,
      }}
      childrenList={[
        [
          <FormSelect
            formik={formik}
            name="sort"
            title="並び替え"
            variant="standard"
            options={keys.map((key) => ({
              value: key.value,
              label: key.label,
            }))}
            onChange={formik.handleSubmit}
          />,
          <FormSelect
            formik={formik}
            name="order"
            title="順序"
            variant="standard"
            options={[
              {
                value: "asc",
                label: "昇順▲",
              },
              {
                value: "desc",
                label: "降順▼",
              },
            ]}
            onChange={formik.handleSubmit}
          />,
        ],
      ]}
      buttonEnabled={false}
      {...props}
    />
  );
};

export default App;
