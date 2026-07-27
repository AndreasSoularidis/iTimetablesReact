import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  type CheckboxOptionType,
} from "antd";
import { useEffect, useState } from "react";
import type { TeacherGet, TeacherPost } from "../types";
import axios from "axios";

interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  defaultEditValues: TeacherGet | null;
  zoneOptions: CheckboxOptionType<string>[];
  onSubmit: (teacher: TeacherPost) => Promise<void>;
}