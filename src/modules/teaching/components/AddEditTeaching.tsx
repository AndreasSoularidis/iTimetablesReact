import {
  Button,
  Descriptions,
  Divider,
  Flex,
  Form,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  type InputNumberProps,
} from "antd";
import { DeleteFilled  } from "@ant-design/icons";
import type { TeachingDelete } from "../types";
import { useEffect, useState } from "react";
import type { Course, GradeCourses, SchoolClassEntity, Teaching, TeachingEntity, TeachingPost } from "../types";
import { toast } from "react-toastify";
import axios from "axios";
import { TeacherService } from "../../teacher/services/TeacherService";
import type { TeacherEntity } from "../../teacher/types";
import { TeachingService } from "../services/TeachingService";

interface IProps {
  isModalOpen: boolean;
  modifyIsModalOpen: (value: boolean) => void;
  defaultValues: TeachingEntity | null;
  onSubmit: () => void;
}

export default function AddEditTeaching({
  isModalOpen,
  modifyIsModalOpen,
  defaultValues,
  onSubmit,
}: IProps) 
{
  const [teachers, setTeachers] = useState<TeacherEntity[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [courses, setCourses] = useState<GradeCourses[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [teachings, setTeachings] = useState<Teaching[]>([]);
  const [classTotalHours, setClassTotalHours] = useState<number>( 0);
  const [schoolClasses, setSchoolClasses] = useState<SchoolClassEntity[] >([]);
  const [selectedSchoolClass, setSelectedSchoolClass] = useState<{id: string, name: string, gradeId: string} | null>(null);

  const [form] = Form.useForm();

  const [teachersRemainingHours, setTeachersRemainingHours] = useState<{id: string, remainingHours: number}[]>([]);
  const [coursesRemainingHours, setCoursesRemainingHours] = useState<{id: string, remainingHours: number}[]>([]);

  const handleCancel = () => {
    form.resetFields();
    modifyIsModalOpen(false);
    setSelectedSchoolClass(null);
    setTeachings([]);
    setClassTotalHours(0);
  };

  const handleDelete = async (teaching: Teaching) => {
    const teachingToDelete: TeachingDelete = {
      teacherId: teaching.teacher.id,
      schoolClassId: teaching.schoolClass?.id!,
      courseId: teaching.course.id,
    };
    try{
      const success = await TeachingService.delete(teachingToDelete);
      if(success){
        setTeachings(prevTeachings => prevTeachings.filter(t => t.key !== teaching.key));
        setCoursesRemainingHours(prev => prev.map(c => c.id === teaching.course.id ? { ...c, remainingHours: c.remainingHours + teaching.totalHours } : c));
        setTeachersRemainingHours(prev => prev.map(t => t.id === teaching.teacher.id ? { ...t, remainingHours: t.remainingHours + teaching.totalHours } : t));
        setClassTotalHours(prev => prev - teaching.totalHours);
        if (teaching.teacher.id === selectedTeacher) {
          const updatedRemaining = (teachersRemainingHours.find(t => t.id === teaching.teacher.id)?.remainingHours ?? 0) + teaching.totalHours;
          form.setFieldsValue({ teacherRemainingHours: updatedRemaining });
        }
        toast.success("Η διδασκαλία διαγράφηκε με επιτυχία!");
      }
    } catch (error) {
      toast.error("Σφάλμα κατά τη διαγραφή της διδασκαλίας.");
    }
  };

  const handleSchoolClassChange = (value: string) => {
    const selectedClass = schoolClasses.find(c => c.id === value);
    setSelectedSchoolClass(selectedClass ? { id: selectedClass.id, name: selectedClass.name, gradeId: selectedClass.grade.id } : null);
    form.setFieldsValue({ schoolClass: value });
    const gradeCouse = courses.filter(c => c.grade.id === selectedClass?.grade.id);
    setSelectedCourses(gradeCouse[0].courses);
    setCoursesRemainingHours(gradeCouse[0].courses.map(course => ({
      id: course.id,
      remainingHours: (course.totalHours - (selectedClass?.assignedHours ?? 0)),
    })));
    form.setFieldsValue({ course: undefined, assignedHours: undefined, oneHourCount: undefined, twoHourCount: undefined });
  };

  const handleTeacherChange = (value: string) => {
    form.setFieldsValue({ teacher: value });
    setSelectedTeacher(value);
    form.setFieldsValue({ teacherRemainingHours: teachersRemainingHours.find(t => t.id === value)?.remainingHours });
  };

  const handleCourseChange = (value: string) => {
    form.setFieldsValue({ course: value });
    setSelectedCourse(value);
    const remainingHours = coursesRemainingHours.find(c => c.id === value)?.remainingHours;
    form.setFieldsValue({ assignedHours: remainingHours, oneHourCount: remainingHours, twoHourCount: 0 });
  };

  const handleAddTeaching = async () => {
    const teacher = teachers.find(t => t.key === selectedTeacher);
    const course = selectedCourses.find(c => c.id === selectedCourse);
    const assignedHours = form.getFieldValue("assignedHours");
    const oneHoursCount = form.getFieldValue("oneHourCount") ?? 0;
    const twoHoursCount = form.getFieldValue("twoHourCount") ?? 0;
    const dispersionHours = oneHoursCount + (twoHoursCount * 2);

    if (!teacher) {
      toast.error("Παρακαλώ επιλέξτε εκπαιδευτικό.");
      return;
    }

    if (!selectedCourse) {
      toast.error("Παρακαλώ επιλέξτε μάθημα.");
      return;
    }

    // Ο καθηγητής δεν έχει αρκετές ώρες για να καλύψει τις ανατεθειμένες ώρες
    if(assignedHours > (teachersRemainingHours.find(t => t.id === selectedTeacher)?.remainingHours ?? 0)) {
      toast.error("Ο εκπαιδευτικός δεν έχει αρκετές ώρες για να καλύψει τις ανατεθειμένες ώρες.");
      return;
    }

    // H Κατανομή έχει περισσότερες ώρες από της εβδομάδας του μαθήματος
    if (assignedHours > (course?.totalHours ?? 0)) {
      toast.error("Η κατανομή των ωρών διδασκαλίας υπερβαίνει τις ώρες ανά εβδομάδα του μαθήματος.");
      return;
    }
    
    // H κατανομή των ωρών δεν ταιριάζει με τις ανατεθειμένες ώρες ή τις ώρες ανά εβδομάδα του μαθήματος
    if (dispersionHours !== assignedHours) {
      toast.error("Το σύνολο των ωρών διδασκαλίας δεν ταιριάζει με την κατανομή.");
      return;
    }

    // H κατανομή των ωρών δεν ταιριάζει με τις ώρες ανά εβδομάδα του μαθήματος
    if (dispersionHours > (course?.totalHours ?? 0)) {
      toast.error("Το σύνολο των ωρών διδασκαλίας δεν ταιριάζει με την κατανομή.");
      return;
    }

    const dataToSubmit: TeachingPost = {
      schoolClassId: selectedSchoolClass?.id || defaultValues?.schoolClassId! ,
      teacherId: selectedTeacher,
      courseId: selectedCourse,
      totalHours: assignedHours,
      dispersion: [0, oneHoursCount, twoHoursCount, 0, 0, 0, 0],
    };
    try {
      const response = await TeachingService.insert(dataToSubmit);

      const newTeaching: Teaching= {
        key: `${response?.teacher.id}-${response?.course.id}`,
        schoolClass: { id: selectedSchoolClass?.id!, description: selectedSchoolClass?.name! },
        teacher: { id: response?.teacher.id!, description: teacher?.name!},
        course: { id: response?.course.id!, description: course?.title! },
        totalHours: assignedHours,
        dispersion: [0, oneHoursCount, twoHoursCount, 0, 0, 0, 0], 
      };

      setTeachings([...teachings, newTeaching ]);
      setCoursesRemainingHours(prev => prev.map(c => c.id === selectedCourse ? { ...c, remainingHours: c.remainingHours - newTeaching.totalHours } : c));
      setTeachersRemainingHours(prev => prev.map(t => t.id === selectedTeacher ? { ...t, remainingHours: t.remainingHours - newTeaching.totalHours } : t));
      const updatedTeacherRemainingHours = (teachersRemainingHours.find(t => t.id === selectedTeacher)?.remainingHours ?? 0) - newTeaching.totalHours;
      setClassTotalHours(prev => prev + newTeaching.totalHours);
      form.setFieldsValue({ teacherRemainingHours: updatedTeacherRemainingHours });
      form.resetFields(["course", "teacher", "assignedHours", "oneHourCount", "twoHourCount", "teacherRemainingHours"]);
      // if(course?.totalHours === 0){
      //   setSelectedCourses(prev => prev.filter(c => c.id !== selectedCourse));
      // }
    } catch {
      toast.error("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.");
    }
  };


  useEffect(() => {

    async function fetchTeachers() {
      const loadedTeachers = await TeacherService.load("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b"); // Replace with your actual school unit ID
      setTeachersRemainingHours(loadedTeachers.map(teacher => ({
          id: teacher.key,
          remainingHours: teacher.mandatoryTeachingHours - teacher.assignedTeachingHours,
      })));
      setTeachers(loadedTeachers);
    };
  
    async function fetchCourses() {
      try {
        const data = await TeachingService.getCourses();
        // const data = response
        //  .sort((a: Course, b: Course) => a.title.localeCompare(b.title)) as Course[];
        setCourses(data);
        // const filtered = gradeId ? data.filter(c => c.grade.id === gradeId) : data;
       
        // setCoursesRemainingHours(filtered.map(course => ({
        //   id: course.id,
        //   remainingHours: course.hoursPerWeek - (defaultValues?.teachings?.find(t => t.course.id === course.id)?.totalHours ?? 0),
        // })));
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    }

    async function fetchSchoolClasses() {
      try {
        const response = await axios.get(`http://localhost:5191/api/schools/5a4f28d3-8d80-4e41-b0f3-1a6e741d165b/groups`);
        const data  = response.data.schoolClasses
         .sort((a: SchoolClassEntity, b: SchoolClassEntity) => a.name.localeCompare(b.name)) as SchoolClassEntity[];
        
        setSchoolClasses(data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    }

    fetchCourses();
    fetchTeachers();
    fetchSchoolClasses();
    setSelectedCourses([]);
    if (defaultValues) {
      console.log("defaultValues.teachings:", defaultValues.teachings);
      console.log("CoursesRemainingHours:", coursesRemainingHours);
      setTeachings(defaultValues.teachings?.map(t => ({
        key: t.course.id + t.teacher.id,
        schoolClass: {id: defaultValues.schoolClassId, description: defaultValues.name},
        course: t.course,
        teacher: t.teacher,
        totalHours: t.totalHours,
        dispersion: t.dispersion,
      })) || []);
      const filtered = courses.filter(c => c.grade.id === defaultValues?.grade.id);
      setSelectedCourses(filtered[0]?.courses.sort((a: Course, b: Course) => a.title.localeCompare(b.title)));
      setCoursesRemainingHours(filtered[0]?.courses.map(course => ({
        id: course.id,
        remainingHours: course.totalHours - (defaultValues?.teachings?.find(t => t.course.id === course.id)?.totalHours ?? 0),
      })) || []);
      setClassTotalHours(defaultValues.assignedTeachingHours);
    } else {
      setTeachings([]);
      setClassTotalHours(0);
    }
  }, [defaultValues, form, isModalOpen]);

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };

  const sharedProps = {
    mode: 'spinner' as const,
    min: 0,
    max: 10,
    onChange,
    style: { width: 50 },
  };

  const renderActions = (value: any, record: Teaching, index: number) => {
    return (
      <Space>
        <Tooltip placement="topLeft" title="Διαγραφή">
          <Button
             onClick={() => {handleDelete(record); }}
            danger
          >
            <DeleteFilled />
          </Button>
        </Tooltip>
      </Space>
    );
  };

  return (
    <Modal
      title={defaultValues ? `Διδασκαλίες ${defaultValues?.name}` : "Νέες Διδασκαλίες"}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={() => { form.resetFields(); onSubmit(); }}
      width={700}
    >
      {defaultValues && (
        <Descriptions column={3} bordered size="small" >
          <Descriptions.Item label="Τάξη">{defaultValues?.grade.description}</Descriptions.Item>
          <Descriptions.Item label="Υποχρεωτικές Ώρες">{defaultValues?.teachingHours}</Descriptions.Item>
          <Descriptions.Item label="Δηλωμένες Ώρες">{classTotalHours}</Descriptions.Item>
        </Descriptions>  
      )}
      <Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Εισαγωγή</Divider>
      <Form form={form} layout="vertical" initialValues={{ oneHourCount: 0, twoHourCount: 0 }}>
        {!defaultValues && (
          <Form.Item
            name="schoolClass"
            label="Τμήμα"
            rules={[{ required: true, message: "Παρακαλώ επιλέξτε τάξη!" }]}
          >
            <Select
              options={schoolClasses
                .filter((schoolClass) => (schoolClasses.find(c => c.id === schoolClass.id)?.assignedHours ?? 0) == 0)
                .map((schoolClass) => ({
                  key: schoolClass.id,
                  value: schoolClass.id,
                  label: schoolClass.name,
                  // label: `${schoolClass.name} - ${schoolClasses.find(c => c.id === schoolClass.id)?.remainingHours} ώρες`,
              }))}
              placeholder="Επιλέξτε τάξη"
              onChange={(value) => {handleSchoolClassChange(value);}}
            />
          </Form.Item>
        )}
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="course"
            label="Μάθημα"
            rules={[{ required: true, message: "Παρακαλώ επιλέξτε μάθημα!" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: 16 }}
          >
            <Select
              options={selectedCourses
                .filter((course) => (coursesRemainingHours.find(c => c.id === course.id)?.remainingHours ?? 0) > 0)
                .map((course) => ({
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
            label="Ώρες/Εβδομαδα"
            rules={[{ required: true, message: "Παρακαλώ εισάγετε το σύνολο ωρών διδασκαλίας!" }]}
            style={{ display: "inline-block", width: "calc(25% - 8px)" }}
          >
            <InputNumber style={{ width: "75%" }} />
          </Form.Item>
          <Form.Item name="oneHourCount" label="Μονόωρα" style={{ display: "inline-block", marginBottom: 0, marginRight: 8, width: "calc(13% - 8px)" }}>
            <InputNumber {...sharedProps} />
          </Form.Item>
          <Form.Item name="twoHourCount" label="Δύωρα" style={{ display: "inline-block", marginBottom: 0, width: "calc(12.5% - 8px)" }}>
            <InputNumber {...sharedProps} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="teacher"
          label="Εκπαιδευτικός"
          rules={[{ required: true, message: "Παρακαλώ επιλέξτε εκπαιδευτικό!" }]}
        >
          <Select
            options={teachers.map((teacher) => ({
                key: teacher.key,
                value: teacher.key,
                label: `${teacher.name} - ${teachersRemainingHours.find(t => t.id === teacher.key)?.remainingHours} ώρες διαθέσιμες`,
            }))}
            placeholder="Επιλέξτε εκπαιδευτικό"
            onChange={(value) => handleTeacherChange(value)}
          />
        </Form.Item>
        </Form>
        <Flex justify="flex-end" style={{ marginTop: 8 }}>
          <Button   
            type="primary" 
            size="middle" 
            style={{ backgroundColor: "green" }}
            onClick={handleAddTeaching}>Προσθήκη Διδασκαλίας
          </Button>
        </Flex>

      <Divider orientation="left" orientationMargin={0} style={{ marginTop: 20 }}>Εισαγωγή</Divider>
         
        <Table
          size="small"
          dataSource={teachings}
          pagination={{ pageSize: 5 }}
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
                  {dispersion.slice(1, 3).map((h, i) => <Tag key={i} color="blue">{h}ω</Tag>)}
                </Space>
              ),
            },
            {
              title: 'Τροποποιήσεις',
              dataIndex: '',
              key: 'x',
              align: 'center',
              render: (_: any, record: Teaching) => renderActions(null, record, 0),
            },
          ]}
        />
    </Modal>
  );
}