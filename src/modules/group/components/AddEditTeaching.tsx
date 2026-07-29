import {
  Button,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import type { Courses, GroupEntity, GroupPost, TeachingEntity } from "../types";
import { toast } from "react-toastify";
import axios from "axios";
import { TeacherService } from "../../teacher/services/TeacherService";
import type { TeacherEntity } from "../../teacher/types";

const SCHOOL_UNIT_ID = "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b";

interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  schoolClass: GroupEntity;
  onSubmit: (group: GroupPost) => Promise<void>;
}

export default function AddEditTeaching({
  isModalOpen,
  modifyIsModalOpen,
  schoolClass,
  onSubmit,
}: IProps) 
{
  const [teachers, setTeachers] = useState<TeacherEntity[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [courses, setCourses] = useState<Courses[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [teachings, setTeachings] = useState<TeachingEntity[]>([]);
  const [form] = Form.useForm();

  const [teachersRemainingHours, setTeachersRemainingHours] = useState<{id: string, remainingHours: number}[]>([]);
  const [coursesRemainingHours, setCoursesRemainingHours] = useState<{id: string, remainingHours: number}[]>([]);

  const handleCancel = () => {
    form.resetFields();
    modifyIsModalOpen(false);
  };

  const handleTeacherChange = (value: string) => {
    form.setFieldsValue({ teacher: value });
    setSelectedTeacher(value);
    form.setFieldsValue({ teacherRemainingHours: teachersRemainingHours.find(t => t.id === value)?.remainingHours });
  };

  const handleCourseChange = (value: string) => {
    form.setFieldsValue({ course: value });
    setSelectedCourse(value);
    form.setFieldsValue({ assignedHours: coursesRemainingHours.find(c => c.id === value)?.remainingHours });
  };

  const handleAddTeaching = () => {
    let teacherDescription = teachers.find(t => t.key === selectedTeacher)?.name || "";
    const newTeaching: TeachingEntity = {
        key: `${selectedTeacher}-${selectedCourse}`,
        teacher: { id: selectedTeacher, description: teacherDescription },
        course: { id: selectedCourse, description: courses.find(c => c.id === selectedCourse)?.title || "" },
        totalHours: form.getFieldValue("assignedHours"),
        dispersion: [0, form.getFieldValue("assignedHours"), 0, 0, 0, 0, 0], // Example dispersion, replace with actual logic if needed
    };
    setTeachings([...teachings, newTeaching]);
    console.log("Added teaching:", newTeaching);
    setCoursesRemainingHours(prev => prev.map(c => c.id === selectedCourse ? { ...c, remainingHours: c.remainingHours - newTeaching.totalHours } : c));
    setTeachersRemainingHours(prev => prev.map(t => t.id === selectedTeacher ? { ...t, remainingHours: t.remainingHours - newTeaching.totalHours } : t));
    const updatedTeacherRemainingHours = (teachersRemainingHours.find(t => t.id === selectedTeacher)?.remainingHours ?? 0) - newTeaching.totalHours;
    form.setFieldsValue({ teacherRemainingHours: updatedTeacherRemainingHours });
  };

  

  const handleOk = async () => {
    // form.validateFields()
    // .then(async (values) => {
    //   const dataToSubmit: GroupPost = {
    //     name: values.name,
    //     totalHours: values.totalHours,
    //     short: values.name,
    //     color: values.color,
    //     gradeId: selectedGrade,
    //     schoolUnitId: SCHOOL_UNIT_ID,
    //   };
    //   await onSubmit(dataToSubmit);
    //   form.resetFields();
    //   modifyIsModalOpen(false);
    // })
    // .catch(() => {
    //   toast.error("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.");
    // });
  };

  const matchGrade = (gradeCode: string) => {
    // const grade = grades.find(g => g.id === gradeCode);
    // setSelectedGrade(grade ? grade.id : "");
    // return grade ? grade.description : "";
  }

  useEffect(() => {
    async function fetchTeachers() {
      const loadedTeachers = await TeacherService.load(schoolClass.schoolUnitId);
      setTeachersRemainingHours(loadedTeachers.map(teacher => ({
          id: teacher.key,
          remainingHours: teacher.mandatoryTeachingHours,
      })));
      setTeachers(loadedTeachers);
    };
    
    async function fetchGrades() {
      try {
        const response = await axios.get(`http://localhost:5191/api/courses?gradeId=${schoolClass?.grade.id}`);
        const data  = response.data.courses.sort((a: Courses, b: Courses) => a.title.localeCompare(b.title)) as Courses[];
        
        setCoursesRemainingHours(data.map(course => ({
          id: course.id,
          remainingHours: course.grade.hoursPerWeek,
      })));
        setCourses(data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    }

    fetchTeachers();
    fetchGrades();
    
  }, [schoolClass, form, isModalOpen]);

  return (
    <Modal
      title={schoolClass ? "Επεξεργασία Τμήματος" : "Προσθήκη Τμήματος"}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      width={650}
    >
      <Descriptions column={1} bordered size="small" style={{ label: { width: 160 } }}>
        <Descriptions.Item label="Τάξη">{schoolClass?.grade.description}</Descriptions.Item>
        <Descriptions.Item label="Τμήμα">{schoolClass?.name}</Descriptions.Item>
        <Descriptions.Item label="Υποχρεωτικές Ώρες Διδασκαλίας">{schoolClass?.totalHours}</Descriptions.Item>
        <Descriptions.Item label="Υπολειπόμενες Ώρες Διδασκαλίας">0</Descriptions.Item>
      </Descriptions>  
      <Form form={form} layout="vertical" >
        <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
            name="teacher"
            label="Εκπαιδευτικός"
            rules={[{ required: true, message: "Παρακαλώ επιλέξτε εκπαιδευτικό!" }]}
            style={{ display: "inline-block", width: "calc(75% - 8px)", marginRight: 16 }}
            >
                <Select
                options={teachers.map((teacher) => ({
                    key: teacher.key,
                    value: teacher.key,
                    label: teacher.name,
                }))}
                placeholder="Επιλέξτε εκπαιδευτικό"
                onChange={(value) => handleTeacherChange(value)}
                />
            </Form.Item>
            <Form.Item
            name="teacherRemainingHours"
            label="Υπολειπόμενες Ώρες"
            style={{ display: "inline-block", width: "calc(25% - 8px)" }}
            >
                <Input disabled />
            </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
            name="course"
            label="Μάθημα"
            rules={[{ required: true, message: "Παρακαλώ επιλέξτε μάθημα!" }]}
            style={{ display: "inline-block", width: "calc(65% - 8px)", marginRight: 16 }}
            >
                <Select
                options={courses.map((course) => ({
                    key: course.id,
                    value: course.id,
                    label: `${course.title} - ${coursesRemainingHours.find(c => c.id === course.id)?.remainingHours} ώρες`,
                }))}
                placeholder="Επιλέξτε μάθημα"
                onChange={(value) => {
                    handleCourseChange(value);
                }}
                />
            </Form.Item>
            <Form.Item
                name="assignedHours"
                label="Ανατεθειμένες Ώρες"
                rules={[{ required: true, message: "Παρακαλώ εισάγετε το σύνολο ωρών διδασκαλίας!" }]}
                style={{ display: "inline-block", width: "calc(35% - 8px)" }}
            >
                <Input />
            </Form.Item>
        </Form.Item>
        </Form>
        <Flex justify="flex-end" style={{ marginTop: 8 }}>
            <Button 
              type="primary" 
              size="middle" 
              style={{ backgroundColor: "green" }}
              onClick={handleAddTeaching}>Προσθήκη Διδασκαλίας</Button>
        </Flex>

        <Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Διδασκαλίες</Divider>
            <Table
              size="small"
              pagination={false}
              dataSource={teachings.map((t, i) => ({ ...t, key: i }))}
              columns={[
                { title: 'Μάθημα', dataIndex: ['course', 'description'], key: 'course' },
                { title: 'Εκπαιδευτικός', dataIndex: ['teacher', 'description'], key: 'teacher' },
                { title: 'Ώρες', dataIndex: 'totalHours', key: 'totalHours', width: 60, align: 'center' },
                {
                  title: 'Κατανομή',
                  dataIndex: 'dispersion',
                  key: 'dispersion',
                  render: (dispersion: number[]) => (
                    <Space wrap>
                      {dispersion.slice(1).map((h, i) => <Tag key={i} color="blue">{h}ω</Tag>)}
                    </Space>
                  ),
                },
              ]}
            />
    </Modal>
  );
}