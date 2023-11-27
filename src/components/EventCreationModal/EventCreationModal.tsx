import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { postFile } from "../../api/api";
import { toast } from "sonner";
import {
  Container,
  Typography,
  Button,
  TextField,
  Input,
  FormHelperText,
} from "@mui/material";
import styles from "./EventCreationModal.module.scss";

type IEventCreationFormInput = {
  name: string;
  eventImage: File[];
  date: Date;
};

interface EventCreationModalProps {}

const EventCreationModal: FC<EventCreationModalProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEventCreationFormInput>();

  const onSubmit = async (data: IEventCreationFormInput) => {
    const formData = new FormData();
    formData.append("event_image", data.eventImage[0]);
    formData.append("name", data.name);
    formData.append("date", data.date.toString());
    toast.success(`Event ${data.name} has been created!`);
    await postFile("/api/event", formData);
    mutate("/api/event");
  };

  return (
    <Container>
      <Typography variant="h4" align="center" padding={5}>
        Create Event
      </Typography>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name", { required: "Event Name is required" })}
            label="Event Name"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            className={styles.formField}
          />
          {/* Event Date */}
          <TextField
            {...register("date", { required: "Date is required" })}
            type="date"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.date}
            helperText={errors.date?.message}
            className={styles.formField}
          />
          {/* Event Image */}
          <Input
            {...register("eventImage")}
            type="file"
            fullWidth
            error={!!errors.eventImage}
            className={`${styles.formField} ${styles.fileInput}`}
          />
          {/* Validation Errors */}
          {errors.eventImage && (
            <FormHelperText error>{errors.eventImage.message}</FormHelperText>
          )}
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={`${styles.formField} ${styles.submitButton}`}
          >
            Create Event
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EventCreationModal;
