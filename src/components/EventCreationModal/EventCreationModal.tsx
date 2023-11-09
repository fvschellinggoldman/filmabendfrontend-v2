import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { mutate } from "swr";
import { postFile, postRequest } from "../../api/api";
import styles from "./EventCreationModal.module.scss";

type IEventCreationFormInput = {
  name: string;
  eventImage: File[];
  date: Date;
};

interface EventCreationModalProps {}

const EventCreationModal: FC<EventCreationModalProps> = () => {
  const { register, handleSubmit } = useForm<IEventCreationFormInput>();

  const onSubmit = async (data: IEventCreationFormInput) => {
    const formData = new FormData();
    formData.append("event_image", data.eventImage[0]);
    formData.append("name", data.name);
    formData.append("date", data.date.toString());

    await postFile("/api/event", formData);
    mutate("/api/event");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} defaultValue="" />
      <input type="date" {...register("date", { required: true })} />
      <input type="file" {...register("eventImage")} />
      <input type="submit"></input>
    </form>
  );
};

export default EventCreationModal;
