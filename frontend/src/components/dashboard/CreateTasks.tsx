import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";

interface TaskRow {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  points: number;
  remainingSlots: number;
}

interface CreateTasksProps {
  open: boolean;
  handleClose: () => void;
  handleUpdateTaskInfo: (updatedTask: TaskRow) => void;
}

interface FormData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  points: number;
  remainingSlots: number;
}

interface ErrorState {
  [key: string]: { error: boolean; message: string };
}

const CreateTasks: React.FC<CreateTasksProps> = ({
  open,
  handleClose,
  handleUpdateTaskInfo,
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    title: "",
    subtitle: "",
    description: "",
    points: 0,
    remainingSlots: 0,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        id: 0,
        title: "",
        subtitle: "",
        description: "",
        points: 0,
        remainingSlots: 0,
      });

      setErrorState({
        title: { error: false, message: "" },
        subtitle: { error: false, message: "" },
        description: { error: false, message: "" },
        image: { error: false, message: "" },
        price: { error: false, message: "" },
        remainingSlots: { error: false, message: "" },
      });
    }
  }, [open]);

  const [errorState, setErrorState] = useState<ErrorState>({
    title: { error: false, message: "" },
    description: { error: false, message: "" },
    subtitle: { error: false, message: "" },
    image: { error: false, message: "" },
    price: { error: false, message: "" },
    remainingSlots: { error: false, message: "" },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateInputs()) {
      handleUpdateTaskInfo(formData as TaskRow);
    }
  };

  const setError = (field: string, error: boolean, message: string) => {
    setErrorState((prevState) => ({
      ...prevState,
      [field]: { error, message },
    }));
  };

  const validateInputs = (): boolean => {
    const title = document.getElementById("title") as HTMLInputElement;
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const subtitle = document.getElementById("subtitle") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;
    const remainingSlots = document.getElementById(
      "quantity"
    ) as HTMLInputElement;
    let isValid = true;

    if (!title || !title.value || title.value.length < 1) {
      setError("title", true, "Title is required.");
      isValid = false;
    } else {
      setError("title", false, "");
    }
    if (!subtitle || !subtitle.value || subtitle.value.length < 1) {
      setError("subtitle", true, "Subtitle is required.");
      isValid = false;
    } else {
      setError("subtitle", false, "");
    }
    if (!description || !description.value || description.value.length < 1) {
      setError("description", true, "Description is required.");
      isValid = false;
    } else {
      setError("description", false, "");
    }
    if (!price || !price.value || price.value.length < 1) {
      setError("price", true, "Price is required.");
      isValid = false;
    } else {
      setError("price", false, "");
    }
    if (
      !remainingSlots ||
      !remainingSlots.value ||
      remainingSlots.value.length < 1
    ) {
      setError("remainingSlots", true, "Slots is required.");
      isValid = false;
    } else {
      setError("remainingSlots", false, "");
    }

    return isValid;
  };

  const formFieldsLeft = [
    {
      id: "title",
      label: "Title",
      placeholder: "Apple",
      error: errorState.title.error,
      helperText: errorState.title.message,
    },
    {
      id: "subtitle",
      label: "Subtitle",
      placeholder: "Fresh Fruits",
      error: errorState.subtitle.error,
      helperText: errorState.subtitle.message,
    },
    {
      id: "description",
      label: "Description",
      placeholder: "Good quality apples",
      error: errorState.description.error,
      helperText: errorState.description.message,
    },
    {
      id: "price",
      label: "Price",
      placeholder: "5",
      type: "number",
      error: errorState.price.error,
      helperText: errorState.price.message,
    },
    {
      id: "remainingSlots",
      label: "Slots",
      placeholder: "10",
      type: "number",
      error: errorState.remainingSlots.error,
      helperText: errorState.remainingSlots.message,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        handleClose();
      }}
      aria-labelledby="update-task-dialog-title"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle id="user-dialog-title">Product Details</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid container spacing={2}>
          {formFieldsLeft.map((field) => (
            <Grid size={{ xs: 12, md: 6 }} key={field.id}>
              <FormControl fullWidth>
                <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                <TextField
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={formData[field.id as keyof FormData] || ""}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      [field.id]:
                        field.type === "number"
                          ? Number(e.target.value)
                          : e.target.value,
                    }))
                  }
                  error={errorState[field.id]?.error}
                  helperText={errorState[field.id]?.message}
                />
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateTasks.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleUpdateTaskInfo: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default CreateTasks;