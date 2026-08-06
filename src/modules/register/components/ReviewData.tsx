import { Descriptions, Typography, type FormInstance } from "antd";

export default function ReviewData({ directorForm, schoolUnitForm }: { directorForm: FormInstance; schoolUnitForm: FormInstance }) {
    const directorValues = directorForm.getFieldsValue();
    const schoolUnitValues = schoolUnitForm.getFieldsValue();

    return (
        <div>
            <Typography.Title level={4}>Προσωπικά Στοιχεία</Typography.Title>
            <Descriptions column={1} bordered size="small" style={{ label: { width: 160 } }}>
              <Descriptions.Item label="Όνομα">{directorValues.firstName}</Descriptions.Item>
              <Descriptions.Item label="Επώνυμο">{directorValues.lastName}</Descriptions.Item>
              <Descriptions.Item label="Email">{directorValues.email}</Descriptions.Item>
            </Descriptions>
            <Typography.Title level={4}>Στοιχεία Σχολικής Μονάδας</Typography.Title>
            <Descriptions column={1} bordered size="small" style={{ label: { width: 160 } }}>
              <Descriptions.Item label="Όνομα">{schoolUnitValues.SchoolUnit}</Descriptions.Item>
              <Descriptions.Item label="Βαθμίδα Εκπαίδευσης">{schoolUnitValues.SchoolType}</Descriptions.Item>
              <Descriptions.Item label="Σχολικό Έτος">{schoolUnitValues.SchoolYear}</Descriptions.Item>
              <Descriptions.Item label="Ημέρες Διδασκαλίας">{schoolUnitValues.TeachingDays}</Descriptions.Item>
              <Descriptions.Item label="Ώρες Λειτουργίας">{schoolUnitValues.TeachingHours}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}
