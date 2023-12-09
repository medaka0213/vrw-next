import React from "react";
import { useFormik } from "formik";
import { FormGrid, FormSelect } from "@medaka0213/react-vrw";

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
}: {
  sx?: any;
  defaultSort?: string;
  defaultOrder?: string;
  onSubmit: any;
  keys?: any;
}) => {
  const formik: any = useFormik({
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
            key="sort"
            formik={formik}
            name="sort"
            title="並び替え"
            variant="standard"
            options={keys.map((key: any) => ({
              value: key.value,
              label: key.label,
            }))}
            onChange={formik.handleSubmit}
          />,
          <FormSelect
            key="order"
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
