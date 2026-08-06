import { Button, Flex, Tabs, type TabsProps } from "antd";

import AddDirector from "../components/AddDirector";
import AddSchoolUnit from "../components/AddSchoolUnit";
import { Form } from "antd";
import { useEffect, useState } from "react";

export default function Register() {
    const [directorForm] = Form.useForm();
    const [schoolUnitForm] = Form.useForm();
    const [activeTab, setActiveTab] = useState<string>("1");

    const buttonTitle = activeTab === "1" ? "Επόμενο" : "Εγγραφή";

    const handleClick = () => {
        if(activeTab === "1") {
            setActiveTab("2");
            return;
        }
        // Handle form submission logic here
        const directorValues = directorForm.getFieldsValue();
        const schoolUnitValues = schoolUnitForm.getFieldsValue();
        console.log("Director Values:", directorValues);
        console.log("School Unit Values:", schoolUnitValues);
    }

    const onChange = (key: string) => {
        console.log(key);
    };


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Προσωπικά Στοιχεία',
            children: <AddDirector form={directorForm}/>,
        },
        {
            key: '2',
            label: 'Στοιχεία Σχολικής Μονάδας',
            children: <AddSchoolUnit form={schoolUnitForm}/>,
        },
    ];
    return (
        <>
        <h1>Registration Form</h1>
        <Tabs defaultActiveKey="1" activeKey={activeTab} items={items} onChange={onChange} />
        <Flex justify="flex-end" style={{ marginTop: 8 }}>
            <Button   
              type="primary" 
              size="middle" 
              onClick={() => {
                activeTab === "2" ? setActiveTab("1") : null;
              }}>
              {"Προηγούμενο"}
          </Button>
          <Button   
            type="primary" 
            size="middle" 
            onClick={handleClick}>{buttonTitle}
          </Button>
        </Flex> 
        </>
    );
}